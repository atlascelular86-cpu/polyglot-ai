import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState } from "react";

import { conversarComProfessor, type RespostaProfessor } from "@/lib/professor.functions";
import type { Language } from "@/data/languages";

type Turno = { papel: "aluno" | "professor"; texto: string };

type Reconhecimento = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
};

function criarReconhecimento(): Reconhecimento | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: new () => Reconhecimento;
    webkitSpeechRecognition?: new () => Reconhecimento;
  };
  const Ctor = w.SpeechRecognition ?? w.webkitSpeechRecognition;
  return Ctor ? new Ctor() : null;
}

const ONDAS = ["h-6", "h-10", "h-4", "h-12", "h-7", "h-11", "h-5", "h-9"];
const ATRASOS = ["0s", ".1s", ".2s", ".15s", ".3s", ".05s", ".25s", ".12s"];

export function ProfessorIA({ idioma, topico }: { idioma: Language; topico: string }) {
  const conversar = useServerFn(conversarComProfessor);
  const [historico, setHistorico] = useState<Turno[]>([]);
  const [feedback, setFeedback] = useState<RespostaProfessor | null>(null);
  const [texto, setTexto] = useState("");
  const [ouvindo, setOuvindo] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [temVoz, setTemVoz] = useState(false);
  const recRef = useRef<Reconhecimento | null>(null);

  useEffect(() => {
    setTemVoz(criarReconhecimento() !== null);
  }, []);

  useEffect(() => {
    setHistorico([]);
    setFeedback(null);
    setTexto("");
  }, [idioma.id, topico]);

  function falarEmVozAlta(frase: string) {
    if (typeof window === "undefined" || !("speechSynthesis" in window) || !frase) return;
    const fala = new SpeechSynthesisUtterance(frase);
    fala.lang = idioma.codigo;
    fala.rate = 0.9;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(fala);
  }

  async function enviar(fala: string) {
    const limpo = fala.trim();
    if (!limpo || carregando) return;
    setCarregando(true);
    setErro(null);
    const anterior = historico;
    setHistorico([...anterior, { papel: "aluno", texto: limpo }]);
    setTexto("");
    try {
      const r = await conversar({
        data: { idioma: idioma.nome, topico, fala: limpo, historico: anterior },
      });
      setFeedback(r);
      setHistorico((h) => [...h, { papel: "professor", texto: r.resposta }]);
      falarEmVozAlta(r.resposta);
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Algo deu errado. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  }

  function alternarMicrofone() {
    if (ouvindo) {
      recRef.current?.stop();
      return;
    }
    const rec = criarReconhecimento();
    if (!rec) {
      setErro("Seu navegador não suporta o microfone. Escreva a resposta abaixo.");
      return;
    }
    rec.lang = idioma.codigo;
    rec.continuous = false;
    rec.interimResults = false;
    rec.onresult = (e) => {
      const transcricao = e.results[0]?.[0]?.transcript ?? "";
      if (transcricao) void enviar(transcricao);
    };
    rec.onerror = () => {
      setErro("Não consegui ouvir. Verifique a permissão do microfone.");
      setOuvindo(false);
    };
    rec.onend = () => setOuvindo(false);
    recRef.current = rec;
    setErro(null);
    setOuvindo(true);
    rec.start();
  }

  return (
    <section className="mt-8 rounded-2xl bg-berry p-5 text-cream ring-1 ring-ink">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cream/80">
        <span>🤖</span>Professor de IA
      </div>
      <h2 className="mt-1 text-2xl font-extrabold text-balance">Converse em voz alta</h2>
      <p className="mt-1 max-w-[46ch] text-sm text-pretty text-cream/80">
        Tema de hoje: {topico} em {idioma.nome}. A IA corrige pronúncia e gramática em tempo real.
      </p>

      <div className="mt-4 flex h-16 items-center gap-1 rounded-xl bg-cream/10 px-4 ring-1 ring-cream/20">
        {ONDAS.map((altura, i) => (
          <div
            key={i}
            className={`w-1.5 rounded-full bg-lime ${altura} ${ouvindo || carregando ? "pulse-bar" : ""}`}
            style={{ animationDelay: ATRASOS[i] }}
          />
        ))}
        <span className="ml-auto text-xs text-cream/70">
          {ouvindo ? "ouvindo…" : carregando ? "pensando…" : "pronto"}
        </span>
      </div>

      {historico.length > 0 && (
        <div className="mt-4 space-y-2">
          {historico.slice(-4).map((t, i) => (
            <div
              key={i}
              className={
                t.papel === "aluno"
                  ? "ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-cream/15 px-4 py-2 text-sm ring-1 ring-cream/20"
                  : "max-w-[85%] rounded-2xl rounded-tl-sm bg-cream px-4 py-2 text-sm text-ink ring-1 ring-ink"
              }
            >
              {t.texto}
            </div>
          ))}
        </div>
      )}

      {feedback && (
        <div className="mt-4 rounded-2xl bg-cream p-4 text-ink ring-1 ring-ink">
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-ink/60">Sua nota</span>
            <span className="text-2xl font-extrabold">{feedback.nota}%</span>
          </div>
          <div className="mt-2 h-3 overflow-hidden rounded-full bg-mist ring-1 ring-ink">
            <div className="h-full rounded-full bg-sun" style={{ width: `${feedback.nota}%` }} />
          </div>
          {feedback.traducao && (
            <p className="mt-3 text-sm">
              <span className="font-bold">Tradução: </span>
              {feedback.traducao}
            </p>
          )}
          {feedback.correcao && (
            <p className="mt-1 text-sm">
              <span className="font-bold">Correção: </span>
              {feedback.correcao}
            </p>
          )}
          {feedback.dica && (
            <p className="mt-1 text-sm text-ink/70">
              <span className="font-bold">Dica: </span>
              {feedback.dica}
            </p>
          )}
          <button
            onClick={() => falarEmVozAlta(feedback.resposta)}
            className="mt-3 inline-flex items-center gap-2 rounded-full bg-mist px-4 py-2 text-xs font-bold ring-1 ring-ink"
          >
            🔊 Ouvir de novo
          </button>
        </div>
      )}

      {erro && (
        <p className="mt-3 rounded-xl bg-sun px-4 py-2 text-sm font-semibold text-cream ring-1 ring-ink">{erro}</p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          onClick={alternarMicrofone}
          disabled={carregando}
          className="inline-flex items-center gap-2 rounded-full bg-sun px-5 py-2.5 text-sm font-bold text-cream ring-1 ring-ink disabled:opacity-60"
        >
          <span>🎙️</span>
          {ouvindo ? "Parar" : "Falar agora"}
        </button>
        <form
          className="flex min-w-[240px] flex-1 items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            void enviar(texto);
          }}
        >
          <input
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder={temVoz ? "ou escreva aqui…" : "escreva sua resposta aqui…"}
            className="min-w-0 flex-1 rounded-full bg-cream px-4 py-2.5 text-sm text-ink ring-1 ring-ink outline-none placeholder:text-ink/40"
          />
          <button
            type="submit"
            disabled={carregando || !texto.trim()}
            className="rounded-full bg-lime px-4 py-2.5 text-sm font-bold text-ink ring-1 ring-ink disabled:opacity-50"
          >
            Enviar
          </button>
        </form>
      </div>
    </section>
  );
}
