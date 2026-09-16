"use client";

import { FormEvent, useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("nome@takeat.app");
  const [status, setStatus] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus("Enviando...");

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const payload = await response.json();
    setStatus(payload.message || payload.error || "Ação concluída");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-slate-100">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl shadow-slate-950/40">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">Takeat</p>
        <h1 className="mt-4 text-3xl font-bold text-white">Inside Sales Analysis</h1>
        <p className="mt-3 text-sm text-slate-400">
          Login com magic link restrito ao domínio da empresa.
        </p>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <label className="block text-sm text-slate-300">
            E-mail corporativo
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="nome@takeat.app"
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none focus:border-cyan-500"
              required
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Enviar link de acesso
          </button>

          {status && (
            <p className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-300">
              {status}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
