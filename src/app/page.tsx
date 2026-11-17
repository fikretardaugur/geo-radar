"use client";

import React, { useState } from "react";
import {
  Radar,
  Search,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Copy,
  Check,
  Printer,
  Download,
  Sparkles,
  Bot,
  Code2,
  FileText,
  ArrowRight,
  Loader2,
  BookOpen,
} from "lucide-react";
import type { GeoAuditResult } from "@/lib/geo-analyzer";
import { DICTIONARIES, LANGUAGES, type Lang } from "@/lib/i18n";

export default function HomePage() {
  const [lang, setLang] = useState<Lang>("tr");
  const t = DICTIONARIES[lang];

  const [url, setUrl] = useState("ikas.com");
  const [brandName, setBrandName] = useState("");
  const [industry, setIndustry] = useState("");
  const [showPrompts, setShowPrompts] = useState(false);
  const [promptsText, setPromptsText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GeoAuditResult | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  async function runAudit(targetUrl?: string) {
    const finalUrl = (targetUrl ?? url).trim();
    if (!finalUrl) return;
    setLoading(true);
    setError(null);

    try {
      const prompts = promptsText
        .split("\n")
        .map((p) => p.trim())
        .filter(Boolean);

      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: finalUrl,
          brandName: brandName.trim() || undefined,
          industry: industry.trim() || undefined,
          prompts,
          lang,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Audit failed.");
      }
      setResult(data as GeoAuditResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    runAudit();
  }

  function handleQuickExample(exampleUrl: string, exampleBrand: string, exampleIndustry: string) {
    setUrl(exampleUrl);
    setBrandName(exampleBrand);
    setIndustry(exampleIndustry);
    runAudit(exampleUrl);
  }

  async function copyText(key: string, value: string) {
    await navigator.clipboard.writeText(value);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  }

  function downloadJson() {
    if (!result) return;
    const blob = new Blob([JSON.stringify(result, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `geo-radar-${result.domain}.json`;
    link.click();
  }

  const proCheckoutUrl = process.env.NEXT_PUBLIC_LEMON_PRO_URL || "#pricing";
  const agencyCheckoutUrl = process.env.NEXT_PUBLIC_LEMON_AGENCY_URL || "#pricing";

  return (
    <>
      <header className="nav">
        <div className="container nav-inner">
          <a href="#" className="brand">
            <span className="brand-badge">
              <Radar size={18} />
            </span>
            <span>GEO Radar</span>
          </a>

          <nav className="nav-links">
            <a href="#scanner">{t.nav.audit}</a>
            <a href="#how-it-works">{t.nav.howItWorks}</a>
            <a href="#resources">{t.nav.resources}</a>
            <a href="#pricing">{t.nav.pricing}</a>
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div className="lang-switch" role="group" aria-label="Language">
              {LANGUAGES.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  className={`lang-btn ${lang === item.code ? "active" : ""}`}
                  onClick={() => setLang(item.code)}
                  title={item.label}
                >
                  {item.flag}
                </button>
              ))}
            </div>

            <a href="#pricing" className="btn btn-primary">
              {t.nav.cta}
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="hero" id="scanner">
          <div className="container">
            <div className="pill">
              <Sparkles size={14} />
              <span>{t.hero.badge}</span>
            </div>

            <h1>
              {t.hero.titleStart}
              <span className="gradient-text">{t.hero.titleHighlight}</span>
            </h1>
            <p>{t.hero.subtitle}</p>

            <form className="audit-card" onSubmit={handleSubmit}>
              <div className="input-row">
                <input
                  className="input"
                  type="text"
                  placeholder={t.hero.urlPlaceholder}
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                />
                <input
                  className="input"
                  type="text"
                  placeholder={t.hero.brandPlaceholder}
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                />
                <input
                  className="input"
                  type="text"
                  placeholder={t.hero.industryPlaceholder}
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                />
                <button className="btn btn-primary" type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 size={16} className="spin" />
                      {t.hero.scanningBtn}
                    </>
                  ) : (
                    <>
                      <Search size={16} />
                      {t.hero.scanBtn}
                    </>
                  )}
                </button>
              </div>

              {showPrompts && (
                <div style={{ marginTop: 12 }}>
                  <textarea
                    className="input"
                    rows={3}
                    placeholder={t.hero.promptsPlaceholder}
                    value={promptsText}
                    onChange={(e) => setPromptsText(e.target.value)}
                  />
                </div>
              )}

              <div className="prompt-toggle">
                <div className="quick-examples">
                  <span>{t.hero.tryLive}</span>
                  <button
                    type="button"
                    className="chip"
                    onClick={() => handleQuickExample("ikas.com", "ikas", "E-Commerce Platform")}
                  >
                    ikas.com
                  </button>
                  <button
                    type="button"
                    className="chip"
                    onClick={() => handleQuickExample("kolayik.com", "Kolay IK", "HR Software")}
                  >
                    kolayik.com
                  </button>
                  <button
                    type="button"
                    className="chip"
                    onClick={() => handleQuickExample("stripe.com", "Stripe", "Payment Infrastructure")}
                  >
                    stripe.com
                  </button>
                  <button
                    type="button"
                    className="chip"
                    onClick={() => handleQuickExample("linear.app", "Linear", "Project Management")}
                  >
                    linear.app
                  </button>
                </div>

                <button
                  type="button"
                  className="chip"
                  onClick={() => setShowPrompts((v) => !v)}
                >
                  {showPrompts ? t.hero.hidePrompts : t.hero.addPrompts}
                </button>
              </div>

              {error && (
                <div
                  style={{
                    marginTop: 14,
                    padding: "10px 14px",
                    borderRadius: 10,
                    background: "rgba(248, 113, 113, 0.12)",
                    border: "1px solid rgba(248, 113, 113, 0.3)",
                    color: "#fca5a5",
                    fontSize: 13,
                  }}
                >
                  {error}
                </div>
              )}
            </form>
          </div>
        </section>

        {result && (
          <section className="results-section">
            <div className="container">
              <div className="results-header">
                <div>
                  <h2 style={{ fontSize: 24, fontWeight: 800 }}>
                    {t.report.titlePrefix} {result.domain}
                  </h2>
                  <p style={{ color: "var(--text-muted)", fontSize: 13 }}>
                    {t.report.analyzedLabel} {new Date(result.analyzedAt).toLocaleString()} •{" "}
                    {result.crawlSuccess ? t.report.crawlOk : result.crawlError}
                  </p>
                </div>

                <div style={{ display: "flex", gap: 10 }} className="no-print">
                  <button className="btn btn-ghost" onClick={() => window.print()}>
                    <Printer size={15} />
                    {t.report.exportPdf}
                  </button>
                  <button className="btn btn-ghost" onClick={downloadJson}>
                    <Download size={15} />
                    JSON
                  </button>
                </div>
              </div>

              {/* Score Overview */}
              <div className="card" style={{ marginBottom: 18 }}>
                <div className="score-hero">
                  <div
                    className="score-ring"
                    style={{ "--pct": result.overallScore } as React.CSSProperties}
                  >
                    <div className="score-ring-inner">
                      <span className="score-num">{result.overallScore}</span>
                      <span className="score-grade">
                        {t.report.grade} {result.grade}
                      </span>
                    </div>
                  </div>

                  <div style={{ flex: 1, minWidth: 260 }}>
                    <div className="grid-4">
                      <div className="pillar-box">
                        <div className="pillar-label">{t.report.pillars.crawlerAccess}</div>
                        <div className="pillar-val">{result.pillars.crawlerAccess} / 25</div>
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{ width: `${(result.pillars.crawlerAccess / 25) * 100}%` }}
                          />
                        </div>
                      </div>

                      <div className="pillar-box">
                        <div className="pillar-label">{t.report.pillars.structuredData}</div>
                        <div className="pillar-val">{result.pillars.structuredData} / 25</div>
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{ width: `${(result.pillars.structuredData / 25) * 100}%` }}
                          />
                        </div>
                      </div>

                      <div className="pillar-box">
                        <div className="pillar-label">{t.report.pillars.answerReadiness}</div>
                        <div className="pillar-val">{result.pillars.answerReadiness} / 25</div>
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{ width: `${(result.pillars.answerReadiness / 25) * 100}%` }}
                          />
                        </div>
                      </div>

                      <div className="pillar-box">
                        <div className="pillar-label">{t.report.pillars.citationSignals}</div>
                        <div className="pillar-val">{result.pillars.citationSignals} / 25</div>
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{ width: `${(result.pillars.citationSignals / 25) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technical & Bot Access */}
              <div className="grid-2" style={{ marginBottom: 18 }}>
                <div className="card">
                  <div className="card-title">
                    <Bot size={17} color="var(--accent)" />
                    {t.report.botTitle}
                  </div>

                  <div className="list-row">
                    <span>{t.report.llmsFile}</span>
                    {result.technical.hasLlmsTxt ? (
                      <span className="badge badge-ok">
                        <CheckCircle2 size={13} /> {t.report.detected}
                      </span>
                    ) : (
                      <span className="badge badge-bad">
                        <XCircle size={13} /> {t.report.missing}
                      </span>
                    )}
                  </div>

                  {result.technical.botAccess.map((b) => (
                    <div className="list-row" key={b.bot}>
                      <div>
                        <div style={{ fontWeight: 600 }}>{b.bot}</div>
                        <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{b.vendor}</div>
                      </div>
                      {b.status === "Blocked" ? (
                        <span className="badge badge-bad">
                          <XCircle size={13} /> {t.report.blocked}
                        </span>
                      ) : (
                        <span className="badge badge-ok">
                          <CheckCircle2 size={13} /> {b.status}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="card">
                  <div className="card-title">
                    <Code2 size={17} color="var(--accent-2)" />
                    {t.report.entityTitle}
                  </div>

                  <div className="list-row">
                    <span>{t.report.pageTitle}</span>
                    <span style={{ color: "var(--text-muted)", maxWidth: 260, textAlign: "right" }}>
                      {result.technical.title}
                    </span>
                  </div>
                  <div className="list-row">
                    <span>{t.report.schemasFound}</span>
                    <span>
                      {result.technical.jsonLdTypes.length > 0 ? (
                        <span className="badge badge-ok">
                          {result.technical.jsonLdTypes.join(", ")}
                        </span>
                      ) : (
                        <span className="badge badge-bad">{t.report.noneFound}</span>
                      )}
                    </span>
                  </div>
                  <div className="list-row">
                    <span>{t.report.faqSchema}</span>
                    {result.technical.hasFaqSchema ? (
                      <span className="badge badge-ok">{t.report.present}</span>
                    ) : (
                      <span className="badge badge-warn">{t.report.missing}</span>
                    )}
                  </div>
                  <div className="list-row">
                    <span>{t.report.questionHeadings}</span>
                    <span>
                      {result.technical.questionHeadingsCount} {t.report.detectedCount}
                    </span>
                  </div>
                  <div className="list-row">
                    <span>{t.report.wordCount}</span>
                    <span>
                      {result.technical.wordCount} {t.report.words} • {result.technical.h1Count} H1 /{" "}
                      {result.technical.h2Count} H2
                    </span>
                  </div>
                </div>
              </div>

              {/* Prompt Visibility Checks */}
              <div className="card" style={{ marginBottom: 18 }}>
                <div className="card-title" style={{ justifyContent: "space-between", flexWrap: "wrap" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Sparkles size={17} color="var(--accent)" />
                    {t.report.promptTitle}
                  </span>
                  <span className={`badge ${result.llmMode === "live-llm" ? "badge-ok" : "badge-warn"}`}>
                    {result.llmMode === "live-llm" ? t.report.liveMode : t.report.simMode}
                  </span>
                </div>

                <div className="grid-3">
                  {result.promptChecks.map((pc, idx) => (
                    <div className="pillar-box" key={idx}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: 8,
                        }}
                      >
                        <span style={{ fontSize: 12, fontWeight: 700, color: "var(--accent)" }}>
                          {pc.engine}
                        </span>
                        {pc.brandMentioned ? (
                          <span className="badge badge-ok">{t.report.mentioned}</span>
                        ) : (
                          <span className="badge badge-bad">{t.report.notCited}</span>
                        )}
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
                        “{pc.prompt}”
                      </div>
                      <p style={{ fontSize: 12.5, color: "var(--text-muted)" }}>{pc.snippet}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Checklist */}
              <div className="card" style={{ marginBottom: 18 }}>
                <div className="card-title">
                  <AlertTriangle size={17} color="var(--warning)" />
                  {t.report.actionPlanTitle}
                </div>

                {result.actionItems.length === 0 ? (
                  <p style={{ color: "var(--success)", fontSize: 14 }}>{t.report.noGaps}</p>
                ) : (
                  result.actionItems.map((item) => (
                    <div className="list-row" key={item.id} style={{ alignItems: "flex-start", gap: 16 }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                          <span
                            className={`badge ${
                              item.priority === "critical"
                                ? "badge-bad"
                                : item.priority === "high"
                                ? "badge-warn"
                                : "badge-ok"
                            }`}
                          >
                            {item.priority.toUpperCase()}
                          </span>
                          <strong>{item.title}</strong>
                        </div>
                        <p style={{ fontSize: 13, color: "var(--text-muted)" }}>{item.description}</p>
                      </div>
                      <span className="badge badge-ok" style={{ flexShrink: 0 }}>
                        {item.impact}
                      </span>
                    </div>
                  ))
                )}
              </div>

              {/* Ready-to-Deploy Artifacts */}
              <div className="grid-2">
                <div className="card">
                  <div className="card-title" style={{ justifyContent: "space-between" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <FileText size={17} color="var(--accent)" />
                      {t.report.llmsArtifactTitle}
                    </span>
                    <button
                      className="btn btn-ghost"
                      style={{ padding: "6px 12px", fontSize: 12 }}
                      onClick={() => copyText("llms", result.generatedArtifacts.llmsTxt)}
                    >
                      {copiedKey === "llms" ? <Check size={14} /> : <Copy size={14} />}
                      {copiedKey === "llms" ? t.report.copied : t.report.copy}
                    </button>
                  </div>
                  <pre className="code-block">{result.generatedArtifacts.llmsTxt}</pre>
                </div>

                <div className="card">
                  <div className="card-title" style={{ justifyContent: "space-between" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Code2 size={17} color="var(--accent-2)" />
                      {t.report.jsonLdArtifactTitle}
                    </span>
                    <button
                      className="btn btn-ghost"
                      style={{ padding: "6px 12px", fontSize: 12 }}
                      onClick={() => copyText("jsonld", result.generatedArtifacts.jsonLd)}
                    >
                      {copiedKey === "jsonld" ? <Check size={14} /> : <Copy size={14} />}
                      {copiedKey === "jsonld" ? t.report.copied : t.report.copy}
                    </button>
                  </div>
                  <pre className="code-block">{result.generatedArtifacts.jsonLd}</pre>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* How It Works */}
        <section className="container" id="how-it-works" style={{ padding: "48px 0 44px" }}>
          <div className="section-head">
            <h2>{t.howItWorks.title}</h2>
            <p>{t.howItWorks.subtitle}</p>
          </div>
          <div className="grid-3">
            {t.howItWorks.steps.map((step) => (
              <div className="card" key={step.num}>
                <div className="pillar-label">{step.num}</div>
                <h3 style={{ marginBottom: 8 }}>{step.title}</h3>
                <p style={{ fontSize: 14, color: "var(--text-muted)" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Global Resource Hub */}
        <section className="container" id="resources" style={{ padding: "24px 0 64px" }}>
          <div className="section-head">
            <h2>{t.resources.title}</h2>
            <p>{t.resources.subtitle}</p>
          </div>
          <div className="grid-2">
            {t.resources.cards.map((rc, idx) => (
              <div className="card" key={idx}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <span className="badge badge-ok">
                    <BookOpen size={12} /> {rc.tag}
                  </span>
                  {rc.snippet && (
                    <button
                      type="button"
                      className="btn btn-ghost"
                      style={{ padding: "4px 10px", fontSize: 12 }}
                      onClick={() => copyText(`res-${idx}`, rc.snippet!)}
                    >
                      {copiedKey === `res-${idx}` ? <Check size={13} /> : <Copy size={13} />}
                      {copiedKey === `res-${idx}` ? t.report.copied : t.report.copy}
                    </button>
                  )}
                </div>
                <h3 style={{ fontSize: 17, marginBottom: 8 }}>{rc.title}</h3>
                <p style={{ fontSize: 13.5, color: "var(--text-muted)", marginBottom: rc.snippet ? 12 : 0 }}>
                  {rc.desc}
                </p>
                {rc.snippet && <pre className="code-block">{rc.snippet}</pre>}
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="pricing-section" id="pricing">
          <div className="container">
            <div className="section-head">
              <h2>{t.pricing.title}</h2>
              <p>{t.pricing.subtitle}</p>
            </div>

            <div className="grid-3">
              <div className="price-card">
                <div>
                  <div style={{ fontWeight: 700, color: "var(--text-muted)" }}>{t.pricing.free.name}</div>
                  <div className="price-amount">$0</div>
                  <p style={{ fontSize: 13, color: "var(--text-muted)" }}>{t.pricing.free.desc}</p>
                  <ul className="price-list">
                    {t.pricing.free.features.map((f) => (
                      <li key={f}>
                        <CheckCircle2 size={15} color="var(--success)" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <a href="#scanner" className="btn btn-ghost">
                  {t.pricing.free.btn}
                </a>
              </div>

              <div className="price-card featured">
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: 700, color: "var(--accent)" }}>{t.pricing.pro.name}</span>
                    <span className="badge badge-ok">{t.pricing.popular}</span>
                  </div>
                  <div className="price-amount">
                    $49
                    <span style={{ fontSize: 15, fontWeight: 500, color: "var(--text-muted)" }}>
                      {t.pricing.perMonth}
                    </span>
                  </div>
                  <p style={{ fontSize: 13, color: "var(--text-muted)" }}>{t.pricing.pro.desc}</p>
                  <ul className="price-list">
                    {t.pricing.pro.features.map((f) => (
                      <li key={f}>
                        <CheckCircle2 size={15} color="var(--success)" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <a href={proCheckoutUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
                  {t.pricing.pro.btn} <ArrowRight size={15} />
                </a>
              </div>

              <div className="price-card">
                <div>
                  <div style={{ fontWeight: 700, color: "var(--accent-2)" }}>{t.pricing.agency.name}</div>
                  <div className="price-amount">
                    $149
                    <span style={{ fontSize: 15, fontWeight: 500, color: "var(--text-muted)" }}>
                      {t.pricing.perMonth}
                    </span>
                  </div>
                  <p style={{ fontSize: 13, color: "var(--text-muted)" }}>{t.pricing.agency.desc}</p>
                  <ul className="price-list">
                    {t.pricing.agency.features.map((f) => (
                      <li key={f}>
                        <CheckCircle2 size={15} color="var(--success)" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <a href={agencyCheckoutUrl} target="_blank" rel="noreferrer" className="btn btn-ghost">
                  {t.pricing.agency.btn} <ArrowRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">{t.footer}</div>
      </footer>
    </>
  );
}
