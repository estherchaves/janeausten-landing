/**
 * Sala V · Por detrás da prosa. Six thematic chapters.
 *
 * Each `reference.original` is a short quotation checked against a
 * public-domain text (chapter numbering of the continuous Project Gutenberg
 * editions; see docs/FONTES.md). `translation` is our own editorial
 * translation. `novels` holds ids from data/novels.js, in reading order, and
 * `note` says what the theme looks like in that book.
 *
 * `tone` is an illustration tone from tokens.css, used for the chapter's wash.
 */
export const literaryThemes = [
  {
    id: 'dinheiro',
    numeral: 'I',
    title: 'Dependência económica',
    dek: 'Quem tem rendimento, quem o herda e quem fica de fora.',
    tone: 'var(--c-ochre)',
    body: [
      'Uma mulher da pequena nobreza quase não tinha maneira respeitável de ganhar dinheiro. Vivia do pai, do marido ou da generosidade de um irmão, e as propriedades passavam muitas vezes pela linha masculina.',
      'Austen conta os rendimentos das personagens ao pormenor, em libras por ano. Não é mesquinhez: é o mapa de quem pode escolher e de quem tem de aceitar.',
    ],
    novels: [
      { id: 'sense', note: 'Norland passa para o meio-irmão, e as Dashwood ficam com quinhentas libras por ano.' },
      { id: 'pride', note: 'Longbourn está vinculada a Mr. Collins; cinco filhas não a podem herdar.' },
      { id: 'emma', note: 'Emma pode dar-se ao luxo de não casar. Miss Bates não teve escolha.' },
    ],
    today:
      'Quando se fala de liberdade, convém perguntar primeiro de que vive cada pessoa. A independência financeira continua a decidir quem pode dizer não.',
    reference: {
      original: 'it is poverty only which makes celibacy contemptible to a generous public!',
      translation: 'é só a pobreza que torna o celibato desprezível aos olhos de um público generoso!',
      speaker: 'Emma Woodhouse, a Harriet Smith',
      novel: 'emma',
      chapter: 10,
    },
  },
  {
    id: 'casamento',
    numeral: 'II',
    title: 'Casamento e estatuto',
    dek: 'O amor como desejo e o casamento como contrato.',
    tone: 'var(--c-blush)',
    body: [
      'Casar decidia a casa, o círculo social, o futuro dos filhos e, para muitas mulheres, a única saída possível da casa dos pais. Era um acordo económico antes de ser uma história de amor.',
      'Austen mostra todo o leque: o casamento prudente de Charlotte Lucas, a fuga imprudente de Lydia, e uma heroína que recusa dois pedidos, um deles de um homem com dez mil libras por ano.',
    ],
    novels: [
      { id: 'pride', note: 'Elizabeth recusa Mr. Collins e, da primeira vez, Mr. Darcy.' },
      { id: 'mansfield', note: 'Maria Bertram casa-se com Mr. Rushworth pela fortuna e pela casa de Sotherton.' },
      { id: 'persuasion', note: 'Anne desistiu de Wentworth porque ele ainda não tinha fortuna nem posição.' },
    ],
    today:
      'Escolhemos com mais liberdade, mas a pressão continua lá, sob outros nomes: a idade certa, o par certo, a vida que parece bem vista de fora.',
    reference: {
      original: 'I am not romantic, you know; I never was. I ask only a comfortable home',
      translation: 'Não sou romântica, sabe; nunca fui. Peço apenas um lar confortável',
      speaker: 'Charlotte Lucas, a Elizabeth Bennet',
      novel: 'pride',
      chapter: 22,
    },
  },
  {
    id: 'reputacao',
    numeral: 'III',
    title: 'Reputação',
    dek: 'Um bem frágil, guardado pela família inteira.',
    tone: 'var(--c-slate)',
    body: [
      'O bom nome de uma rapariga não era só dela. Um escândalo atingia as irmãs, afastava pretendentes e podia fechar portas a uma família inteira.',
      'Repare em quem Austen escolhe para dizer a frase mais severa sobre o assunto: Mary Bennet, a irmã que fala por sentenças tiradas dos livros. A regra é real, mas a ironia está na boca que a repete.',
    ],
    novels: [
      { id: 'pride', note: 'A fuga de Lydia com Wickham ameaça o futuro de todas as irmãs.' },
      { id: 'mansfield', note: 'O escândalo de Maria Rushworth é tratado pela sociedade como irreparável.' },
      { id: 'sense', note: 'Marianne é alvo de comentários por mostrar em público o que sente por Willoughby.' },
    ],
    today:
      'Meryton tem hoje milhões de habitantes e um feed. O rumor viaja mais depressa, e continua a pesar de forma desigual sobre quem é julgado.',
    reference: {
      original: 'loss of virtue in a female is irretrievable—that one false step involves her in endless ruin',
      translation: 'a perda da virtude numa mulher é irreparável; um único passo em falso arrasta-a para uma ruína sem fim',
      speaker: 'Mary Bennet, a Elizabeth',
      novel: 'pride',
      chapter: 47,
    },
  },
  {
    id: 'classe',
    numeral: 'IV',
    title: 'Mobilidade de classe',
    dek: 'Terra antiga, dinheiro novo e a Marinha pelo meio.',
    tone: 'var(--c-leaf)',
    body: [
      'A Inglaterra de Austen está a mudar. Fortunas feitas no comércio compram propriedades, e oficiais da Marinha regressam das guerras com prémios de guerra e um estatuto que não herdaram.',
      'Os romances observam essa fronteira com atenção: os Bingley vivem de uma fortuna feita no comércio, os Gardiner moram perto dos armazéns, e Sir Walter Elliot torce o nariz a quem sobe pelo próprio mérito.',
    ],
    novels: [
      { id: 'persuasion', note: 'Os oficiais da Marinha valem mais do que um baronete vaidoso e endividado.' },
      { id: 'emma', note: 'Emma afasta Harriet de Robert Martin, um lavrador respeitável, por julgá-lo abaixo dela.' },
      { id: 'mansfield', note: 'Fanny vem de uma casa pobre de Portsmouth e é lembrada disso a cada passo.' },
    ],
    today:
      'Falamos de mérito, mas o código postal, o sotaque e os contactos continuam a abrir e fechar portas. Austen já sabia ler esses sinais.',
    reference: {
      original: "He is a gentleman; I am a gentleman's daughter; so far we are equal.",
      translation: 'Ele é um cavalheiro; eu sou filha de um cavalheiro; até aqui, somos iguais.',
      speaker: 'Elizabeth Bennet, a Lady Catherine de Bourgh',
      novel: 'pride',
      chapter: 56,
    },
  },
  {
    id: 'inteligencia',
    numeral: 'V',
    title: 'Inteligência e independência feminina',
    dek: 'Pensar pela própria cabeça, num mundo que preferia que não.',
    tone: 'var(--c-porcelain)',
    body: [
      'As heroínas de Austen leem, discutem, enganam-se e corrigem-se. O que as distingue não é a beleza nem os talentos de salão, é o juízo: a capacidade de olhar para os outros e para si mesmas com clareza.',
      'A própria autora publicou em vida sem o seu nome. Razão e Sensibilidade saiu assinado apenas «By a Lady».',
    ],
    novels: [
      { id: 'persuasion', note: 'Anne defende, contra o capitão Harville, a constância das mulheres.' },
      { id: 'pride', note: 'Elizabeth vale pela conversa, pela ironia e pela coragem de discordar.' },
      { id: 'northanger', note: 'Catherine aprende a ler o mundo, e os romances, com o seu próprio juízo.' },
    ],
    today:
      'A pergunta de Anne Elliot continua aberta: quem tem a pena na mão, quem conta a história e quem fica de fora dos livros.',
    reference: {
      original:
        'Men have had every advantage of us in telling their own story. Education has been theirs in so much higher a degree; the pen has been in their hands.',
      translation:
        'Os homens tiveram todas as vantagens sobre nós ao contar a sua própria história. A educação foi deles num grau muito maior; a pena esteve nas suas mãos.',
      speaker: 'Anne Elliot, ao capitão Harville',
      novel: 'persuasion',
      chapter: 23,
    },
  },
  {
    id: 'emocao',
    numeral: 'VI',
    title: 'Emoção e razão',
    dek: 'Mostrar o que se sente ou guardá-lo: quanto custa cada coisa.',
    tone: 'var(--c-mint)',
    body: [
      'No fim do século XVIII, a «sensibilidade» estava na moda: chorar ao ler um poema era sinal de alma delicada. Austen observa essa moda com carinho e com desconfiança.',
      'Nos romances, nem a contenção nem a franqueza saem ilesas. Elinor sofre em silêncio, Marianne adoece de tanto sentir, e a saída está algures entre as duas.',
    ],
    novels: [
      { id: 'sense', note: 'Elinor e Marianne são as duas metades da mesma pergunta.' },
      { id: 'persuasion', note: 'Anne ouviu a razão aos dezanove anos e passou oito a perguntar-se se fez bem.' },
      { id: 'northanger', note: 'Catherine deixa a imaginação gótica tomar conta do que vê.' },
    ],
    today:
      'Entre a partilha total e o silêncio prudente, ainda procuramos a medida certa. Austen não dá a resposta, mas mostra o preço de cada extremo.',
    reference: {
      original:
        'I have erred against every common-place notion of decorum; I have been open and sincere where I ought to have been reserved, spiritless, dull, and deceitful',
      translation:
        'Pequei contra todas as noções correntes de decoro; fui franca e sincera onde devia ter sido reservada, apagada, enfadonha e falsa',
      speaker: 'Marianne Dashwood, com ironia, à irmã',
      novel: 'sense',
      chapter: 10,
    },
  },
]
