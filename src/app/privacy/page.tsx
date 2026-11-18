import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="container" style={{ padding: "64px 24px", maxWidth: 820 }}>
      <Link href="/" className="btn btn-ghost" style={{ marginBottom: 28 }}>
        ← Back to GEO Radar
      </Link>
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 12 }}>Privacy Policy</h1>
      <p style={{ color: "var(--text-muted)", marginBottom: 28 }}>
        Last updated: November 2026
      </p>

      <div className="card" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <section>
          <h2 style={{ fontSize: 18, marginBottom: 6 }}>1. Information We Process</h2>
          <p style={{ color: "var(--text-muted)", fontSize: 14 }}>
            When you run a GEO audit, GEO Radar processes the website URL, brand name, industry, and
            custom prompts you submit to fetch publicly available metadata (HTML headings, robots.txt,
            llms.txt, and JSON-LD schema).
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 18, marginBottom: 6 }}>2. Payment Information</h2>
          <p style={{ color: "var(--text-muted)", fontSize: 14 }}>
            All payment transactions are securely processed by our Merchant of Record (Lemon Squeezy /
            Paddle). GEO Radar never stores your credit card numbers or banking details on our
            servers.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 18, marginBottom: 6 }}>3. Third-Party AI Providers</h2>
          <p style={{ color: "var(--text-muted)", fontSize: 14 }}>
            Buyer prompt benchmarks may be sent to supported LLM APIs (such as Google Gemini or
            OpenAI) solely to evaluate brand visibility in AI-generated responses.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 18, marginBottom: 6 }}>4. Data Retention &amp; Contact</h2>
          <p style={{ color: "var(--text-muted)", fontSize: 14 }}>
            On-demand free audits are processed in real time and not sold to third parties. To
            request deletion of any account data, email support@georadar.app.
          </p>
        </section>
      </div>
    </main>
  );
}
