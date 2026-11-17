import * as cheerio from "cheerio";

export type BotAccessStatus = "Allowed" | "Blocked" | "Not Specified (Allowed)";

export interface BotAccess {
  bot: string;
  vendor: string;
  status: BotAccessStatus;
}

export interface ActionItem {
  id: string;
  priority: "critical" | "high" | "medium";
  title: string;
  description: string;
  impact: string;
  category: string;
}

export interface PromptCheck {
  prompt: string;
  engine: string;
  brandMentioned: boolean;
  visibilityRank: number | null;
  competitorsMentioned: string[];
  snippet: string;
  isLive: boolean;
}

export interface GeoAuditResult {
  url: string;
  domain: string;
  brandName: string;
  analyzedAt: string;
  crawlSuccess: boolean;
  crawlError?: string;
  overallScore: number;
  grade: "A+" | "A" | "B" | "C" | "D" | "F";
  pillars: {
    crawlerAccess: number;
    structuredData: number;
    answerReadiness: number;
    citationSignals: number;
  };
  technical: {
    title: string;
    metaDescription: string;
    hasLlmsTxt: boolean;
    llmsTxtPreview: string | null;
    hasRobotsTxt: boolean;
    botAccess: BotAccess[];
    jsonLdTypes: string[];
    hasFaqSchema: boolean;
    questionHeadingsCount: number;
    h1Count: number;
    h2Count: number;
    wordCount: number;
    hasCanonical: boolean;
    hasOpenGraph: boolean;
  };
  promptChecks: PromptCheck[];
  llmMode: "live-llm" | "simulated";
  actionItems: ActionItem[];
  generatedArtifacts: {
    llmsTxt: string;
    jsonLd: string;
  };
}

const AI_BOTS = [
  { bot: "GPTBot", vendor: "OpenAI (ChatGPT)" },
  { bot: "OAI-SearchBot", vendor: "OpenAI Search" },
  { bot: "PerplexityBot", vendor: "Perplexity AI" },
  { bot: "ClaudeBot", vendor: "Anthropic (Claude)" },
  { bot: "Google-Extended", vendor: "Google Gemini" },
];

async function fetchWithTimeout(
  url: string,
  timeoutMs = 4500
): Promise<{ ok: boolean; status: number; text: string }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,text/plain;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9,tr;q=0.8",
      },
      redirect: "follow",
    });
    const text = await res.text();
    return { ok: res.ok, status: res.status, text };
  } finally {
    clearTimeout(timer);
  }
}

export function normalizeUrl(rawUrl: string): { origin: string; fullUrl: string; domain: string } {
  let cleaned = rawUrl.trim();
  if (!/^https?:\/\//i.test(cleaned)) {
    cleaned = `https://${cleaned}`;
  }
  const parsed = new URL(cleaned);
  return {
    origin: parsed.origin,
    fullUrl: parsed.toString(),
    domain: parsed.hostname.replace(/^www\./, ""),
  };
}

function parseRobotsTxt(robotsContent: string): BotAccess[] {
  const lines = robotsContent.split(/\r?\n/).map((l) => l.trim());
  const blockedAgents = new Set<string>();
  let currentAgents: string[] = [];

  for (const line of lines) {
    if (!line || line.startsWith("#")) continue;
    const [rawKey, ...rest] = line.split(":");
    if (!rawKey || rest.length === 0) continue;
    const key = rawKey.trim().toLowerCase();
    const val = rest.join(":").split("#")[0].trim();

    if (key === "user-agent") {
      if (currentAgents.length === 0) {
        currentAgents = [val.toLowerCase()];
      } else {
        currentAgents.push(val.toLowerCase());
      }
    } else if (key === "disallow") {
      if (val === "/" || val === "/*") {
        for (const agent of currentAgents) {
          blockedAgents.add(agent);
        }
      }
    } else if (key === "allow") {
      if (val === "/") {
        for (const agent of currentAgents) {
          blockedAgents.delete(agent);
        }
      }
    } else {
      currentAgents = [];
    }
  }

  return AI_BOTS.map(({ bot, vendor }) => {
    const lower = bot.toLowerCase();
    if (blockedAgents.has(lower) || blockedAgents.has("*")) {
      return { bot, vendor, status: "Blocked" };
    }
    const explicitlyMentioned = robotsContent.toLowerCase().includes(lower);
    return {
      bot,
      vendor,
      status: explicitlyMentioned ? "Allowed" : "Not Specified (Allowed)",
    };
  });
}

function extractJsonLdTypes($: cheerio.CheerioAPI): string[] {
  const types = new Set<string>();
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const raw = $(el).html();
      if (!raw) return;
      const data = JSON.parse(raw);
      const collect = (node: unknown) => {
        if (!node || typeof node !== "object") return;
        if (Array.isArray(node)) {
          node.forEach(collect);
          return;
        }
        const record = node as Record<string, unknown>;
        if (typeof record["@type"] === "string") {
          types.add(record["@type"]);
        } else if (Array.isArray(record["@type"])) {
          record["@type"].forEach((t) => {
            if (typeof t === "string") types.add(t);
          });
        }
        if (Array.isArray(record["@graph"])) {
          record["@graph"].forEach(collect);
        }
      };
      collect(data);
    } catch {
      // Ignore malformed JSON-LD blocks
    }
  });
  return Array.from(types);
}

async function queryGeminiLive(
  prompt: string,
  apiKey: string,
  lang = "en"
): Promise<string | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 6500);
  const langName =
    lang === "tr" ? "Turkish" : lang === "de" ? "German" : lang === "ru" ? "Russian" : "English";
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        signal: controller.signal,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `${prompt}\n\nRespond in ${langName}. Be brief (max 60 words). List 3-4 specific brand names.`,
                },
              ],
            },
          ],
          generationConfig: {
            maxOutputTokens: 160,
            temperature: 0.3,
          },
        }),
      }
    );
    if (!res.ok) return null;
    const json = await res.json();
    return json?.candidates?.[0]?.content?.parts?.[0]?.text ?? null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function queryOpenAILive(prompt: string, apiKey: string): Promise<string | null> {
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are an AI search assistant. Give a concise recommendation with 3-5 specific brand or product names.",
          },
          { role: "user", content: prompt },
        ],
        max_tokens: 280,
      }),
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.choices?.[0]?.message?.content ?? null;
  } catch {
    return null;
  }
}

function buildSimulatedPrompts(
  brandName: string,
  domain: string,
  industry: string,
  customPrompts: string[],
  techScoreRatio: number
): PromptCheck[] {
  const fallbackPrompts = [
    `What is the best ${industry || "solution"} for growing teams in 2026?`,
    `Top alternatives and competitors to ${brandName}`,
    `Should I choose ${brandName} (${domain}) or its leading competitors?`,
  ];

  const promptsToRun =
    customPrompts.filter((p) => p.trim().length > 3).slice(0, 3).length > 0
      ? customPrompts.filter((p) => p.trim().length > 3).slice(0, 3)
      : fallbackPrompts;

  const engines = ["ChatGPT (GPT-4o)", "Perplexity AI", "Google Gemini"];

  return promptsToRun.map((prompt, idx) => {
    const mentioned = idx === 2 || techScoreRatio >= 0.65;
    return {
      prompt,
      engine: engines[idx % engines.length],
      brandMentioned: mentioned,
      visibilityRank: mentioned ? (techScoreRatio >= 0.75 ? 2 : 4) : null,
      competitorsMentioned: ["Market Leader A", "Category Challenger B", "Enterprise Suite C"],
      snippet: mentioned
        ? `${brandName} (${domain}) appears in the answer, but lacks structured FAQ citations and third-party comparison pages to hold the #1 spot.`
        : `AI engines currently recommend established competitors instead of ${brandName} due to missing llms.txt, weak FAQ schema, and low entity clarity.`,
      isLive: false,
    };
  });
}

function computeGrade(score: number): GeoAuditResult["grade"] {
  if (score >= 90) return "A+";
  if (score >= 80) return "A";
  if (score >= 68) return "B";
  if (score >= 52) return "C";
  if (score >= 35) return "D";
  return "F";
}

export async function runGeoAudit(input: {
  url: string;
  brandName?: string;
  industry?: string;
  prompts?: string[];
  lang?: string;
}): Promise<GeoAuditResult> {
  const { origin, fullUrl, domain } = normalizeUrl(input.url);
  const inferredBrand =
    input.brandName?.trim() ||
    domain.split(".")[0].charAt(0).toUpperCase() + domain.split(".")[0].slice(1);
  const industry = input.industry?.trim() || "software & digital services";

  const [htmlRes, robotsRes, llmsRes] = await Promise.allSettled([
    fetchWithTimeout(fullUrl, 4500),
    fetchWithTimeout(`${origin}/robots.txt`, 2500),
    fetchWithTimeout(`${origin}/llms.txt`, 2500),
  ]);

  const crawlSuccess =
    htmlRes.status === "fulfilled" && htmlRes.value.ok && htmlRes.value.text.length > 0;
  const html = crawlSuccess ? htmlRes.value.text : "";
  const crawlError = !crawlSuccess
    ? htmlRes.status === "rejected"
      ? "Could not reach website (timeout or DNS error)."
      : `HTTP ${htmlRes.value.status} returned when fetching homepage (site may block automated requests).`
    : undefined;

  const hasRobotsTxt = robotsRes.status === "fulfilled" && robotsRes.value.ok;
  const robotsText = hasRobotsTxt ? robotsRes.value.text : "";
  const botAccess = hasRobotsTxt
    ? parseRobotsTxt(robotsText)
    : AI_BOTS.map(({ bot, vendor }) => ({
        bot,
        vendor,
        status: "Not Specified (Allowed)" as BotAccessStatus,
      }));

  const llmsRaw = llmsRes.status === "fulfilled" && llmsRes.value.ok ? llmsRes.value.text.trim() : "";
  const hasLlmsTxt =
    llmsRaw.length > 20 && !/^<(?:!doctype|html|head|body)/i.test(llmsRaw);
  const llmsTxtPreview = hasLlmsTxt ? llmsRaw.slice(0, 500) : null;

  let title = inferredBrand;
  let metaDescription = "";
  let jsonLdTypes: string[] = [];
  let h1Count = 0;
  let h2Count = 0;
  let questionHeadingsCount = 0;
  let wordCount = 0;
  let hasCanonical = false;
  let hasOpenGraph = false;
  const discoveredLinks: { text: string; href: string }[] = [];

  if (html) {
    const $ = cheerio.load(html);
    title = $("title").first().text().trim() || inferredBrand;
    metaDescription =
      $('meta[name="description"]').attr("content")?.trim() ||
      $('meta[property="og:description"]').attr("content")?.trim() ||
      "";
    jsonLdTypes = extractJsonLdTypes($);
    h1Count = $("h1").length;
    h2Count = $("h2").length;

    $("h2, h3").each((_, el) => {
      const txt = $(el).text().trim();
      if (txt.includes("?") || /^(how|what|why|when|which|can|does|is)\b/i.test(txt)) {
        questionHeadingsCount += 1;
      }
    });

    hasCanonical = $('link[rel="canonical"]').length > 0;
    hasOpenGraph = $('meta[property="og:title"]').length > 0;

    $("a[href]").each((_, el) => {
      if (discoveredLinks.length >= 6) return;
      const href = $(el).attr("href") || "";
      const text = $(el).text().trim().replace(/\s+/g, " ");
      if (
        text.length >= 3 &&
        text.length <= 40 &&
        (href.startsWith("/") || href.startsWith(origin)) &&
        !href.includes("#")
      ) {
        const abs = href.startsWith("/") ? `${origin}${href}` : href;
        if (!discoveredLinks.some((l) => l.href === abs)) {
          discoveredLinks.push({ text, href: abs });
        }
      }
    });

    $("script, style, noscript").remove();
    const bodyText = $("body").text().replace(/\s+/g, " ").trim();
    wordCount = bodyText ? bodyText.split(" ").length : 0;
  }

  const hasFaqSchema = jsonLdTypes.some((t) => t.toLowerCase().includes("faq"));
  const blockedBotsCount = botAccess.filter((b) => b.status === "Blocked").length;

  // Score calculation (4 pillars x 25 = 100)
  let crawlerAccess = 0;
  if (hasLlmsTxt) crawlerAccess += 10;
  crawlerAccess += Math.max(0, 15 - blockedBotsCount * 4);

  let structuredData = 0;
  if (jsonLdTypes.length > 0) structuredData += 10;
  if (
    jsonLdTypes.some((t) =>
      ["Organization", "Product", "SoftwareApplication", "LocalBusiness", "WebSite"].includes(t)
    )
  ) {
    structuredData += 8;
  }
  if (hasFaqSchema) structuredData += 7;

  let answerReadiness = 0;
  if (h1Count >= 1 && h2Count >= 2) answerReadiness += 8;
  else if (h1Count >= 1) answerReadiness += 4;
  if (questionHeadingsCount >= 2) answerReadiness += 7;
  else if (questionHeadingsCount === 1) answerReadiness += 4;
  if (wordCount >= 350) answerReadiness += 5;
  else if (wordCount >= 120) answerReadiness += 3;
  if (metaDescription.length >= 40) answerReadiness += 5;

  let citationSignals = 0;
  if (hasCanonical) citationSignals += 5;
  if (hasOpenGraph) citationSignals += 5;

  // Live LLM check if keys exist
  const geminiKey = process.env.GEMINI_API_KEY?.trim();
  const openaiKey = process.env.OPENAI_API_KEY?.trim();
  let promptChecks: PromptCheck[] = [];
  let llmMode: "live-llm" | "simulated" = "simulated";

  if (geminiKey || openaiKey) {
    const customPrompts = (input.prompts || []).filter((p) => p.trim().length > 3).slice(0, 3);
    const hasCustomIndustry = Boolean(input.industry?.trim());
    const promptsToQuery =
      customPrompts.length > 0
        ? customPrompts
        : hasCustomIndustry
        ? [
            `What are the best ${industry} platforms in 2026?`,
            `Top alternatives and competitors to ${inferredBrand} in ${industry}`,
            `Is ${inferredBrand} (${domain}) recommended for ${industry}?`,
          ]
        : [
            `What is ${inferredBrand} (${domain}) known for and who are its main competitors?`,
            `Recommend the top 3 platforms similar to ${inferredBrand} (${domain})`,
            `Should buyers choose ${inferredBrand} (${domain}) or its competitors in 2026?`,
          ];

    const liveResults = await Promise.all(
      promptsToQuery.map(async (prompt): Promise<PromptCheck | null> => {
        const answer = openaiKey
          ? await queryOpenAILive(prompt, openaiKey)
          : await queryGeminiLive(prompt, geminiKey!, input.lang || "en");

        if (!answer) return null;
        const lower = answer.toLowerCase();
        const mentioned =
          lower.includes(inferredBrand.toLowerCase()) || lower.includes(domain.toLowerCase());
        return {
          prompt,
          engine: openaiKey ? "OpenAI GPT-4o-mini (Live)" : "Google Gemini 3.8 Flash (Live)",
          brandMentioned: mentioned,
          visibilityRank: mentioned ? 1 : null,
          competitorsMentioned: [] as string[],
          snippet: answer.slice(0, 320) + (answer.length > 320 ? "..." : ""),
          isLive: true,
        };
      })
    );

    const validLive = liveResults.filter((r): r is PromptCheck => r !== null);
    if (validLive.length > 0) {
      promptChecks = validLive;
      llmMode = "live-llm";
    }
  }

  if (promptChecks.length === 0) {
    const techRatio = (crawlerAccess + structuredData + answerReadiness) / 75;
    promptChecks = buildSimulatedPrompts(
      inferredBrand,
      domain,
      industry,
      input.prompts || [],
      techRatio
    );
  }

  const mentionRate =
    promptChecks.filter((p) => p.brandMentioned).length / Math.max(1, promptChecks.length);
  citationSignals += Math.round(mentionRate * 15);

  const overallScore = Math.min(
    100,
    crawlerAccess + structuredData + answerReadiness + citationSignals
  );

  // Action items
  const actionItems: ActionItem[] = [];
  if (!hasLlmsTxt) {
    actionItems.push({
      id: "add-llms-txt",
      priority: "critical",
      title: "Create & Publish /llms.txt",
      description:
        "AI search engines (ChatGPT, Perplexity, Claude) look for /llms.txt to understand your core product, pricing, and key documentation without parsing noisy HTML.",
      impact: "+10 GEO Score",
      category: "AI Crawler Access",
    });
  }
  if (blockedBotsCount > 0) {
    actionItems.push({
      id: "unblock-ai-bots",
      priority: "critical",
      title: `Unblock ${blockedBotsCount} AI Crawler(s) in robots.txt`,
      description:
        "Your robots.txt currently blocks major AI crawlers. If they cannot index your pages, they cannot cite or recommend your brand.",
      impact: "+15 GEO Score",
      category: "AI Crawler Access",
    });
  }
  if (!hasFaqSchema) {
    actionItems.push({
      id: "add-faq-schema",
      priority: "high",
      title: "Add FAQPage & Organization JSON-LD Schema",
      description:
        "Structured Q&A pairs give LLMs verified, high-confidence facts to quote directly when users ask buying questions.",
      impact: "+12 GEO Score",
      category: "Structured Data",
    });
  }
  if (questionHeadingsCount < 2) {
    actionItems.push({
      id: "add-question-headings",
      priority: "high",
      title: "Add Question-Based H2/H3 Headings",
      description:
        "Restructure key landing page sections around natural buyer questions (e.g., 'How does X compare to Y?', 'Who is X built for?').",
      impact: "+7 GEO Score",
      category: "Answer Readiness",
    });
  }
  if (!metaDescription || metaDescription.length < 40) {
    actionItems.push({
      id: "improve-meta",
      priority: "medium",
      title: "Write a Clear Entity-Rich Meta Description",
      description:
        "State clearly who you are, what category you belong to, and who your target customer is in under 155 characters.",
      impact: "+5 GEO Score",
      category: "Answer Readiness",
    });
  }

  // Generate tailored artifacts
  const linksSection =
    discoveredLinks.length > 0
      ? discoveredLinks.map((l) => `- [${l.text}](${l.href})`).join("\n")
      : `- [Home](${origin}/)\n- [Pricing](${origin}/pricing)\n- [Docs](${origin}/docs)`;

  const generatedLlmsTxt = `# ${inferredBrand}
> ${metaDescription || `${inferredBrand} provides ${industry} solutions.`}

## Core Pages
${linksSection}

## Key Facts for AI Assistants
- Brand Name: ${inferredBrand}
- Primary Domain: ${domain}
- Category: ${industry}
`;

  const generatedJsonLd = JSON.stringify(
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          name: inferredBrand,
          url: origin,
          description: metaDescription || `${inferredBrand} — ${industry}`,
        },
        {
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: `What is ${inferredBrand}?`,
              acceptedAnswer: {
                "@type": "Answer",
                text:
                  metaDescription ||
                  `${inferredBrand} is a ${industry} platform built to deliver fast, measurable results.`,
              },
            },
            {
              "@type": "Question",
              name: `Who should use ${inferredBrand}?`,
              acceptedAnswer: {
                "@type": "Answer",
                text: `Teams and businesses looking for a modern ${industry} solution with transparent pricing and quick onboarding.`,
              },
            },
          ],
        },
      ],
    },
    null,
    2
  );

  return {
    url: fullUrl,
    domain,
    brandName: inferredBrand,
    analyzedAt: new Date().toISOString(),
    crawlSuccess,
    crawlError,
    overallScore,
    grade: computeGrade(overallScore),
    pillars: {
      crawlerAccess,
      structuredData,
      answerReadiness,
      citationSignals,
    },
    technical: {
      title,
      metaDescription,
      hasLlmsTxt,
      llmsTxtPreview,
      hasRobotsTxt,
      botAccess,
      jsonLdTypes,
      hasFaqSchema,
      questionHeadingsCount,
      h1Count,
      h2Count,
      wordCount,
      hasCanonical,
      hasOpenGraph,
    },
    promptChecks,
    llmMode,
    actionItems,
    generatedArtifacts: {
      llmsTxt: generatedLlmsTxt,
      jsonLd: `<script type="application/ld+json">\n${generatedJsonLd}\n</script>`,
    },
  };
}
