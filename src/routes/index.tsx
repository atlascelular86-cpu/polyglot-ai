import { createFileRoute } from "@tanstack/react-router";
import {
  BookOpenCheck,
  CheckCircle2,
  ChevronDown,
  Flame,
  Gem,
  GraduationCap,
  Languages,
  Lock,
  Menu,
  PlayCircle,
  Sparkles,
  Trophy,
  X,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";

import { ProfessorIA } from "@/components/ProfessorIA";
import { Button } from "@/components/ui/button";
import { IDIOMAS, LICOES, RANKING, RANKING_LISTA } from "@/data/languages";
import { cn } from "@/lib/utils";

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
  const [menuAberto, setMenuAberto] = useState(false);
  const [secaoAberta, setSecaoAberta] = useState<"idiomas" | "modulos">("idiomas");

  const idioma = useMemo(() => IDIOMAS.find((i) => i.id === idiomaId) ?? IDIOMAS[0]!, [idiomaId]);
  const licao = useMemo(() => LICOES.find((l) => l.id === licaoId) ?? LICOES[0]!, [licaoId]);

  return (
    <div className="min-h-screen bg-cream text-ink">
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1280px] items-center gap-3 px-4 py-3 sm:px-6">
          <Button
            onClick={() => setMenuAberto(true)}
            className="h-10 rounded-full bg-ink px-4 text-cream hover:bg-ink/90"
          >
            <Menu className="size-4" />
            Menu
          </Button>

          <div>
            <span className="font-display text-2xl font-extrabold tracking-tight">Poliglota</span>
            <span className="ml-2 hidden text-sm font-semibold text-ink/50 sm:inline">Professor de idiomas com IA</span>
          </div>

          <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
            <span className="flex items-center gap-1 rounded-full bg-sun px-2.5 py-1.5 text-xs font-extrabold text-cream ring-1 ring-ink/10 sm:text-sm">
              <Flame className="size-4" />12 dias
            </span>
            <span className="hidden items-center gap-1 rounded-full bg-lime px-2.5 py-1.5 text-xs font-extrabold text-ink ring-1 ring-ink/10 sm:flex sm:text-sm">
              <Zap className="size-4" />2.480 XP
            </span>
            <span className="flex items-center gap-1 rounded-full bg-ink px-2.5 py-1.5 text-xs font-extrabold text-cream sm:text-sm">
              <Gem className="size-4" />140
            </span>
          </div>
        </div>
      </header>

      {menuAberto && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-ink/60" onClick={() => setMenuAberto(false)} />
          <aside className="absolute inset-y-0 left-0 flex w-[92vw] max-w-[430px] flex-col bg-cream text-ink shadow-2xl">
            <div className="flex items-start justify-between gap-3 border-b border-ink/10 bg-ink px-5 py-5 text-cream">
              <div>
                <h2 className="font-display text-2xl font-extrabold">Poliglota</h2>
                <p className="mt-1 text-sm font-medium text-cream/70">
                  Idiomas e módulos ficam aqui para manter seu treino limpo.
                </p>
              </div>
              <Button
                size="icon"
                onClick={() => setMenuAberto(false)}
                aria-label="Fechar menu"
                className="shrink-0 rounded-full bg-cream/10 text-cream ring-1 ring-cream/20 hover:bg-cream/15"
              >
                <X className="size-4" />
              </Button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              <div className="overflow-hidden rounded-2xl bg-mist ring-1 ring-ink/10">
                <Button
                  variant="ghost"
                  onClick={() => setSecaoAberta(secaoAberta === "idiomas" ? "modulos" : "idiomas")}
                  className="h-auto w-full justify-between rounded-none px-4 py-4 text-left hover:bg-cream/70"
                >
                  <span className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-full bg-lime text-ink ring-1 ring-ink/10">
                      <Languages className="size-5" />
                    </span>
                    <span>
                      <span className="block text-sm font-extrabold">Idiomas</span>
                      <span className="block text-xs font-medium text-ink/55">{IDIOMAS.length} opções para estudar</span>
                    </span>
                  </span>
                  <ChevronDown className={cn("size-5 transition-transform", secaoAberta === "idiomas" && "rotate-180")} />
                </Button>

                {secaoAberta === "idiomas" && (
                  <div className="grid grid-cols-2 gap-2 border-t border-ink/10 p-3">
                    {IDIOMAS.map((i) => {
                      const ativo = i.id === idiomaId;
                      return (
                        <Button
                          key={i.id}
                          variant="ghost"
                          onClick={() => {
                            setIdiomaId(i.id);
                            setMenuAberto(false);
                          }}
                          className={cn(
                            "h-auto justify-start rounded-xl px-3 py-3 text-left ring-1 transition-transform hover:-translate-y-0.5",
                            ativo
                              ? "bg-ink text-cream ring-ink hover:bg-ink/90 hover:text-cream"
                              : "bg-cream text-ink ring-ink/10 hover:bg-cream/80",
                          )}
                        >
                          <span className="text-2xl leading-none">{i.bandeira}</span>
                          <span className="min-w-0">
                            <span className="block truncate text-sm font-extrabold">{i.nome}</span>
                            <span className={cn("block text-xs", ativo ? "text-lime" : "text-ink/50")}>Nível {i.nivel}</span>
                          </span>
                        </Button>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="overflow-hidden rounded-2xl bg-mist ring-1 ring-ink/10">
                <Button
                  variant="ghost"
                  onClick={() => setSecaoAberta(secaoAberta === "modulos" ? "idiomas" : "modulos")}
                  className="h-auto w-full justify-between rounded-none px-4 py-4 text-left hover:bg-cream/70"
                >
                  <span className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-full bg-sun text-cream ring-1 ring-ink/10">
                      <BookOpenCheck className="size-5" />
                    </span>
                    <span>
                      <span className="block text-sm font-extrabold">Módulos</span>
                      <span className="block text-xs font-medium text-ink/55">Aulas organizadas por situação</span>
                    </span>
                  </span>
                  <ChevronDown className={cn("size-5 transition-transform", secaoAberta === "modulos" && "rotate-180")} />
                </Button>

                {secaoAberta === "modulos" && (
                  <div className="space-y-2 border-t border-ink/10 p-3">
                    {LICOES.map((l) => {
                      const selecionada = l.id === licaoId;
                      const concluida = l.estado === "concluida";
                      const atual = l.estado === "atual";
                      const IconeEstado = concluida ? CheckCircle2 : atual ? PlayCircle : Lock;
                      return (
                        <Button
                          key={l.id}
                          variant="ghost"
                          onClick={() => {
                            setLicaoId(l.id);
                            setMenuAberto(false);
                          }}
                          className={cn(
                            "h-auto w-full justify-start rounded-xl px-3 py-3 text-left ring-1 transition-transform hover:-translate-y-0.5",
                            selecionada
                              ? "bg-ink text-cream ring-ink hover:bg-ink/90 hover:text-cream"
                              : "bg-cream text-ink ring-ink/10 hover:bg-cream/80",
                          )}
                        >
                          <span
                            className={cn(
                              "grid size-9 shrink-0 place-items-center rounded-full ring-1",
                              concluida
                                ? "bg-lime text-ink ring-ink/10"
                                : atual
                                  ? "bg-sun text-cream ring-ink/10"
                                  : "bg-mist text-ink/45 ring-ink/10",
                            )}
                          >
                            <IconeEstado className="size-4" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-extrabold">{l.titulo}</span>
                            <span className={cn("block text-xs", selecionada ? "text-cream/65" : "text-ink/50")}>
                              Módulo {l.id}
                            </span>
                          </span>
                          <span className="text-xl leading-none">{l.icone}</span>
                        </Button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>
      )}

      <div className="mx-auto grid max-w-[1280px] gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <main className="min-w-0">
          <section className="overflow-hidden rounded-3xl bg-ink text-cream ring-1 ring-ink/10">
            <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-cream/10 px-3 py-1.5 text-xs font-extrabold uppercase tracking-widest text-lime ring-1 ring-cream/15">
                  <Sparkles className="size-4" /> Aula atual
                </div>
                <h1 className="mt-4 max-w-[12ch] font-display text-4xl font-extrabold leading-none text-balance sm:text-5xl">
                  {idioma.bandeira} {idioma.nome}
                </h1>
                <p className="mt-3 max-w-[48ch] text-sm font-medium leading-6 text-cream/72 sm:text-base">
                  Módulo {licao.id}: {licao.titulo}. A meta continua em 1 ano, com speaking guiado pela IA.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Button
                    onClick={() => {
                      setSecaoAberta("idiomas");
                      setMenuAberto(true);
                    }}
                    className="rounded-full bg-lime px-4 font-extrabold text-ink hover:bg-lime/90"
                  >
                    <Languages className="size-4" /> Trocar idioma
                  </Button>
                  <Button
                    onClick={() => {
                      setSecaoAberta("modulos");
                      setMenuAberto(true);
                    }}
                    className="rounded-full bg-cream/10 px-4 font-extrabold text-cream ring-1 ring-cream/20 hover:bg-cream/15"
                  >
                    <BookOpenCheck className="size-4" /> Escolher módulo
                  </Button>
                </div>
              </div>

              <div className="rounded-2xl bg-cream p-4 text-ink ring-1 ring-cream/20">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-ink/55">Progresso</span>
                  <span className="rounded-full bg-lime px-2 py-1 text-xs font-extrabold ring-1 ring-ink/10">Nível 7</span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-xl bg-mist px-2 py-3">
                    <p className="font-display text-xl font-extrabold">2.480</p>
                    <p className="text-[11px] font-bold text-ink/50">XP</p>
                  </div>
                  <div className="rounded-xl bg-mist px-2 py-3">
                    <p className="font-display text-xl font-extrabold">4/12</p>
                    <p className="text-[11px] font-bold text-ink/50">meses</p>
                  </div>
                  <div className="rounded-xl bg-mist px-2 py-3">
                    <p className="font-display text-xl font-extrabold">3</p>
                    <p className="text-[11px] font-bold text-ink/50">idiomas</p>
                  </div>
                </div>
                <div className="mt-4 h-3 overflow-hidden rounded-full bg-mist ring-1 ring-ink/10">
                  <div className="h-full w-3/4 rounded-full bg-sun" />
                </div>
                <p className="mt-2 text-xs font-semibold text-ink/55">520 XP para o próximo nível</p>
              </div>
            </div>
          </section>

          <section className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-mist p-4 ring-1 ring-ink/10">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-ink/55">
                <GraduationCap className="size-4" /> Foco
              </div>
              <p className="mt-2 text-lg font-extrabold">Speaking diário</p>
            </div>
            <div className="rounded-2xl bg-mist p-4 ring-1 ring-ink/10">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-ink/55">
                <BookOpenCheck className="size-4" /> Módulo
              </div>
              <p className="mt-2 text-lg font-extrabold">{licao.titulo}</p>
            </div>
            <div className="rounded-2xl bg-mist p-4 ring-1 ring-ink/10">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-ink/55">
                <Trophy className="size-4" /> Ranking
              </div>
              <p className="mt-2 text-lg font-extrabold">6º lugar</p>
            </div>
          </section>

          <ProfessorIA idioma={idioma} topico={licao.titulo} />
        </main>

        <aside className="hidden shrink-0 lg:block">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-widest text-ink/60">Ranking semanal</h2>
          <div className="rounded-2xl bg-mist p-4 ring-1 ring-ink/10">
            <div className="flex items-end justify-center gap-3">
              {[RANKING[1]!, RANKING[0]!, RANKING[2]!].map((r) => (
                <div key={r.pos} className="flex flex-col items-center gap-1">
                  <div className="grid size-10 place-items-center rounded-full bg-tang text-lg ring-1 ring-ink/10">
                    {r.medalha}
                  </div>
                  <span className="text-[11px] font-bold">{r.nome}</span>
                  <span className="text-[10px] text-ink/50">{r.xp.toLocaleString("pt-BR")}</span>
                  <div className={`mt-1 w-8 rounded-t-lg bg-tang ring-1 ring-ink/10 ${r.altura}`} />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3 divide-y divide-ink/5 rounded-2xl bg-mist p-2 ring-1 ring-ink/10">
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
