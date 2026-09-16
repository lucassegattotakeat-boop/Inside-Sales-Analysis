"use client";

import { useMemo, useState } from "react";

const tabs = [
  "Quantitativo",
  "Conversão",
  "SLA",
  "Ligações",
  "Reuniões",
  "Tarefas",
  "Leads",
] as const;

const quantitativeData = [
  { vendor: "Ana Silva", channel: "Organic", value: 62000 },
  { vendor: "Bruno Costa", channel: "Paid Social", value: 54000 },
  { vendor: "Carla Dias", channel: "Outbound", value: 47000 },
  { vendor: "Diego Souza", channel: "Referral", value: 42000 },
  { vendor: "Emilia Rocha", channel: "Organic", value: 39000 },
];

const conversionData = [
  { vendor: "Ana Silva", channel: "Organic", conversion: 38.2 },
  { vendor: "Bruno Costa", channel: "Paid Social", conversion: 32.1 },
  { vendor: "Carla Dias", channel: "Outbound", conversion: 28.7 },
  { vendor: "Diego Souza", channel: "Referral", conversion: 25.5 },
  { vendor: "Emilia Rocha", channel: "Organic", conversion: 23.9 },
];

const slaData = [
  { etapa: "MQL", semana1: 4.8, semana2: 5.1, semana3: 4.5, semana4: 4.6 },
  { etapa: "Oportunidade", semana1: 7.1, semana2: 6.9, semana3: 7.2, semana4: 6.8 },
  { etapa: "Demonstração", semana1: 3.3, semana2: 3.7, semana3: 3.5, semana4: 3.1 },
  { etapa: "Proposta", semana1: 5.4, semana2: 5.0, semana3: 5.3, semana4: 5.1 },
];

const callsByWeek = [
  { vendor: "Ana Silva", w1: 220, w2: 260, w3: 240, w4: 290 },
  { vendor: "Bruno Costa", w1: 180, w2: 190, w3: 200, w4: 210 },
  { vendor: "Carla Dias", w1: 150, w2: 160, w3: 185, w4: 175 },
  { vendor: "Diego Souza", w1: 140, w2: 155, w3: 170, w4: 180 },
];

const meetingsByWeek = [
  { vendor: "Ana Silva", w1: 38, w2: 42, w3: 44, w4: 48 },
  { vendor: "Bruno Costa", w1: 31, w2: 35, w3: 37, w4: 41 },
  { vendor: "Carla Dias", w1: 28, w2: 32, w3: 34, w4: 36 },
  { vendor: "Diego Souza", w1: 24, w2: 27, w3: 31, w4: 33 },
];

const delayedTasks = [
  { vendor: "Ana Silva", w1: 11, w2: 14, w3: 12, w4: 18 },
  { vendor: "Bruno Costa", w1: 9, w2: 10, w3: 13, w4: 15 },
  { vendor: "Carla Dias", w1: 7, w2: 8, w3: 10, w4: 12 },
  { vendor: "Diego Souza", w1: 6, w2: 9, w3: 8, w4: 10 },
];

const lostLeads = [
  { negocio: "Acme Labs", etapa: "Proposta", motivo: "Preço", canal: "Outbound", icp: "SMB", atraso: true, data: "2026-09-12" },
  { negocio: "Nova Horizonte", etapa: "Demonstração", motivo: "Sem urgência", canal: "Referral", icp: "Enterprise", atraso: false, data: "2026-09-09" },
  { negocio: "BluePeak", etapa: "MQL", motivo: "Sem fit", canal: "Organic", icp: "Mid Market", atraso: true, data: "2026-09-07" },
  { negocio: "VisionOps", etapa: "Oportunidade", motivo: "Timing", canal: "Paid Social", icp: "SMB", atraso: false, data: "2026-09-03" },
];

const tabContent: Record<typeof tabs[number], { title: string; description: string }> = {
  Quantitativo: { title: "Panorama do pipeline", description: "Volume de negócios fechados por vendedor e canal." },
  Conversão: { title: "Taxa de conversão", description: "Comparativo de conversão por canal e vendedor." },
  SLA: { title: "SLA por etapa e semana", description: "Tempo médio de permanência em cada etapa do funil." },
  Ligações: { title: "Ligações realizadas", description: "Volume por vendedor e distribuição semanal." },
  Reuniões: { title: "Reuniões realizadas", description: "Oportunidades convertidas em reuniões por vendedor." },
  Tarefas: { title: "Tarefas atrasadas", description: "Atividades concluídas com atraso e taxa de cumprimento." },
  Leads: { title: "Leads perdidos", description: "Breakdown de perda, atraso e análise por vendedor." },
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Quantitativo");
  const [dateStart, setDateStart] = useState("2026-09-01");
  const [dateEnd, setDateEnd] = useState("2026-09-30");

  const totalClosed = useMemo(
    () => quantitativeData.reduce((sum, item) => sum + item.value, 0),
    [],
  );

  const totalCalls = useMemo(
    () =>
      callsByWeek.reduce(
        (sum, row) =>
          sum +
          Object.entries(row)
            .filter(([key]) => key !== "vendor")
            .reduce((acc, [, value]) => acc + Number(value), 0),
        0,
      ),
    [],
  );

  const kpis = [
    { label: "Negócios fechados", value: "R$ 284.7k", delta: "+12.4%", tone: "emerald" },
    { label: "Taxa de conversão", value: "31.8%", delta: "+4.1pp", tone: "blue" },
    { label: "SLA médio", value: "6.2 dias", delta: "-1.3 dias", tone: "amber" },
    { label: "Ligações", value: `${totalCalls.toLocaleString("pt-BR")}`, delta: "+9.5%", tone: "violet" },
    { label: "Reuniões", value: "268", delta: "+11.8%", tone: "cyan" },
    { label: "Leads perdidos", value: "41", delta: "-7.3%", tone: "rose" },
    { label: "% atraso de tarefa", value: "18.4%", delta: "-2.1pp", tone: "slate" },
  ];

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100 md:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-cyan-400">Inside Sales</p>
              <h1 className="mt-2 text-3xl font-bold text-white">Takeat Inside Sales Analysis</h1>
            </div>

            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <div className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2">
                <label className="text-xs text-slate-400">De</label>
                <input
                  type="date"
                  value={dateStart}
                  onChange={(event) => setDateStart(event.target.value)}
                  className="rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-sm text-white outline-none"
                />
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2">
                <label className="text-xs text-slate-400">Até</label>
                <input
                  type="date"
                  value={dateEnd}
                  onChange={(event) => setDateEnd(event.target.value)}
                  className="rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-sm text-white outline-none"
                />
              </div>
              <button className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
                Sincronizar agora
              </button>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-300">
            <span className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1">Período ativo: {dateStart} → {dateEnd}</span>
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-emerald-300">Última sincronização: hoje às 09:30</span>
            <span className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1">Status: sucesso</span>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {kpis.map((kpi) => (
            <article key={kpi.label} className="rounded-2xl border border-slate-800 bg-slate-900 p-4 shadow-lg shadow-slate-950/20">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-400">{kpi.label}</p>
                <span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
                  kpi.tone === "emerald" ? "bg-emerald-500/10 text-emerald-300" :
                  kpi.tone === "blue" ? "bg-blue-500/10 text-blue-300" :
                  kpi.tone === "amber" ? "bg-amber-500/10 text-amber-300" :
                  kpi.tone === "violet" ? "bg-violet-500/10 text-violet-300" :
                  kpi.tone === "cyan" ? "bg-cyan-500/10 text-cyan-300" :
                  kpi.tone === "rose" ? "bg-rose-500/10 text-rose-300" :
                  "bg-slate-500/10 text-slate-300"
                }`}>{kpi.delta}</span>
              </div>
              <div className="mt-4 text-3xl font-bold text-white">{kpi.value}</div>
            </article>
          ))}
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <nav className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                  activeTab === tab
                    ? "bg-cyan-500 text-slate-950"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-white">{tabContent[activeTab].title}</h2>
              <p className="text-sm text-slate-400">{tabContent[activeTab].description}</p>
            </div>
            <span className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs text-slate-300">
              {activeTab}
            </span>
          </div>

          {activeTab === "Quantitativo" && (
            <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
              <div className="overflow-hidden rounded-xl border border-slate-800">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-slate-800 text-slate-300">
                    <tr>
                      <th className="px-4 py-3">Vendedor</th>
                      <th className="px-4 py-3">Canal</th>
                      <th className="px-4 py-3 text-right">Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quantitativeData.map((row) => (
                      <tr key={`${row.vendor}-${row.channel}`} className="border-t border-slate-800">
                        <td className="px-4 py-3 text-white">{row.vendor}</td>
                        <td className="px-4 py-3 text-slate-300">{row.channel}</td>
                        <td className="px-4 py-3 text-right font-semibold text-emerald-300">
                          R$ {row.value.toLocaleString("pt-BR")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="space-y-4 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                <div>
                  <p className="text-sm text-slate-400">Volume total</p>
                  <p className="mt-2 text-3xl font-bold text-white">R$ {totalClosed.toLocaleString("pt-BR")}</p>
                </div>
                <div className="space-y-3">
                  {quantitativeData.map((row) => (
                    <div key={row.vendor}>
                      <div className="mb-1 flex items-center justify-between text-xs text-slate-300">
                        <span>{row.vendor}</span>
                        <span>{Math.round((row.value / totalClosed) * 100)}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-800">
                        <div className="h-full rounded-full bg-cyan-500" style={{ width: `${(row.value / totalClosed) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "Conversão" && (
            <div className="grid gap-4 lg:grid-cols-2">
              {conversionData.map((row) => (
                <div key={`${row.vendor}-${row.channel}`} className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">{row.vendor}</p>
                      <p className="text-lg font-semibold text-white">{row.channel}</p>
                    </div>
                    <span className="text-2xl font-bold text-cyan-300">{row.conversion.toFixed(1)}%</span>
                  </div>
                  <div className="mt-4 h-2 rounded-full bg-slate-800">
                    <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-400" style={{ width: `${row.conversion}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "SLA" && (
            <div className="overflow-hidden rounded-xl border border-slate-800">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-800 text-slate-300">
                  <tr>
                    <th className="px-4 py-3">Etapa</th>
                    <th className="px-4 py-3">S1</th>
                    <th className="px-4 py-3">S2</th>
                    <th className="px-4 py-3">S3</th>
                    <th className="px-4 py-3">S4</th>
                  </tr>
                </thead>
                <tbody>
                  {slaData.map((row) => (
                    <tr key={row.etapa} className="border-t border-slate-800">
                      <td className="px-4 py-3 font-medium text-white">{row.etapa}</td>
                      {([row.semana1, row.semana2, row.semana3, row.semana4] as number[]).map((value, index) => (
                        <td key={`${row.etapa}-s${index + 1}`} className="px-4 py-3 text-slate-200">
                          {value.toFixed(1)}d
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "Ligações" && (
            <div className="overflow-hidden rounded-xl border border-slate-800">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-800 text-slate-300">
                  <tr>
                    <th className="px-4 py-3">Vendedor</th>
                    <th className="px-4 py-3">S1</th>
                    <th className="px-4 py-3">S2</th>
                    <th className="px-4 py-3">S3</th>
                    <th className="px-4 py-3">S4</th>
                  </tr>
                </thead>
                <tbody>
                  {callsByWeek.map((row) => (
                    <tr key={row.vendor} className="border-t border-slate-800">
                      <td className="px-4 py-3 font-medium text-white">{row.vendor}</td>
                      {([row.w1, row.w2, row.w3, row.w4] as number[]).map((value, index) => (
                        <td key={`${row.vendor}-c${index + 1}`} className="px-4 py-3 text-slate-200">{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "Reuniões" && (
            <div className="overflow-hidden rounded-xl border border-slate-800">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-800 text-slate-300">
                  <tr>
                    <th className="px-4 py-3">Vendedor</th>
                    <th className="px-4 py-3">S1</th>
                    <th className="px-4 py-3">S2</th>
                    <th className="px-4 py-3">S3</th>
                    <th className="px-4 py-3">S4</th>
                  </tr>
                </thead>
                <tbody>
                  {meetingsByWeek.map((row) => (
                    <tr key={row.vendor} className="border-t border-slate-800">
                      <td className="px-4 py-3 font-medium text-white">{row.vendor}</td>
                      {([row.w1, row.w2, row.w3, row.w4] as number[]).map((value, index) => (
                        <td key={`${row.vendor}-m${index + 1}`} className="px-4 py-3 text-slate-200">{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "Tarefas" && (
            <div className="overflow-hidden rounded-xl border border-slate-800">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-800 text-slate-300">
                  <tr>
                    <th className="px-4 py-3">Vendedor</th>
                    <th className="px-4 py-3">S1</th>
                    <th className="px-4 py-3">S2</th>
                    <th className="px-4 py-3">S3</th>
                    <th className="px-4 py-3">S4</th>
                  </tr>
                </thead>
                <tbody>
                  {delayedTasks.map((row) => (
                    <tr key={row.vendor} className="border-t border-slate-800">
                      <td className="px-4 py-3 font-medium text-white">{row.vendor}</td>
                      {([row.w1, row.w2, row.w3, row.w4] as number[]).map((value, index) => (
                        <td key={`${row.vendor}-t${index + 1}`} className="px-4 py-3 text-slate-200">{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "Leads" && (
            <div className="overflow-hidden rounded-xl border border-slate-800">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-800 text-slate-300">
                  <tr>
                    <th className="px-4 py-3">Negócio</th>
                    <th className="px-4 py-3">Etapa anterior</th>
                    <th className="px-4 py-3">Motivo</th>
                    <th className="px-4 py-3">Canal</th>
                    <th className="px-4 py-3">ICP</th>
                    <th className="px-4 py-3">Atraso</th>
                    <th className="px-4 py-3">Data perdido</th>
                  </tr>
                </thead>
                <tbody>
                  {lostLeads.map((lead) => (
                    <tr key={lead.negocio} className="border-t border-slate-800">
                      <td className="px-4 py-3 font-medium text-white">{lead.negocio}</td>
                      <td className="px-4 py-3 text-slate-300">{lead.etapa}</td>
                      <td className="px-4 py-3 text-slate-300">{lead.motivo}</td>
                      <td className="px-4 py-3 text-slate-300">{lead.canal}</td>
                      <td className="px-4 py-3 text-slate-300">{lead.icp}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${lead.atraso ? "bg-rose-500/10 text-rose-300" : "bg-emerald-500/10 text-emerald-300"}`}>
                          {lead.atraso ? "Sim" : "Não"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-300">{lead.data}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <footer className="pb-2 text-center text-xs text-slate-500">
          Dashboard de amostra para o painel Takeat Inside Sales Analysis.
        </footer>
      </div>
    </main>
  );
}
