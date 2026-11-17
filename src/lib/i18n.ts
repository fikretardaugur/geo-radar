export type Lang = "en" | "tr" | "de" | "ru";

export const LANGUAGES: { code: Lang; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "EN" },
  { code: "tr", label: "Türkçe", flag: "TR" },
  { code: "de", label: "Deutsch", flag: "DE" },
  { code: "ru", label: "Русский", flag: "RU" },
];

export interface Dictionary {
  nav: {
    audit: string;
    howItWorks: string;
    resources: string;
    pricing: string;
    cta: string;
  };
  hero: {
    badge: string;
    titleStart: string;
    titleHighlight: string;
    subtitle: string;
    urlPlaceholder: string;
    brandPlaceholder: string;
    industryPlaceholder: string;
    scanBtn: string;
    scanningBtn: string;
    promptsPlaceholder: string;
    tryLive: string;
    addPrompts: string;
    hidePrompts: string;
  };
  report: {
    titlePrefix: string;
    analyzedLabel: string;
    crawlOk: string;
    exportPdf: string;
    grade: string;
    pillars: {
      crawlerAccess: string;
      structuredData: string;
      answerReadiness: string;
      citationSignals: string;
    };
    botTitle: string;
    llmsFile: string;
    detected: string;
    missing: string;
    blocked: string;
    entityTitle: string;
    pageTitle: string;
    schemasFound: string;
    noneFound: string;
    faqSchema: string;
    present: string;
    questionHeadings: string;
    detectedCount: string;
    wordCount: string;
    words: string;
    promptTitle: string;
    liveMode: string;
    simMode: string;
    mentioned: string;
    notCited: string;
    actionPlanTitle: string;
    noGaps: string;
    llmsArtifactTitle: string;
    jsonLdArtifactTitle: string;
    copy: string;
    copied: string;
  };
  howItWorks: {
    title: string;
    subtitle: string;
    steps: { num: string; title: string; desc: string }[];
  };
  resources: {
    title: string;
    subtitle: string;
    cards: { tag: string; title: string; desc: string; snippet?: string }[];
  };
  pricing: {
    title: string;
    subtitle: string;
    popular: string;
    perMonth: string;
    free: { name: string; desc: string; features: string[]; btn: string };
    pro: { name: string; desc: string; features: string[]; btn: string };
    agency: { name: string; desc: string; features: string[]; btn: string };
  };
  footer: string;
}

export const DICTIONARIES: Record<Lang, Dictionary> = {
  en: {
    nav: {
      audit: "AI Audit",
      howItWorks: "How It Works",
      resources: "Resources",
      pricing: "Pricing",
      cta: "Start Free / Upgrade",
    },
    hero: {
      badge: "Generative Engine Optimization (GEO) for 2026",
      titleStart: "See Why AI Recommends Your Competitors — ",
      titleHighlight: "And Fix It in Minutes",
      subtitle:
        "Buyers ask ChatGPT, Perplexity, Gemini, and Claude before they ever visit Google. Audit any website’s live AI crawler access, schema clarity, and citation readiness.",
      urlPlaceholder: "Website URL (e.g. stripe.com)",
      brandPlaceholder: "Brand name (optional)",
      industryPlaceholder: "Industry (e.g. B2B SaaS)",
      scanBtn: "Run GEO Audit",
      scanningBtn: "Scanning...",
      promptsPlaceholder:
        "Enter up to 3 buyer prompts (one per line), e.g.\nWhat is the best payment API for SaaS?\nTop alternatives to Adyen for startups",
      tryLive: "Try live:",
      addPrompts: "+ Add custom buyer prompts",
      hidePrompts: "Hide custom prompts",
    },
    report: {
      titlePrefix: "GEO Audit Report:",
      analyzedLabel: "Analyzed",
      crawlOk: "Live HTML & robots.txt crawled",
      exportPdf: "Export PDF",
      grade: "Grade",
      pillars: {
        crawlerAccess: "AI Crawler Access",
        structuredData: "Structured Data",
        answerReadiness: "Answer Readiness",
        citationSignals: "Citation Signals",
      },
      botTitle: "AI Crawler & /llms.txt Status",
      llmsFile: "/llms.txt File",
      detected: "Detected",
      missing: "Missing",
      blocked: "Blocked",
      entityTitle: "On-Page Entity & Schema Signals",
      pageTitle: "Page Title",
      schemasFound: "JSON-LD Schemas Found",
      noneFound: "None Found",
      faqSchema: "FAQPage Schema",
      present: "Present",
      questionHeadings: "Question Headings (H2/H3)",
      detectedCount: "detected",
      wordCount: "Word Count / Headings",
      words: "words",
      promptTitle: "AI Engine Buyer Prompt Benchmark",
      liveMode: "Live LLM API Responses",
      simMode: "Simulated Benchmark",
      mentioned: "Mentioned",
      notCited: "Not Cited",
      actionPlanTitle: "Prioritized GEO Action Plan",
      noGaps: "Excellent! No critical technical GEO gaps were found on the homepage.",
      llmsArtifactTitle: "Generated /llms.txt (Ready to Upload)",
      jsonLdArtifactTitle: "Generated FAQ + Org JSON-LD Schema",
      copy: "Copy",
      copied: "Copied",
    },
    howItWorks: {
      title: "Built for SaaS Founders & SEO Agencies",
      subtitle: "Turn invisible websites into top-cited AI search recommendations in three steps.",
      steps: [
        {
          num: "Step 01",
          title: "Crawl AI Signals",
          desc: "Inspect robots.txt AI crawler rules, /llms.txt availability, JSON-LD entities, and question-driven content structure in seconds.",
        },
        {
          num: "Step 02",
          title: "Benchmark Prompts",
          desc: "Test real buyer prompts across AI engines to see when your brand is cited vs. when competitors steal the recommendation.",
        },
        {
          num: "Step 03",
          title: "Deploy Auto-Fixes",
          desc: "Copy your generated llms.txt and FAQ JSON-LD snippets directly into production, or export a clean PDF audit for clients.",
        },
      ],
    },
    resources: {
      title: "Global GEO Resource Hub",
      subtitle: "Ready-to-use templates, crawler rules, and playbooks to rank #1 in AI answers.",
      cards: [
        {
          tag: "Template",
          title: "AI Bot Allow-List for robots.txt",
          desc: "Ensure OpenAI, Perplexity, Anthropic, and Google Gemini can index your key product pages without friction.",
          snippet:
            "User-agent: GPTBot\nAllow: /\n\nUser-agent: OAI-SearchBot\nAllow: /\n\nUser-agent: PerplexityBot\nAllow: /\n\nUser-agent: ClaudeBot\nAllow: /\n\nUser-agent: Google-Extended\nAllow: /",
        },
        {
          tag: "Standard",
          title: "What is /llms.txt & Why It Matters",
          desc: "Place a clean Markdown summary at yoursite.com/llms.txt so LLMs read your pricing, features, and docs without HTML noise.",
          snippet:
            "# YourBrand\n> Short 1-sentence category & value proposition.\n\n## Key Pages\n- [Pricing](https://yoursite.com/pricing)\n- [Docs](https://yoursite.com/docs)",
        },
        {
          tag: "Playbook",
          title: "Agency Pitch: Sell GEO Audits for $500+",
          desc: "Run a free GEO Radar scan on a prospect, export the PDF, and show them exact competitor citations they are losing today.",
        },
        {
          tag: "Checklist",
          title: "Answer-First Content Formatting",
          desc: "Use natural buyer questions as H2/H3 headings, answer in the first 40 words, and back claims with FAQPage JSON-LD schema.",
        },
      ],
    },
    pricing: {
      title: "Simple USD Pricing",
      subtitle: "Start with a free live audit. Upgrade for automated weekly tracking & white-label reports.",
      popular: "Most Popular",
      perMonth: "/mo",
      free: {
        name: "Free Audit",
        desc: "Instant on-demand homepage GEO check.",
        features: [
          "Live robots.txt & llms.txt check",
          "JSON-LD & FAQ schema audit",
          "Auto-generated llms.txt snippet",
        ],
        btn: "Run Free Audit",
      },
      pro: {
        name: "Pro Growth",
        desc: "For SaaS & e-commerce teams winning AI search.",
        features: [
          "50 live LLM prompt checks / week",
          "ChatGPT, Perplexity & Gemini tracking",
          "Competitor citation alerts",
          "Full-site crawl up to 100 pages",
        ],
        btn: "Get Pro",
      },
      agency: {
        name: "Agency White-Label",
        desc: "Resell AI visibility audits to your own clients.",
        features: [
          "Unlimited client domains & PDF exports",
          "Custom agency logo on reports",
          "300 live LLM prompt checks / week",
          "Priority API & webhook access",
        ],
        btn: "Start Agency Plan",
      },
    },
    footer: "GEO Radar — Built for the AI Search Era. Ready for Global Payments & Live LLM APIs.",
  },

  tr: {
    nav: {
      audit: "AI Denetimi",
      howItWorks: "Nasıl Çalışır",
      resources: "Kaynaklar",
      pricing: "Fiyatlandırma",
      cta: "Ücretsiz Başla / Yükselt",
    },
    hero: {
      badge: "2026 İçin Yapay Zeka Arama Optimizasyonu (GEO)",
      titleStart: "Yapay Zeka Neden Rakibini Öneriyor? — ",
      titleHighlight: "Dakikalar İçinde Düzelt",
      subtitle:
        "Müşteriler artık Google’dan önce ChatGPT, Perplexity, Gemini ve Claude’a soruyor. Herhangi bir web sitesinin AI bot erişimini, şema netliğini ve önerilme skorunu canlı test et.",
      urlPlaceholder: "Web Sitesi (örn. ikas.com)",
      brandPlaceholder: "Marka adı (isteğe bağlı)",
      industryPlaceholder: "Sektör (örn. E-ticaret, Klinik)",
      scanBtn: "GEO Analizi Yap",
      scanningBtn: "Taranıyor...",
      promptsPlaceholder:
        "En fazla 3 müşteri sorusu yaz (her satıra bir tane):\nTürkiye'de en iyi e-ticaret altyapısı hangisi?\nKüçük işletmeler için en iyi muhasebe programı",
      tryLive: "Hızlı dene:",
      addPrompts: "+ Özel müşteri sorusu ekle",
      hidePrompts: "Özel soruları gizle",
    },
    report: {
      titlePrefix: "GEO Denetim Raporu:",
      analyzedLabel: "Analiz zamanı",
      crawlOk: "Canlı HTML ve robots.txt tarandı",
      exportPdf: "PDF İndir",
      grade: "Not",
      pillars: {
        crawlerAccess: "AI Bot Erişimi",
        structuredData: "Yapısal Veri (Schema)",
        answerReadiness: "Yanıt Uygunluğu",
        citationSignals: "Referans Sinyalleri",
      },
      botTitle: "AI Bot & /llms.txt Durumu",
      llmsFile: "/llms.txt Dosyası",
      detected: "Mevcut",
      missing: "Eksik",
      blocked: "Engelli",
      entityTitle: "Sayfa İçi Varlık & Şema Sinyalleri",
      pageTitle: "Sayfa Başlığı",
      schemasFound: "Bulunan JSON-LD Şemaları",
      noneFound: "Bulunamadı",
      faqSchema: "FAQPage Şeması",
      present: "Mevcut",
      questionHeadings: "Soru Başlıkları (H2/H3)",
      detectedCount: "adet tespit edildi",
      wordCount: "Kelime / Başlık Sayısı",
      words: "kelime",
      promptTitle: "Yapay Zeka Müşteri Sorusu Testi",
      liveMode: "Canlı LLM API Yanıtları",
      simMode: "Simülasyon Modu",
      mentioned: "Önerildi",
      notCited: "Önerilmedi",
      actionPlanTitle: "Öncelikli GEO Aksiyon Planı",
      noGaps: "Harika! Ana sayfada kritik bir teknik GEO eksiği bulunamadı.",
      llmsArtifactTitle: "Hazır /llms.txt Dosyası (Kopyala & Yükle)",
      jsonLdArtifactTitle: "Hazır FAQ + Kurum JSON-LD Kodu",
      copy: "Kopyala",
      copied: "Kopyalandı",
    },
    howItWorks: {
      title: "SaaS Kurucuları ve Ajanslar İçin Tasarlandı",
      subtitle: "Görünmez web sitelerini 3 adımda yapay zekanın en çok önerdiği markalara dönüştürün.",
      steps: [
        {
          num: "Adım 01",
          title: "AI Sinyallerini Tara",
          desc: "robots.txt bot izinlerini, /llms.txt dosyasını, JSON-LD şemalarını ve soru-cevap yapısını saniyeler içinde denetle.",
        },
        {
          num: "Adım 02",
          title: "Müşteri Sorularını Ölç",
          desc: "Gerçek alıcı sorularını yapay zekaya sorarak markanın önerilip önerilmediğini ve hangi rakiplerin öne çıktığını gör.",
        },
        {
          num: "Adım 03",
          title: "Hazır Çözümü Uygula",
          desc: "Otomatik üretilen llms.txt ve FAQ JSON-LD kodlarını sitene kopyala ya da müşterine sunmak için PDF raporunu indir.",
        },
      ],
    },
    resources: {
      title: "Global GEO Kaynak Merkezi",
      subtitle: "Yapay zeka aramalarında 1. sıraya çıkmak için hazır şablonlar ve uygulama rehberleri.",
      cards: [
        {
          tag: "Şablon",
          title: "robots.txt İçin AI Bot İzin Listesi",
          desc: "OpenAI, Perplexity, Anthropic ve Google Gemini botlarının ürün sayfalarını engelsiz okumasını sağla.",
          snippet:
            "User-agent: GPTBot\nAllow: /\n\nUser-agent: OAI-SearchBot\nAllow: /\n\nUser-agent: PerplexityBot\nAllow: /\n\nUser-agent: ClaudeBot\nAllow: /\n\nUser-agent: Google-Extended\nAllow: /",
        },
        {
          tag: "Standart",
          title: "/llms.txt Nedir ve Neden Kritik?",
          desc: "Sitenizin kök dizinine (/llms.txt) koyacağınız temiz Markdown özeti sayesinde yapay zeka fiyat ve özelliklerinizi hatasız okur.",
          snippet:
            "# MarkaAdı\n> Tek cümlelik net kategori ve değer önerisi.\n\n## Önemli Sayfalar\n- [Fiyatlandırma](https://siteniz.com/fiyatlar)\n- [Dokümanlar](https://siteniz.com/docs)",
        },
        {
          tag: "Satış Rehberi",
          title: "Ajanslar İçin: GEO Denetimini ₺15.000+’a Sat",
          desc: "Potansiyel müşterinin sitesini tara, PDF’i indir ve rakibinin ChatGPT’de çıkıp kendisinin çıkmadığını canlı kanıtla.",
        },
        {
          tag: "Kontrol Listesi",
          title: "Yanıt Odaklı İçerik Formatı",
          desc: "H2/H3 başlıklarını müşteri sorusu şeklinde yaz, ilk 40 kelimede net cevap ver ve FAQPage JSON-LD şemasıyla destekle.",
        },
      ],
    },
    pricing: {
      title: "Şeffaf USD Fiyatlandırma",
      subtitle: "Ücretsiz canlı analizle başla. Haftalık otomatik takip ve beyaz etiket raporlar için yükselt.",
      popular: "En Popüler",
      perMonth: "/ay",
      free: {
        name: "Ücretsiz Denetim",
        desc: "Anlık ana sayfa GEO kontrolü.",
        features: [
          "Canlı robots.txt & llms.txt kontrolü",
          "JSON-LD & FAQ şema denetimi",
          "Otomatik /llms.txt üretici",
        ],
        btn: "Ücretsiz Tara",
      },
      pro: {
        name: "Pro Büyüme",
        desc: "Yapay zeka aramalarını kazanmak isteyen markalar için.",
        features: [
          "Haftalık 50 canlı LLM soru testi",
          "ChatGPT, Perplexity & Gemini takibi",
          "Rakip alıntı uyarıları",
          "100 sayfaya kadar tam site taraması",
        ],
        btn: "Pro'ya Geç",
      },
      agency: {
        name: "Ajans White-Label",
        desc: "Müşterilerinize kendi markanızla GEO raporu satın.",
        features: [
          "Sınırsız müşteri domaini ve PDF çıktısı",
          "Raporlarda özel ajans logosu",
          "Haftalık 300 canlı LLM soru testi",
          "Öncelikli API ve webhook erişimi",
        ],
        btn: "Ajans Planını Başlat",
      },
    },
    footer: "GEO Radar — Yapay Zeka Arama Çağı İçin Üretildi. Global Ödeme ve Canlı LLM API’lerine Hazır.",
  },

  de: {
    nav: {
      audit: "KI-Audit",
      howItWorks: "So funktioniert's",
      resources: "Ressourcen",
      pricing: "Preise",
      cta: "Kostenlos starten",
    },
    hero: {
      badge: "Generative Engine Optimization (GEO) für 2026",
      titleStart: "Warum KI Ihre Konkurrenz empfiehlt — ",
      titleHighlight: "In Minuten beheben",
      subtitle:
        "Käufer fragen ChatGPT, Perplexity, Gemini und Claude, bevor sie Google öffnen. Prüfen Sie Live-Crawler-Zugriff, Schema-Daten und Zitierbereitschaft.",
      urlPlaceholder: "Website-URL (z. B. stripe.com)",
      brandPlaceholder: "Markenname (optional)",
      industryPlaceholder: "Branche (z. B. B2B SaaS)",
      scanBtn: "GEO-Audit starten",
      scanningBtn: "Wird gescannt...",
      promptsPlaceholder:
        "Bis zu 3 Käuferfragen eingeben (eine pro Zeile):\nWelche ist die beste Zahlungs-API für SaaS?\nTop Alternativen für B2B-Teams",
      tryLive: "Live testen:",
      addPrompts: "+ Eigene Käuferfragen hinzufügen",
      hidePrompts: "Fragen ausblenden",
    },
    report: {
      titlePrefix: "GEO-Audit-Bericht:",
      analyzedLabel: "Analysiert am",
      crawlOk: "Live-HTML & robots.txt gecrawlt",
      exportPdf: "PDF Export",
      grade: "Note",
      pillars: {
        crawlerAccess: "KI-Crawler-Zugriff",
        structuredData: "Strukturierte Daten",
        answerReadiness: "Antwort-Qualität",
        citationSignals: "Zitier-Signale",
      },
      botTitle: "KI-Crawler & /llms.txt Status",
      llmsFile: "/llms.txt Datei",
      detected: "Gefunden",
      missing: "Fehlt",
      blocked: "Blockiert",
      entityTitle: "On-Page Entity & Schema Signale",
      pageTitle: "Seitentitel",
      schemasFound: "Gefundene JSON-LD Schemas",
      noneFound: "Keine gefunden",
      faqSchema: "FAQPage Schema",
      present: "Vorhanden",
      questionHeadings: "Frage-Überschriften (H2/H3)",
      detectedCount: "erkannt",
      wordCount: "Wortanzahl / Überschriften",
      words: "Wörter",
      promptTitle: "KI-Käuferfragen-Benchmark",
      liveMode: "Live LLM-API-Antworten",
      simMode: "Simulierter Benchmark",
      mentioned: "Erwähnt",
      notCited: "Nicht zitiert",
      actionPlanTitle: "Priorisierter GEO-Aktionsplan",
      noGaps: "Hervorragend! Keine kritischen technischen GEO-Lücken gefunden.",
      llmsArtifactTitle: "Generierte /llms.txt (Bereit zum Upload)",
      jsonLdArtifactTitle: "Generiertes FAQ + Org JSON-LD Schema",
      copy: "Kopieren",
      copied: "Kopiert",
    },
    howItWorks: {
      title: "Entwickelt für SaaS-Gründer & SEO-Agenturen",
      subtitle: "Verwandeln Sie unsichtbare Websites in drei Schritten in Top-KI-Empfehlungen.",
      steps: [
        {
          num: "Schritt 01",
          title: "KI-Signale crawlen",
          desc: "Prüfen Sie robots.txt KI-Regeln, /llms.txt, JSON-LD-Entitäten und Frage-Antwort-Strukturen in Sekunden.",
        },
        {
          num: "Schritt 02",
          title: "Prompts testen",
          desc: "Testen Sie echte Käuferfragen in KI-Modellen und sehen Sie, ob Ihre Marke oder die Konkurrenz zitiert wird.",
        },
        {
          num: "Schritt 03",
          title: "Fixes deployen",
          desc: "Kopieren Sie llms.txt und FAQ-JSON-LD direkt in Ihre Website oder exportieren Sie ein Kunden-PDF.",
        },
      ],
    },
    resources: {
      title: "Globales GEO-Ressourcencenter",
      subtitle: "Sofort einsetzbare Vorlagen und Playbooks für Top-Platzierungen in KI-Antworten.",
      cards: [
        {
          tag: "Vorlage",
          title: "KI-Bot Allow-List für robots.txt",
          desc: "Stellen Sie sicher, dass OpenAI, Perplexity, Anthropic und Google Gemini Ihre Produktseiten indexieren dürfen.",
          snippet:
            "User-agent: GPTBot\nAllow: /\n\nUser-agent: OAI-SearchBot\nAllow: /\n\nUser-agent: PerplexityBot\nAllow: /\n\nUser-agent: ClaudeBot\nAllow: /\n\nUser-agent: Google-Extended\nAllow: /",
        },
        {
          tag: "Standard",
          title: "Was ist /llms.txt & warum es zählt",
          desc: "Eine kompakte Markdown-Datei unter ihreseite.de/llms.txt hilft LLMs, Preise und Funktionen fehlerfrei zu erfassen.",
          snippet:
            "# IhreMarke\n> Kurze 1-Satz-Beschreibung Ihres Angebots.\n\n## Wichtige Seiten\n- [Preise](https://ihreseite.de/preise)\n- [Dokumentation](https://ihreseite.de/docs)",
        },
        {
          tag: "Playbook",
          title: "Agentur-Pitch: GEO-Audits ab 500 € verkaufen",
          desc: "Scannen Sie die Website eines Interessenten, exportieren Sie das PDF und zeigen Sie verlorene KI-Empfehlungen.",
        },
        {
          tag: "Checkliste",
          title: "Answer-First Content-Struktur",
          desc: "Nutzen Sie echte Kundenfragen als H2/H3, antworten Sie in den ersten 40 Wörtern und nutzen Sie FAQPage JSON-LD.",
        },
      ],
    },
    pricing: {
      title: "Klare USD-Preise",
      subtitle: "Starten Sie mit einem kostenlosen Live-Audit. Upgrade für wöchentliches Tracking & White-Label-PDFs.",
      popular: "Beliebt",
      perMonth: "/Monat",
      free: {
        name: "Gratis Audit",
        desc: "Sofortiger Homepage-GEO-Check.",
        features: [
          "Live robots.txt & llms.txt Prüfung",
          "JSON-LD & FAQ Schema-Audit",
          "Automatischer llms.txt-Generator",
        ],
        btn: "Kostenlos testen",
      },
      pro: {
        name: "Pro Growth",
        desc: "Für SaaS- & E-Commerce-Teams.",
        features: [
          "50 Live-LLM-Prompt-Checks / Woche",
          "ChatGPT, Perplexity & Gemini Tracking",
          "Wettbewerber-Zitier-Alerts",
          "Vollständiger Crawl bis zu 100 Seiten",
        ],
        btn: "Pro wählen",
      },
      agency: {
        name: "Agency White-Label",
        desc: "Verkaufen Sie KI-Sichtbarkeits-Audits an eigene Kunden.",
        features: [
          "Unbegrenzte Kunden-Domains & PDFs",
          "Eigenes Agentur-Logo auf Berichten",
          "300 Live-LLM-Prompt-Checks / Woche",
          "Prioritäts-API & Webhook-Zugang",
        ],
        btn: "Agentur-Plan starten",
      },
    },
    footer: "GEO Radar — Entwickelt für die Ära der KI-Suche. Bereit für globale Zahlungen & Live-LLM-APIs.",
  },

  ru: {
    nav: {
      audit: "ИИ-Аудит",
      howItWorks: "Как это работает",
      resources: "Ресурсы",
      pricing: "Тарифы",
      cta: "Начать бесплатно",
    },
    hero: {
      badge: "Generative Engine Optimization (GEO) 2026",
      titleStart: "Узнайте, почему ИИ рекомендует конкурентов — ",
      titleHighlight: "И исправьте это за минуты",
      subtitle:
        "Клиенты спрашивают ChatGPT, Perplexity, Gemini и Claude раньше, чем открывают Google. Проверьте доступ ИИ-ботов, разметку Schema и готовность к цитированию.",
      urlPlaceholder: "URL сайта (напр. stripe.com)",
      brandPlaceholder: "Бренд (необязательно)",
      industryPlaceholder: "Ниша (напр. B2B SaaS)",
      scanBtn: "Запустить аудит",
      scanningBtn: "Сканирование...",
      promptsPlaceholder:
        "Введите до 3 запросов покупателей (по одному на строке):\nКакой лучший платежный сервис для SaaS?\nТоп альтернатив для малого бизнеса",
      tryLive: "Быстрый тест:",
      addPrompts: "+ Добавить свои запросы",
      hidePrompts: "Скрыть запросы",
    },
    report: {
      titlePrefix: "GEO-отчёт:",
      analyzedLabel: "Проверено",
      crawlOk: "HTML и robots.txt проверены в реальном времени",
      exportPdf: "Экспорт PDF",
      grade: "Оценка",
      pillars: {
        crawlerAccess: "Доступ ИИ-ботов",
        structuredData: "Структурные данные",
        answerReadiness: "Готовность к ответам",
        citationSignals: "Сигналы цитирования",
      },
      botTitle: "Статус ИИ-краулеров и /llms.txt",
      llmsFile: "Файл /llms.txt",
      detected: "Найден",
      missing: "Отсутствует",
      blocked: "Заблокирован",
      entityTitle: "Сущности страницы и Schema-сигналы",
      pageTitle: "Заголовок страницы",
      schemasFound: "Найденные JSON-LD схемы",
      noneFound: "Не найдены",
      faqSchema: "Схема FAQPage",
      present: "Есть",
      questionHeadings: "Заголовки-вопросы (H2/H3)",
      detectedCount: "найдено",
      wordCount: "Объём текста / Заголовки",
      words: "слов",
      promptTitle: "Проверка запросов покупателей в ИИ",
      liveMode: "Живые ответы LLM API",
      simMode: "Симуляция",
      mentioned: "Упомянут",
      notCited: "Не указан",
      actionPlanTitle: "Приоритетный план действий GEO",
      noGaps: "Отлично! Критических технических ошибок GEO на главной странице не найдено.",
      llmsArtifactTitle: "Готовый файл /llms.txt (для загрузки на сайт)",
      jsonLdArtifactTitle: "Готовая схема FAQ + Organization JSON-LD",
      copy: "Копировать",
      copied: "Скопировано",
    },
    howItWorks: {
      title: "Создано для SaaS-основателей и SEO-агентств",
      subtitle: "Превратите невидимые сайты в топ-рекомендации ИИ за три шага.",
      steps: [
        {
          num: "Шаг 01",
          title: "Сканируйте ИИ-сигналы",
          desc: "Проверяйте правила robots.txt для ИИ-ботов, наличие /llms.txt, JSON-LD и структуру вопросов-ответов за секунды.",
        },
        {
          num: "Шаг 02",
          title: "Тестируйте запросы",
          desc: "Проверяйте реальные запросы покупателей в нейросетях и узнавайте, кого рекомендует ИИ — вас или конкурентов.",
        },
        {
          num: "Шаг 03",
          title: "Внедряйте готовый код",
          desc: "Скопируйте готовые llms.txt и FAQ JSON-LD на сайт или скачайте PDF-отчёт для презентации клиенту.",
        },
      ],
    },
    resources: {
      title: "Глобальный центр ресурсов GEO",
      subtitle: "Готовые шаблоны, правила для краулеров и руководства для роста в ИИ-поиске.",
      cards: [
        {
          tag: "Шаблон",
          title: "Разрешение ИИ-ботов в robots.txt",
          desc: "Убедитесь, что OpenAI, Perplexity, Anthropic и Google Gemini имеют доступ к страницам ваших продуктов.",
          snippet:
            "User-agent: GPTBot\nAllow: /\n\nUser-agent: OAI-SearchBot\nAllow: /\n\nUser-agent: PerplexityBot\nAllow: /\n\nUser-agent: ClaudeBot\nAllow: /\n\nUser-agent: Google-Extended\nAllow: /",
        },
        {
          tag: "Стандарт",
          title: "Что такое /llms.txt и зачем он нужен",
          desc: "Краткое Markdown-описание в корне сайта помогает LLM без ошибок считывать ваши тарифы, функции и документацию.",
          snippet:
            "# ВашБренд\n> Краткое описание вашей ниши и ценности в 1 предложении.\n\n## Основные разделы\n- [Тарифы](https://site.com/pricing)\n- [Документация](https://site.com/docs)",
        },
        {
          tag: "Гайд",
          title: "Для агентств: продажа GEO-аудитов от $500",
          desc: "Просканируйте сайт потенциального клиента, выгрузите PDF и покажите, каких клиентов он теряет в ответах ChatGPT.",
        },
        {
          tag: "Чек-лист",
          title: "Контент формата Answer-First",
          desc: "Формулируйте заголовки H2/H3 как вопросы покупателей, отвечайте в первых 40 словах и добавляйте FAQPage JSON-LD.",
        },
      ],
    },
    pricing: {
      title: "Простые тарифы в USD",
      subtitle: "Начните с бесплатного аудита. Перейдите на Pro для еженедельного трекинга и white-label отчётов.",
      popular: "Популярный",
      perMonth: "/мес",
      free: {
        name: "Бесплатный аудит",
        desc: "Мгновенная проверка главной страницы.",
        features: [
          "Проверка robots.txt и /llms.txt",
          "Аудит JSON-LD и FAQ-схемы",
          "Генератор файла /llms.txt",
        ],
        btn: "Проверить бесплатно",
      },
      pro: {
        name: "Pro Growth",
        desc: "Для SaaS и e-commerce команд.",
        features: [
          "50 живых LLM-проверок в неделю",
          "Мониторинг ChatGPT, Perplexity и Gemini",
          "Уведомления о цитировании конкурентов",
          "Сканирование до 100 страниц сайта",
        ],
        btn: "Выбрать Pro",
      },
      agency: {
        name: "Agency White-Label",
        desc: "Продавайте GEO-аудиты своим клиентам под вашим брендом.",
        features: [
          "Безлимитные домены клиентов и PDF",
          "Свой логотип агентства в отчётах",
          "300 живых LLM-проверок в неделю",
          "Приоритетный доступ к API и webhook",
        ],
        btn: "Начать Agency",
      },
    },
    footer: "GEO Radar — Создано для эпохи ИИ-поиска. Готово к глобальным платежам и живым LLM API.",
  },
};
