export type Language = {
  id: string;
  nome: string;
  bandeira: string;
  codigo: string;
  nivel: number;
};

export const IDIOMAS: Language[] = [
  { id: "en", nome: "Inglês", bandeira: "🇺🇸", codigo: "en-US", nivel: 4 },
  { id: "es", nome: "Espanhol", bandeira: "🇪🇸", codigo: "es-ES", nivel: 2 },
  { id: "fr", nome: "Francês", bandeira: "🇫🇷", codigo: "fr-FR", nivel: 1 },
  { id: "it", nome: "Italiano", bandeira: "🇮🇹", codigo: "it-IT", nivel: 1 },
  { id: "de", nome: "Alemão", bandeira: "🇩🇪", codigo: "de-DE", nivel: 1 },
  { id: "ja", nome: "Japonês", bandeira: "🇯🇵", codigo: "ja-JP", nivel: 1 },
  { id: "ko", nome: "Coreano", bandeira: "🇰🇷", codigo: "ko-KR", nivel: 1 },
  { id: "zh", nome: "Mandarim", bandeira: "🇨🇳", codigo: "zh-CN", nivel: 1 },
  { id: "pt", nome: "Português", bandeira: "🇧🇷", codigo: "pt-BR", nivel: 3 },
  { id: "ru", nome: "Russo", bandeira: "🇷🇺", codigo: "ru-RU", nivel: 1 },
  { id: "ar", nome: "Árabe", bandeira: "🇸🇦", codigo: "ar-SA", nivel: 1 },
  { id: "tr", nome: "Turco", bandeira: "🇹🇷", codigo: "tr-TR", nivel: 1 },
];

export type Licao = {
  id: number;
  titulo: string;
  icone: string;
  estado: "concluida" | "atual" | "bloqueada";
};

export const LICOES: Licao[] = [
  { id: 1, titulo: "Cumprimentos", icone: "🏆", estado: "concluida" },
  { id: 2, titulo: "Apresentações", icone: "📖", estado: "concluida" },
  { id: 3, titulo: "No aeroporto", icone: "🗣️", estado: "concluida" },
  { id: 4, titulo: "Pedindo comida", icone: "▶", estado: "atual" },
  { id: 5, titulo: "Reservar hotel", icone: "🔒", estado: "bloqueada" },
  { id: 6, titulo: "Pedir informação", icone: "🔒", estado: "bloqueada" },
  { id: 7, titulo: "Compras", icone: "🔒", estado: "bloqueada" },
  { id: 8, titulo: "Transporte", icone: "🔒", estado: "bloqueada" },
  { id: 9, titulo: "Trabalho", icone: "🔒", estado: "bloqueada" },
  { id: 10, titulo: "Saúde", icone: "🔒", estado: "bloqueada" },
  { id: 11, titulo: "Cultura local", icone: "🔒", estado: "bloqueada" },
];

export const RANKING = [
  { pos: 1, nome: "Ana P.", xp: 2480, medalha: "🥇", altura: "h-14" },
  { pos: 2, nome: "Marina", xp: 2110, medalha: "🥈", altura: "h-10" },
  { pos: 3, nome: "Rafa", xp: 1980, medalha: "🥉", altura: "h-8" },
];

export const RANKING_LISTA = [
  { pos: 4, nome: "Juliana", xp: 1840, voce: false },
  { pos: 5, nome: "Diego", xp: 1720, voce: false },
  { pos: 6, nome: "Você", xp: 1690, voce: true },
  { pos: 7, nome: "Beatriz", xp: 1560, voce: false },
  { pos: 8, nome: "Lucas", xp: 1490, voce: false },
];
