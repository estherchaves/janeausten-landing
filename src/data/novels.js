/**
 * The six novels.
 *
 * Array order is the order of the illustrated stack (top to bottom) and of
 * the explorer's previous/next navigation.
 *
 * QUOTATIONS — each `quote.original` was checked against a public-domain
 * text of the novel (chapter numbering of the continuous Project Gutenberg
 * editions). `quote.translation` is our own editorial translation and is
 * labelled as such on the page. Anything we could not verify is written as
 * original editorial copy and never attributed to Austen.
 *
 *   Persuasion, ch. 23 — Wentworth's letter
 *   Northanger Abbey, ch. 14 — Henry Tilney
 *   Emma, ch. 1 — opening sentence (narrator), quoted up to the semicolon
 *   Mansfield Park, ch. 48 — opening sentence (narrator)
 *   Pride and Prejudice, ch. 36 — Elizabeth Bennet
 *   Sense and Sensibility, ch. 19 — Mrs Dashwood to Edward Ferrars
 *
 * `spine` drives the illustrated book spine in BookSpineStack;
 * `plate` picks the ink drawing in NovelPlate; `layout` the composition.
 */
export const novels = [
  {
    id: 'persuasion',
    title: 'Persuasão',
    original: 'Persuasion',
    year: 1817,
    yearNote: 'publicado postumamente, em dezembro de 1817',
    heroine: 'Anne Elliot',
    setting: 'Kellynch Hall, Lyme e Bath',
    mood: 'Memória, tempo, segundas oportunidades',
    themes: ['Memória', 'Segundas oportunidades', 'Constância'],
    description:
      'Aos dezanove anos, Anne Elliot foi persuadida a desistir do homem que amava. Oito anos depois, ele regressa como capitão da Marinha, rico e aparentemente indiferente. É o romance mais outonal de Austen, sobre o tempo, o arrependimento e a coragem de tentar outra vez.',
    quote: {
      original: 'You pierce my soul. I am half agony, half hope.',
      translation: 'Trespassa-me a alma. Sou metade agonia, metade esperança.',
      speaker: 'Capitão Wentworth, na carta a Anne',
      chapter: 23,
    },
    whyItMatters:
      'Fala de quem já perdeu alguma coisa. Numa cultura obcecada com a juventude e com começos, Persuasão defende que o amor maduro, paciente e lúcido também é uma forma de coragem.',
    annotation: 'oito anos e meio de silêncio',
    spine: { pattern: 'band', label: 'caps', width: 84, tilt: -0.6 },
    plate: 'waves',
    layout: 'airy',
  },
  {
    id: 'northanger',
    title: 'A Abadia de Northanger',
    original: 'Northanger Abbey',
    year: 1817,
    yearNote: 'publicado postumamente, em dezembro de 1817',
    heroine: 'Catherine Morland',
    setting: 'Bath e a abadia dos Tilney',
    mood: 'Sombra, gótico, imaginação',
    themes: ['Imaginação', 'Ficção gótica', 'Amadurecimento'],
    description:
      'Catherine Morland tem dezassete anos e leu romances góticos a mais. Convidada para uma abadia verdadeira, procura segredos em cada arca e em cada manuscrito. Austen ri-se do género, nunca da leitora, e mostra que o verdadeiro perigo não estava nos corredores escuros.',
    quote: {
      original: 'The person, be it gentleman or lady, who has not pleasure in a good novel, must be intolerably stupid.',
      translation: 'A pessoa, seja cavalheiro ou dama, que não sente prazer num bom romance há de ser intoleravelmente estúpida.',
      speaker: 'Henry Tilney',
      chapter: 14,
    },
    whyItMatters:
      'É uma defesa apaixonada do romance como forma literária e uma pequena lição de literacia: ler bem é aprender a distinguir as histórias que contamos a nós próprios do mundo como ele é.',
    annotation: 'nenhum fantasma, só um general',
    spine: { pattern: 'swirl', label: 'display', width: 90, tilt: 0.4 },
    plate: 'gothic',
    layout: 'gothic',
  },
  {
    id: 'emma',
    title: 'Emma',
    original: 'Emma',
    year: 1815,
    yearNote: 'publicado em dezembro de 1815',
    heroine: 'Emma Woodhouse',
    setting: 'Highbury, no Surrey',
    mood: 'Luz, ironia, autoengano',
    themes: ['Influência social', 'Autoengano', 'Comunidade'],
    description:
      'Emma Woodhouse tem quase vinte e um anos, dinheiro, inteligência e tempo livre, e decide dedicá-los a organizar a vida amorosa dos vizinhos. Engana-se em quase todos os casos, com uma confiança que o leitor acompanha entre o riso e o desconforto.',
    quote: {
      original:
        'Emma Woodhouse, handsome, clever, and rich, with a comfortable home and happy disposition, seemed to unite some of the best blessings of existence',
      translation:
        'Emma Woodhouse, bela, inteligente e rica, com uma casa confortável e um temperamento feliz, parecia reunir algumas das melhores bênçãos da existência',
      speaker: 'A narradora, na primeira frase do romance',
      chapter: 1,
    },
    whyItMatters:
      'Emma é a padroeira de quem tem sempre a certeza. O romance mostra como a inteligência sem atenção aos outros se transforma em vaidade, e como crescer começa por aprender a ouvir.',
    annotation: 'repare no «parecia»',
    spine: { pattern: 'trellis', label: 'panel', width: 80, tilt: -0.3 },
    plate: 'matchmaking',
    layout: 'bright',
  },
  {
    id: 'mansfield',
    title: 'Mansfield Park',
    original: 'Mansfield Park',
    year: 1814,
    yearNote: 'publicado em maio de 1814',
    heroine: 'Fanny Price',
    setting: 'Mansfield Park, no Northamptonshire',
    mood: 'Contenção, moralidade, pertença',
    themes: ['Moralidade', 'Posição social', 'Pertença'],
    description:
      'Fanny Price chega a Mansfield Park aos dez anos, como parente pobre. Cresce à margem, a observar uma família rica que confunde boas maneiras com bons princípios. É o romance mais severo de Austen, e talvez o mais inquietante.',
    quote: {
      original: 'Let other pens dwell on guilt and misery.',
      translation: 'Que outras penas se demorem na culpa e na desgraça.',
      speaker: 'A narradora, a abrir o último capítulo',
      chapter: 48,
    },
    whyItMatters:
      'Quem pertence a uma casa que não é sua? O romance pergunta-o através de Fanny e de uma fortuna que depende de plantações em Antígua, um silêncio que a crítica de hoje não deixa passar.',
    annotation: 'quem fala pouco vê mais',
    spine: { pattern: 'stripe', label: 'italic', width: 94, tilt: 0.5 },
    plate: 'house',
    layout: 'contained',
  },
  {
    id: 'pride',
    title: 'Orgulho e Preconceito',
    original: 'Pride and Prejudice',
    year: 1813,
    yearNote: 'publicado em janeiro de 1813',
    heroine: 'Elizabeth Bennet',
    setting: 'Longbourn, no Hertfordshire',
    mood: 'Orgulho, primeiras impressões',
    themes: ['Orgulho', 'Primeiras impressões', 'Autoconhecimento'],
    description:
      'Cinco irmãs, uma propriedade destinada a um primo e um homem que entra num baile convencido de que nenhuma mulher da sala merece a sua atenção. Elizabeth Bennet e Mr. Darcy enganam-se um sobre o outro com uma convicção quase perfeita. O romance é a história, lenta e divertida, do desmentido.',
    quote: {
      original: 'Till this moment I never knew myself.',
      translation: 'Até este momento, nunca me tinha conhecido.',
      speaker: 'Elizabeth Bennet, depois de ler a carta de Darcy',
      chapter: 36,
    },
    whyItMatters:
      'Num tempo de opiniões instantâneas, é um manual sobre o perigo de julgar depressa. Elizabeth não é recompensada por ter razão, mas por ser capaz de admitir que não a tinha.',
    annotation: 'tudo começa com uma carta',
    spine: { pattern: 'gilt', label: 'script', width: 88, tilt: -0.4 },
    plate: 'letter',
    layout: 'dramatic',
  },
  {
    id: 'sense',
    title: 'Razão e Sensibilidade',
    original: 'Sense and Sensibility',
    year: 1811,
    yearNote: 'publicado em outubro de 1811',
    heroine: 'Elinor e Marianne Dashwood',
    setting: 'Norland e Barton Cottage, no Devonshire',
    mood: 'Contenção, delicadeza, razão',
    themes: ['Contenção', 'Razão e emoção', 'Dependência económica'],
    description:
      'Quando o pai morre, as irmãs Dashwood perdem a casa e quase todo o rendimento. Elinor guarda o que sente, Marianne mostra tudo. O romance põe à prova as duas maneiras de amar e não deixa nenhuma sair ilesa.',
    quote: {
      original: 'Know your own happiness. You want nothing but patience—or give it a more fascinating name, call it hope.',
      translation:
        'Conheça a sua própria felicidade. Só lhe falta paciência; ou, para lhe dar um nome mais sedutor, chame-lhe esperança.',
      speaker: 'Mrs. Dashwood, a Edward Ferrars',
      chapter: 19,
    },
    whyItMatters:
      'Austen recusa escolher entre o coração e a cabeça. Pergunta antes quanto custa, sobretudo a uma mulher sem fortuna, mostrar ou esconder aquilo que se sente.',
    annotation: 'duas irmãs, dois temperamentos',
    spine: { pattern: 'chintz', label: 'caps', width: 96, tilt: 0.2 },
    plate: 'sisters',
    layout: 'delicate',
  },
]

export const novelById = Object.fromEntries(novels.map((n) => [n.id, n]))
