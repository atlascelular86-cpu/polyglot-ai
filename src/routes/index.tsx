import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { ProfessorIA } from "@/components/ProfessorIA";
import { IDIOMAS, LICOES, RANKING, RANKING_LISTA } from "@/data/languages";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Poliglota — aprenda 12 idiomas com professor de IA" },
      {
        name: "description",
        content:
          "Trilha de lições, ranking semanal e treino de speaking com professor de inteligência artificial. Fale um novo idioma em 1 ano.",
      },
      { property: "og:title", content: "Poliglota — aprenda 12 idiomas com professor de IA" },
      {
        property: "og:description",
        content: "Treine conversação por voz com IA, suba na trilha de lições e acompanhe o ranking semanal.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [idiomaId, setIdiomaId] = useState("en");
  const [licaoId, setLicaoId] = useState(4);

  const idioma = useMemo(() => IDIOMAS.find((i) => i.id === idiomaId) ?? IDIOMAS[0]!, [idiomaId]);
  const licao = useMemo(() => LICOES.find((l) => l.id === licaoId) ?? LICOES[0]!, [licaoId]);

  const linha1 = LICOES.slice(0, 6);
  const linha2 = LICOES.slice(6);

  return (
    <div className="min-h-screen bg-cream text-ink">
      <header className="sticky top-0 z-40 border-b-2 border-ink bg-cream">
        <div className="mx-auto flex max-w-[1400px] items-center gap-4 px-5 py-3">
          <span className="font-display text-2xl font-extrabold tracking-tight">Poliglota</span>
          <div className="ml-auto flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full bg-sun px-3 py-1.5 text-sm font-bold text-cream ring-1 ring-ink">
              <span>🔥</span>12 dias
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-lime px-3 py-1.5 text-sm font-bold text-ink ring-1 ring-ink">
              <span>⚡</span>2.480 XP
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-sm font-bold text-cream">
              <span>💎</span>140
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1400px] gap-6 px-5 py-6">
        <aside className="hidden w-[300px] shrink-0 lg:block">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-widest text-ink/60">Seu idioma</h2>
          <div className="grid grid-cols-2 gap-2.5">
            {IDIOMAS.map((i) => {
              const ativo = i.id === idiomaId;
              return (
                <button
                  key={i.id}
                  onClick={() => setIdiomaId(i.id)}
                  className={`flex flex-col items-start gap-1 rounded-2xl p-3 text-left ring-1 ring-ink transition-transform hover:-translate-y-0.5 ${
                    ativo ? "bg-ink text-cream" : "bg-mist"
                  }`}
                >
                  <span className="text-2xl">{i.bandeira}</span>
                  <span className="text-sm font-bold">{i.nome}</span>
                  <span className={`text-[11px] ${ativo ? "text-lime" : "text-ink/50"}`}>Nível {i.nivel}</span>
                </button>
              );
            })}
          </div>

          <h2 className="mb-3 mt-7 text-sm font-bold uppercase tracking-widest text-ink/60">Progresso</h2>
          <div className="rounded-2xl bg-mist p-4 ring-1 ring-ink">
            <div className="flex items-end justify-between">
              <span className="text-xs font-semibold text-ink/60">Nível 7</span>
              <span className="font-display text-3xl font-extrabold">2.480</span>
            </div>
            <div className="mt-2 h-3 overflow-hidden rounded-full bg-cream ring-1 ring-ink">
              <div className="h-full w-3/4 rounded-full bg-sun" />
            </div>
            <p className="mt-2 text-[11px] text-ink/60">520 XP para o Nível 8</p>
          </div>
          <div className="mt-3 rounded-2xl bg-ink p-4 text-cream ring-1 ring-ink">
            <p className="text-xs font-semibold text-cream/70">Meta: poliglota em 1 ano</p>
            <div className="mt-2 h-3 overflow-hidden rounded-full bg-cream/15 ring-1 ring-cream/20">
              <div className="h-full w-1/3 rounded-full bg-lime" />
            </div>
            <p className="mt-2 text-[11px] text-cream/60">4 de 12 meses · 3 idiomas ativos</p>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <h1 className="text-3xl font-extrabold leading-tight text-balance">Suba os degraus do {idioma.nome}</h1>
          <p className="mt-1 max-w-[48ch] text-sm text-pretty text-ink/60 sm:text-base">
            Cada lição acesa ilumina o próximo degrau. Continue a escada até falar fluente.
          </p>

          <div className="mt-5 space-y-3">
            <div className="flex items-center gap-3 rounded-2xl bg-lime p-3 ring-1 ring-ink">
              <div className="grid size-11 shrink-0 place-items-center rounded-full bg-ink text-lg text-cream">🏆</div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">Módulo 3 · {licao.titulo}</p>
                <p className="text-xs text-ink/60">3 de 11 lições concluídas</p>
              </div>
              <div className="h-2 w-20 overflow-hidden rounded-full bg-cream/60 ring-1 ring-ink">
                <div className="h-full w-1/3 rounded-full bg-ink" />
              </div>
            </div>

            {[linha1, linha2].map((linha, li) => (
              <div key={li} className="flex justify-center gap-2">
                {linha.map((l) => {
                  const selecionada = l.id === licaoId;
                  const cor =
                    l.estado === "concluida"
                      ? "bg-lime"
                      : l.estado === "atual"
                        ? "bg-sun"
                        : "bg-cream ring-ink/40";
                  return (
                    <button
                      key={l.id}
                      title={l.titulo}
                      onClick={() => setLicaoId(l.id)}
                      className={`grid size-14 place-items-center rounded-full text-2xl ring-1 ring-ink transition-transform hover:-translate-y-1 ${cor} ${
                        selecionada ? "ring-4 ring-ink" : ""
                      }`}
                    >
                      {l.icone}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          <ProfessorIA idioma={idioma} topico={licao.titulo} />
        </main>

        <aside className="hidden w-[300px] shrink-0 xl:block">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-widest text-ink/60">Ranking semanal</h2>
          <div className="rounded-2xl bg-mist p-4 ring-1 ring-ink">
            <div className="flex items-end justify-center gap-3">
              {[RANKING[1]!, RANKING[0]!, RANKING[2]!].map((r) => (
                <div key={r.pos} className="flex flex-col items-center gap-1">
                  <div className="grid size-10 place-items-center rounded-full bg-tang text-lg ring-1 ring-ink">
                    {r.medalha}
                  </div>
                  <span className="text-[11px] font-bold">{r.nome}</span>
                  <span className="text-[10px] text-ink/50">{r.xp.toLocaleString("pt-BR")}</span>
                  <div className={`mt-1 w-8 rounded-t-lg bg-tang ring-1 ring-ink ${r.altura}`} />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3 divide-y-2 divide-ink/5 rounded-2xl bg-mist p-2 ring-1 ring-ink">
            {RANKING_LISTA.map((r) => (
              <div
                key={r.pos}
                className={`flex items-center gap-3 px-2 py-2 ${
                  r.voce ? "rounded-lg bg-sun/15 ring-1 ring-sun/40" : ""
                }`}
              >
                <span className={`w-5 text-sm font-bold ${r.voce ? "text-sun" : "text-ink/50"}`}>{r.pos}</span>
                <span className={`text-sm ${r.voce ? "font-bold" : "font-semibold"}`}>{r.nome}</span>
                <span className={`ml-auto text-xs ${r.voce ? "font-bold text-sun" : "text-ink/50"}`}>
                  {r.xp.toLocaleString("pt-BR")}
                </span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
