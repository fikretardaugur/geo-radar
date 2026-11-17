import { NextRequest, NextResponse } from "next/server";
import { runGeoAudit } from "@/lib/geo-analyzer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const url = typeof body?.url === "string" ? body.url.trim() : "";

    if (!url || url.length < 3) {
      return NextResponse.json(
        { error: "Please enter a valid website URL (e.g. stripe.com)." },
        { status: 400 }
      );
    }

    const brandName = typeof body?.brandName === "string" ? body.brandName : undefined;
    const industry = typeof body?.industry === "string" ? body.industry : undefined;
    const lang = typeof body?.lang === "string" ? body.lang : "en";
    const prompts = Array.isArray(body?.prompts)
      ? body.prompts.filter((p: unknown): p is string => typeof p === "string")
      : [];

    const result = await runGeoAudit({ url, brandName, industry, prompts, lang });
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to analyze URL.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
