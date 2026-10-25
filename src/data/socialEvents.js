/**
 * A fictional social season. Events, dates, hosts and guests are invented
 * for this exhibition and are labelled "Ficção" on the page.
 * The `history` notes are factual and labelled "Facto histórico"; each one
 * is grounded in Regency custom and, where noted, in Austen's own novels.
 */
export const seasonYear = 1813

export const socialEvents = [
  {
    id: 'salao',
    title: 'Uma noite nos salões de baile',
    day: 14,
    month: 'janeiro',
    weekday: 'Quinta-feira',
    place: 'Upper Rooms, Bath',
    vignette: 'chandelier',
    summary: 'Duzentas velas, uma orquestra pequena e mais pares do que espaço na pista.',
    fiction:
      'Lady Harriet Ashby traz duas sobrinhas recém-chegadas do campo e uma lista de pretendentes que já ninguém leva a sério. À meia-noite serve-se chá na sala contígua e, entre duas contradanças, decide-se meia temporada.',
    dress: 'Vestido de cintura subida em seda clara, luvas compridas, sapatilhas rasas de baile e um leque.',
    history: {
      title: 'O mestre de cerimónias',
      text: 'Os salões públicos de Bath tinham um mestre de cerimónias que apresentava os pares. Em A Abadia de Northanger, é ele quem apresenta Henry Tilney a Catherine Morland.',
    },
  },
  {
    id: 'propriedade',
    title: 'Uma visita a uma propriedade rural',
    day: 9,
    month: 'abril',
    weekday: 'Sexta-feira',
    place: 'Ellerby Park, Derbyshire',
    vignette: 'house',
    summary: 'Galerias de retratos, um lago artificial e a hipótese de o dono estar fora.',
    fiction:
      'Os Hartwell partem cedo de carruagem para ver os jardins de Ellerby, famosos em três condados. A governanta mostra as salas, elogia o patrão mais do que seria prudente e garante que ele só regressa amanhã.',
    dress: 'Peliça de lã sobre vestido de musselina, chapéu de aba larga atado sob o queixo e botins para a gravilha.',
    history: {
      title: 'Visitar casas alheias',
      text: 'Visitar grandes casas de campo na ausência dos donos era um passatempo comum: bastava pedir à governanta, que mostrava as salas. É assim que Elizabeth Bennet visita Pemberley em Orgulho e Preconceito.',
    },
  },
  {
    id: 'jantar',
    title: 'Um jantar formal',
    day: 22,
    month: 'maio',
    weekday: 'Sábado',
    place: 'Grosvenor Street, Londres',
    vignette: 'table',
    summary: 'Três serviços, dezoito convidados e uma ordem de entrada que ninguém esquece.',
    fiction:
      'Mrs. Pembury reúne dezoito convidados e passa a tarde a rever a ordem dos lugares. A conversa é sobre política e caça até à sobremesa, quando as senhoras se retiram e a verdadeira conversa começa na sala de visitas.',
    dress: 'Vestido de noite de manga curta, cabelo apanhado com uma fita ou pente, e xaile para os corredores frios.',
    history: {
      title: 'A ordem de precedência',
      text: 'Os convidados entravam na sala de jantar por ordem de precedência social, a começar pela senhora de mais alta posição. Em Persuasão, Mary Musgrove ressente-se sempre que lhe tiram o lugar a que julga ter direito.',
    },
  },
  {
    id: 'jardim',
    title: 'Um passeio pelo jardim',
    day: 3,
    month: 'julho',
    weekday: 'Sábado',
    place: 'Os arbustos de Hollins Lodge, Hampshire',
    vignette: 'garden',
    summary: 'Um caminho de gravilha, uma sebe alta e uma conversa que não pode ser ouvida da casa.',
    fiction:
      'Depois do almoço, os mais novos saem para os arbustos. Miss Fairley e o capitão Lowe atrasam-se de propósito e, quando o grupo volta a reunir-se junto ao relógio de sol, ninguém pergunta porquê.',
    dress: 'Vestido de musselina estampada, spencer curto, sombrinha e um chapéu de palha com fita.',
    history: {
      title: 'Declarações a caminhar',
      text: 'Um passeio era uma das raras ocasiões em que um casal podia conversar sem ser ouvido. Em Austen, várias declarações decisivas acontecem a caminhar, como a de Mr. Knightley a Emma, no jardim de Hartfield.',
    },
  },
  {
    id: 'verao',
    title: 'Um baile de verão',
    day: 19,
    month: 'agosto',
    weekday: 'Quinta-feira',
    place: 'Assembly Rooms, Meryton',
    vignette: 'fan',
    summary: 'Janelas abertas, limonada e a última contradança antes de as famílias partirem.',
    fiction:
      'O regimento parte na semana seguinte e toda a cidade quer despedir-se dele a dançar. Há três irmãs com o mesmo vestido de musselina, duas mães em competição e um oficial que promete escrever a todas.',
    dress: 'Musselina branca de cintura subida, braços nus ou luvas curtas, e flores frescas no cabelo.',
    history: {
      title: 'A moda da musselina',
      text: 'A musselina fina, muitas vezes importada da Índia, era o tecido da moda e um sinal de elegância. Em A Abadia de Northanger, Henry Tilney surpreende Mrs. Allen ao mostrar que sabe o preço da musselina.',
    },
  },
]
