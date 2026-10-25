/**
 * Six questions, four answers each. Every answer awards
 *   +3 to its primary heroine and +1 to a secondary heroine.
 *
 * The matrix is balanced: across the quiz each heroine is the primary of
 * exactly four answers and the secondary of exactly four answers, so no
 * result is structurally favoured. The balance is enforced by
 * utils/quizScoring.test.js.
 */
export const PRIMARY_POINTS = 3
export const SECONDARY_POINTS = 1

export const quizQuestions = [
  {
    id: 'baile',
    scene: 'Um baile em Meryton',
    prompt: 'Alguém comenta, em voz alta, que não és interessante o suficiente para uma dança. O que fazes?',
    answers: [
      { id: 'a', text: 'Respondes com uma ironia que circula pela sala o resto da noite.', primary: 'elizabeth', secondary: 'emma' },
      { id: 'b', text: 'Finges que não ouviste e guardas a informação para mais tarde.', primary: 'elinor', secondary: 'anne' },
      { id: 'c', text: 'Sais do salão. Não danças com quem não te respeita.', primary: 'marianne', secondary: 'elizabeth' },
      { id: 'd', text: 'Imaginas em pormenor as razões secretas que o levaram a dizê-lo.', primary: 'catherine', secondary: 'marianne' },
    ],
  },
  {
    id: 'carta',
    scene: 'Uma carta inesperada',
    prompt: 'Recebes uma carta de alguém que julgaste mal. Como reages?',
    answers: [
      { id: 'a', text: 'Lês, decides que já sabes o que quer dizer e respondes antes do jantar.', primary: 'emma', secondary: 'catherine' },
      { id: 'b', text: 'Lês duas vezes, guardas-a e pensas nela durante dias sem dizer nada.', primary: 'anne', secondary: 'elinor' },
      { id: 'c', text: 'Lês com desconfiança, relês com honestidade e admites que te enganaste.', primary: 'elizabeth', secondary: 'emma' },
      { id: 'd', text: 'Respondes de imediato, com o coração inteiro na página.', primary: 'marianne', secondary: 'catherine' },
    ],
  },
  {
    id: 'conselho',
    scene: 'Um pedido de conselho',
    prompt: 'Uma amiga quer saber o que pensas de um pretendente. O que lhe dizes?',
    answers: [
      { id: 'a', text: 'Ouves com atenção, fazes perguntas práticas e só depois dás a tua opinião.', primary: 'elinor', secondary: 'anne' },
      { id: 'b', text: 'Queres saber tudo: onde se conheceram, o que ele disse, se há mistério na família.', primary: 'catherine', secondary: 'marianne' },
      { id: 'c', text: 'Já tens um candidato melhor em mente e um plano para os apresentar.', primary: 'emma', secondary: 'elizabeth' },
      { id: 'd', text: 'Pedes-lhe que pense no que sentirá daqui a oito anos, e não amanhã.', primary: 'anne', secondary: 'elinor' },
    ],
  },
  {
    id: 'decisao',
    scene: 'Uma decisão difícil',
    prompt: 'Uma escolha importante depende de ti e a família discorda. Como decides?',
    answers: [
      { id: 'a', text: 'Recusas com firmeza. Não aceitas uma vida sem respeito, nem com uma propriedade inteira.', primary: 'elizabeth', secondary: 'marianne' },
      { id: 'b', text: 'Segues o coração. Uma vida sem paixão não vale a pena ser vivida.', primary: 'marianne', secondary: 'catherine' },
      { id: 'c', text: 'Ouves os conselhos, pesas tudo e um dia percebes que devias ter-te ouvido a ti.', primary: 'anne', secondary: 'elinor' },
      { id: 'd', text: 'Pedes a opinião de quem admiras e aprendes, às vezes da maneira mais difícil.', primary: 'catherine', secondary: 'elinor' },
    ],
  },
  {
    id: 'bath',
    scene: 'Um dia livre em Bath',
    prompt: 'Tens uma tarde inteira só para ti. Como a passas?',
    answers: [
      { id: 'a', text: 'A pôr as contas da casa em dia e a escrever as cartas que ninguém escreveria por ti.', primary: 'elinor', secondary: 'anne' },
      { id: 'b', text: 'Na Pump Room, a observar quem fala com quem e a tirar conclusões.', primary: 'emma', secondary: 'elizabeth' },
      { id: 'c', text: 'Num passeio longo e solitário, a pensar em quem já não está.', primary: 'anne', secondary: 'marianne' },
      { id: 'd', text: 'Com um romance gótico emprestado, a ler até as velas se apagarem.', primary: 'catherine', secondary: 'emma' },
    ],
  },
  {
    id: 'valor',
    scene: 'O que realmente importa',
    prompt: 'O que mais valorizas numa pessoa?',
    answers: [
      { id: 'a', text: 'Inteligência e a capacidade de se rir de si própria.', primary: 'elizabeth', secondary: 'emma' },
      { id: 'b', text: 'Integridade, sobretudo quando ninguém está a ver.', primary: 'elinor', secondary: 'anne' },
      { id: 'c', text: 'Sensibilidade: que se comova com música, poesia e paisagens.', primary: 'marianne', secondary: 'catherine' },
      { id: 'd', text: 'Confiança e boa conversa. Há poucas coisas piores do que um serão aborrecido.', primary: 'emma', secondary: 'elizabeth' },
    ],
  },
]
