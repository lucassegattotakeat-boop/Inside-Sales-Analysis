import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body?.email ?? "").trim();

    if (!email) {
      return NextResponse.json({ ok: false, error: "E-mail obrigatório" }, { status: 400 });
    }

    if (!email.endsWith("@takeat.app")) {
      return NextResponse.json({ ok: false, error: "Use um e-mail do domínio @takeat.app" }, { status: 400 });
    }

    return NextResponse.json({
      ok: true,
      message: "Magic link configurado. Conecte o Supabase para enviar o e-mail real.",
      email,
      status: "ready_for_supabase",
    });
  } catch {
    return NextResponse.json({ ok: false, error: "Erro ao processar login" }, { status: 500 });
  }
}
