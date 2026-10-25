# Questionário «Que heroína de Jane Austen és tu?»

Funciona inteiramente no browser. Não usa APIs, não guarda respostas e não envia dados.

## Pontuação

- 6 perguntas × 4 respostas (`src/data/quizQuestions.js`).
- Cada resposta dá **3 pontos** à heroína principal e **1 ponto** a uma heroína secundária.
- A matriz é equilibrada: cada heroína é principal em 4 respostas e secundária noutras 4.
- Máximo possível: 18 pontos.

## Desempate (determinístico)

1. Mais pontos.
2. Mais respostas em que foi a heroína principal.
3. A resposta principal mais recente (as últimas perguntas, sobre valores, pesam mais).
4. Ordem fixa: Elizabeth, Elinor, Marianne, Emma, Anne, Catherine.

Implementação: `src/utils/quizScoring.js`. O mesmo conjunto de respostas dá sempre o mesmo resultado.

## Testes

`npm test` corre `src/utils/quizScoring.test.js` (17 testes), que verifica:

- a estrutura e o equilíbrio da matriz;
- a soma 3 + 1 por resposta;
- o determinismo e o tratamento de respostas incompletas ou inválidas;
- que cada heroína ganha quando se escolhem as respostas dela;
- as regras de desempate;
- as 4096 combinações possíveis de respostas: todas produzem um resultado e nenhuma heroína fica abaixo de 10% ou acima de 25%.

Distribuição atual pelas 4096 combinações: Elinor 18,5%, Elizabeth 17,3%, Marianne 16,9%, Emma 16,7%, Catherine 15,9%, Anne 14,8%.

## Partilha

«Copiar resultado» usa a Clipboard API, com alternativa por `execCommand`. «Partilhar» usa a Web Share API quando o dispositivo a oferece; caso contrário, copia o texto e explica porquê.
