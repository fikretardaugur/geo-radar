import Link from "next/link";

export default function RefundPage() {
  return (
    <main className="container" style={{ padding: "64px 24px", maxWidth: 820 }}>
      <Link href="/" className="btn btn-ghost" style={{ marginBottom: 28 }}>
        ← Back to GEO Radar
      </Link>
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 12 }}>Refund Policy</h1>
      <p style={{ color: "var(--text-muted)", marginBottom: 28 }}>
        Last updated: November 2026
      </p>

      <div className="card" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <section>
          <h2 style={{ fontSize: 18, marginBottom: 6 }}>1. 14-Day Money-Back Guarantee</h2>
          <p style={{ color: "var(--text-muted)", fontSize: 14 }}>
            If you are not satisfied with your GEO Radar Pro or Agency subscription, you may request
            a full refund within 14 days of your initial purchase.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 18, marginBottom: 6 }}>2. Subscription Cancellations</h2>
          <p style={{ color: "var(--text-muted)", fontSize: 14 }}>
            You can cancel your monthly subscription at any time from your billing portal link
            provided in your receipt email. Your access will remain active until the end of your
            current billing period, with no further charges.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 18, marginBottom: 6 }}>3. How to Request a Refund</h2>
          <p style={{ color: "var(--text-muted)", fontSize: 14 }}>
            Simply email support@georadar.app with your order number or receipt email, and our team
            will process your refund within 3–5 business days.
          </p>
        </section>
      </div>
    </main>
  );
}
