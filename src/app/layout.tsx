import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GEO Radar — AI Search Visibility & Citation Audit",
  description:
    "Discover why ChatGPT, Perplexity, Gemini, and Claude recommend your competitors instead of you — and fix it in minutes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
