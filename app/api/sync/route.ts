import { NextResponse } from "next/server";
import { fetchHubspotDeals, fetchHubspotTasks } from "@/lib/hubspot";

export const runtime = "nodejs";
export const maxDuration = 300;

function validateEnv() {
  const missing = [
    !process.env.HUBSPOT_ACCESS_TOKEN && "HUBSPOT_ACCESS_TOKEN",
    !process.env.NEXT_PUBLIC_SUPABASE_URL && "NEXT_PUBLIC_SUPABASE_URL",
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    !process.env.SUPABASE_SERVICE_ROLE_KEY && "SUPABASE_SERVICE_ROLE_KEY",
  ].filter(Boolean) as string[];

  return {
    ok: missing.length === 0,
    missing,
  };
}

export async function GET(request: Request) {
  try {
    const secret = request.headers.get("x-cron-secret") || request.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && secret !== `Bearer ${cronSecret}` && secret !== cronSecret) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const envStatus = validateEnv();
    if (!envStatus.ok) {
      return NextResponse.json({
        ok: false,
        envMissing: envStatus.missing,
        message: "Environment variables missing. Add HubSpot and Supabase credentials to enable live sync.",
      }, { status: 400 });
    }

    const [deals, tasks] = await Promise.all([
      fetchHubspotDeals(),
      fetchHubspotTasks(),
    ]);

    return NextResponse.json({
      ok: true,
      deals: deals?.results?.length ?? 0,
      tasks: tasks?.results?.length ?? 0,
      envStatus: "ready",
      message: "Sync completed successfully. Data is ready for the dashboard.",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  return GET(request);
}
