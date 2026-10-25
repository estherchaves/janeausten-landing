/**
 * The six possible results of the heroine quiz.
 * `order` is the documented final tie-break (see utils/quizScoring.js).
 * Context lines are factual and refer to the novels' text.
 */
export const heroines = [
  {
    id: 'elizabeth',
    name: 'Elizabeth Bennet',
    initial: 'E',
    novel: 'Orgulho e Preconceito',
    novelId: 'pride',
    traits: ['Perspicaz', 'Espirituosa', 'Independente'],
    description:
      'Lês as pessoas depressa e dizes o que pensas com graça. A tua independência não é pose: preferes recusar um bom partido a viver sem respeito. O teu desafio é o mesmo de Elizabeth, perceber que uma primeira impressão também pode ser um preconceito.',
    context:
      'Segunda de cinco irmãs, Elizabeth recusa duas propostas de casamento no romance, uma delas de um homem com dez mil libras por ano.',
  },
  {
    id: 'elinor',
    name: 'Elinor Dashwood',
    initial: 'E',
    novel: 'Razão e Sensibilidade',
    novelId: 'sense',
    traits: ['Ponderada', 'Observadora', 'Emocionalmente inteligente'],
    description:
      'És a pessoa a quem os outros recorrem quando tudo corre mal. Sentes muito, mas escolhes quando e a quem o mostras. O teu desafio é lembrar que a contenção não deve transformar-se em solidão.',
    context:
      'Elinor tem dezanove anos quando a família perde Norland. Guarda durante meses o segredo do noivado de Lucy Steele com Edward, o homem de quem ela própria gosta.',
  },
  {
    id: 'marianne',
    name: 'Marianne Dashwood',
    initial: 'M',
    novel: 'Razão e Sensibilidade',
    novelId: 'sense',
    traits: ['Apaixonada', 'Expressiva', 'Idealista'],
    description:
      'Sentes tudo por inteiro e não vês razão para o esconder. Música, poesia e paisagens comovem-te a sério. O teu desafio é aprender que a intensidade não é a única medida da verdade.',
    context:
      'Marianne tem dezasseis anos no início do romance e acredita que um segundo amor é impossível. Austen põe essa convicção à prova.',
  },
  {
    id: 'emma',
    name: 'Emma Woodhouse',
    initial: 'E',
    novel: 'Emma',
    novelId: 'emma',
    traits: ['Confiante', 'Imaginativa', 'Segura das próprias conclusões'],
    description:
      'Tens energia, ideias e uma confiança invejável na tua leitura dos outros. Gostas de fazer acontecer. O teu desafio é ouvir antes de concluir e aceitar que as pessoas não são personagens dos teus planos.',
    context:
      'Emma é a única heroína de Austen que não precisa de casar por dinheiro: é herdeira de trinta mil libras e governa a casa do pai, em Hartfield.',
  },
  {
    id: 'anne',
    name: 'Anne Elliot',
    initial: 'A',
    novel: 'Persuasão',
    novelId: 'persuasion',
    traits: ['Reflexiva', 'Leal', 'Discretamente resiliente'],
    description:
      'És constante. Lembras-te de tudo, perdoas mais do que dizes e tens uma força que os outros só notam numa crise. O teu desafio é dar à tua própria voz o mesmo peso que dás aos conselhos alheios.',
    context:
      'Anne tem vinte e sete anos e é ela quem mantém a calma quando Louisa Musgrove cai do Cobb, em Lyme.',
  },
  {
    id: 'catherine',
    name: 'Catherine Morland',
    initial: 'C',
    novel: 'A Abadia de Northanger',
    novelId: 'northanger',
    traits: ['Curiosa', 'Imaginativa', 'Aventureira'],
    description:
      'Entras em cada lugar à procura de uma história e é raro não a encontrares. Tens um coração generoso e uma imaginação incansável. O teu desafio é distinguir o que leste daquilo que está à tua frente.',
    context:
      'Catherine tem dezassete anos e chega a Bath sem experiência do mundo. Logo na primeira frase, Austen diz que ninguém a imaginaria destinada a ser heroína.',
  },
]

export const heroineById = Object.fromEntries(heroines.map((h) => [h.id, h]))
export const heroineOrder = heroines.map((h) => h.id)
