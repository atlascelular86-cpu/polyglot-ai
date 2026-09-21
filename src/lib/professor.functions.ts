import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const Entrada = z.object({
  idioma: z.string().min(1),
  topico: z.string().min(1),
  fala: z.string().min(1).max(1000),
  historico: z
    .array(z.object({ papel: z.enum(["aluno", "professor"]), texto: z.string() }))
    .max(20)
    .default([]),
});

export type RespostaProfessor = {
  resposta: string;
  traducao: string;
  correcao: string;
  fraseCorrigida: string;
  nota: number;
  dica: string;
};

export const conversarComProfessor = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => Entrada.parse(input))
  .handler(async ({ data }): Promise<RespostaProfessor> => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) throw new Error("Chave de IA ausente");

    const sistema = [
      `Você é um professor particular de ${data.idioma} para alunos brasileiros, praticando o tema "${data.topico}".`,
      `Sua missão é corrigir cada fala do aluno e ensiná-lo a falar corretamente, como um professor paciente e motivador.`,
      `Responda SEMPRE em JSON válido, sem markdown, com as chaves:`,
      `"correcao" (em português: aponte exatamente o que o aluno errou de gramática, vocabulário ou pronúncia e explique POR QUE está errado, em 1-2 frases didáticas; se estiver perfeito, elogie em 1 frase),`,
      `"fraseCorrigida" (a fala do aluno reescrita corretamente em ${data.idioma}, do jeito que um nativo falaria; se a fala já estava perfeita, repita-a),`,
      `"dica" (uma dica curta e prática em português para o aluno acertar da próxima vez — pronúncia, regra ou macete),`,
      `"resposta" (1-2 frases em ${data.idioma}, continuando a conversa e fazendo uma pergunta para o aluno praticar),`,
      `"traducao" (a resposta traduzida para português do Brasil),`,
      `"nota" (número de 0 a 100 avaliando a fala do aluno).`,
      `Use vocabulário simples e adequado a iniciantes. Máximo 80 palavras no total.`,
    ].join(" ");

    const mensagens = [
      { role: "system", content: sistema },
      ...data.historico.map((m) => ({
        role: m.papel === "aluno" ? "user" : "assistant",
        content: m.texto,
      })),
      { role: "user", content: data.fala },
    ];

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-6-astra",
        reasoning_effort: "low",
        max_completion_tokens: 2000,
        messages: mensagens,
        response_format: { type: "json_object" },
      }),
    });

    if (!res.ok) {
      const detalhe = await res.text().catch(() => "");
      if (res.status === 429) throw new Error("Muitas conversas ao mesmo tempo. Tente de novo em instantes.");
      if (res.status === 402) throw new Error("Os créditos de IA acabaram. Adicione créditos para continuar praticando.");
      throw new Error(`O professor de IA não respondeu (${res.status}). ${detalhe.slice(0, 200)}`);
    }

    const json = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const bruto = json.choices?.[0]?.message?.content ?? "";

    try {
      const parsed = JSON.parse(bruto) as Partial<RespostaProfessor>;
      return {
        resposta: parsed.resposta ?? "",
        traducao: parsed.traducao ?? "",
        correcao: parsed.correcao ?? "",
        fraseCorrigida: parsed.fraseCorrigida ?? "",
        nota: typeof parsed.nota === "number" ? Math.max(0, Math.min(100, parsed.nota)) : 80,
        dica: parsed.dica ?? "",
      };
    } catch {
      return { resposta: bruto, traducao: "", correcao: "", fraseCorrigida: "", nota: 80, dica: "" };
    }
  });
