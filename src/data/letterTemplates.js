/**
 * Building blocks of the Letter Studio. All phrasing is original pastiche,
 * written for this project; nothing is taken from the novels' adaptations.
 *
 * {r} is replaced by the recipient's name and {g} by the grammatical
 * ending chosen for them ('a' or 'o'), so salutations agree in gender
 * without slashes. Sentences about the writer are phrased neutrally.
 */
export const tones = [
  { id: 'afetuoso', label: 'Afetuoso', hint: 'calor, sem exageros' },
  { id: 'reservado', label: 'Reservado', hint: 'cortês e contido' },
  { id: 'ironico', label: 'Irónico', hint: 'com um sorriso de lado' },
  { id: 'formal', label: 'Formal', hint: 'como manda a etiqueta' },
]

export const addressForms = [
  { id: 'o', label: 'Senhor' },
  { id: 'a', label: 'Senhora' },
]

export const occasions = [
  { id: 'contacto', label: 'Primeiro contacto' },
  { id: 'convite', label: 'Convite' },
  { id: 'desculpas', label: 'Pedido de desculpas' },
  { id: 'declaracao', label: 'Declaração' },
]

export const salutations = {
  afetuoso: 'Querid{g} {r},',
  reservado: 'Car{g} {r},',
  ironico: 'Estimadíssim{g} {r},',
  formal: 'Ex.m{g} {r},',
}

export const openings = {
  contacto: {
    afetuoso: 'Perdoe a ousadia de lhe escrever sem que nos tenham apresentado como manda o costume, mas há conversas que não podem esperar pelo próximo baile.',
    reservado: 'Escrevo-lhe com a devida reserva, consciente de que o nosso conhecimento é ainda recente e de que uma carta é sempre um pequeno atrevimento.',
    ironico: 'Sei que uma pessoa sensata esperaria por uma apresentação formal, e sei também que a sensatez nunca me trouxe cartas interessantes.',
    formal: 'Tomo a liberdade de me dirigir a si por escrito, na esperança de que esta iniciativa não seja tomada por falta de cerimónia.',
  },
  convite: {
    afetuoso: 'Nada me daria maior prazer do que a sua companhia na próxima reunião, e escrevo para lho pedir antes que outra pessoa se adiante.',
    reservado: 'Teríamos muito gosto em contar com a sua presença, caso os seus compromissos o permitam e o tempo se mostre favorável.',
    ironico: 'Convido-{g} para um serão onde se falará do tempo, das estradas e dos rendimentos alheios, e onde a sua presença será a única novidade.',
    formal: 'Tenho a honra de {g} convidar a comparecer na reunião que se realizará em breve, em data a confirmar por mensageiro.',
  },
  desculpas: {
    afetuoso: 'Não consegui dormir a pensar nas palavras que lhe disse, e escrevo antes que o orgulho me convença a não o fazer.',
    reservado: 'Reconheço que o meu comportamento na última ocasião não foi o que devia ter sido, e venho apresentar-lhe as minhas desculpas.',
    ironico: 'Dizem-me que cometi uma injustiça consigo. Depois de muito resistir, cheguei à desagradável conclusão de que dizem bem.',
    formal: 'Venho, por este meio, apresentar as minhas mais sinceras desculpas por qualquer ofensa que as minhas palavras possam ter causado.',
  },
  declaracao: {
    afetuoso: 'Já não consigo fingir que as nossas conversas me são indiferentes, nem quero continuar a tentar.',
    reservado: 'Hesitei muito antes de escrever estas linhas, mas o silêncio começa a parecer-me menos honesto do que a franqueza.',
    ironico: 'Contra todas as minhas resoluções, contra o bom senso e contra a opinião de três tias, venho dizer-lhe que me importo consigo.',
    formal: 'Permita-me que lhe exprima, com toda a seriedade, a profunda estima e a afeição que há algum tempo lhe dedico.',
  },
}

export const closings = {
  afetuoso: 'Com todo o afeto,',
  reservado: 'Com os melhores cumprimentos,',
  ironico: 'Ao seu dispor, apesar de tudo,',
  formal: 'Subscrevo-me, com a mais elevada consideração,',
}

export const letterDefaults = {
  recipient: 'Mr. Darcy',
  address: 'o',
  tone: 'ironico',
  occasion: 'desculpas',
  message: 'Admito que julguei depressa demais. Se a sua opinião sobre mim mudou tanto quanto a minha sobre si, talvez possamos recomeçar este conhecimento.',
  signature: 'E. B.',
  place: 'Longbourn',
}

export const MESSAGE_LIMIT = 320
