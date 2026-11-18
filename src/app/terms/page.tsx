import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="container" style={{ padding: "64px 24px", maxWidth: 820 }}>
      <Link href="/" className="btn btn-ghost" style={{ marginBottom: 28 }}>
        ← Back to GEO Radar
      </Link>
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 12 }}>Terms of Service</h1>
      <p style={{ color: "var(--text-muted)", marginBottom: 28 }}>
        Last updated: November 2026
      </p>

      <div className="card" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <section>
          <h2 style={{ fontSize: 18, marginBottom: 6 }}>1. Acceptance of Terms</h2>
          <p style={{ color: "var(--text-muted)", fontSize: 14 }}>
            By accessing or using GEO Radar, you agree to be bound by these Terms of Service. If you
            are using the service on behalf of a business or agency, you represent that you have the
            authority to bind that entity.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 18, marginBottom: 6 }}>2. Service Description</h2>
          <p style={{ color: "var(--text-muted)", fontSize: 14 }}>
            GEO Radar provides automated Generative Engine Optimization (GEO) audits, AI crawler
            accessibility checks, structured data analysis, and AI search citation benchmarks for
            publicly accessible websites.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 18, marginBottom: 6 }}>3. Subscriptions &amp; Billing</h2>
          <p style={{ color: "var(--text-muted)", fontSize: 14 }}>
            Paid plans (Pro Growth and Agency White-Label) are billed monthly on a recurring basis
            through our Merchant of Record payment partner. You may cancel your subscription at any
            time before the next billing cycle.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 18, marginBottom: 6 }}>4. Acceptable Use</h2>
          <p style={{ color: "var(--text-muted)", fontSize: 14 }}>
            You agree not to abuse, overload, or use automated scripts to bypass rate limits on GEO
            Radar. Only audit domains that are publicly accessible or that you are authorized to
            evaluate.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 18, marginBottom: 6 }}>5. Contact</h2>
          <p style={{ color: "var(--text-muted)", fontSize: 14 }}>
            For support or legal inquiries, contact us at support@georadar.app.
          </p>
        </section>
      </div>
    </main>
  );
}
