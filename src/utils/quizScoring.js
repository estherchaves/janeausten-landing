import { heroineOrder } from '../data/heroines.js'
import { PRIMARY_POINTS, SECONDARY_POINTS, quizQuestions } from '../data/quizQuestions.js'

/**
 * Deterministic scoring for "Que heroína de Jane Austen és tu?"
 *
 * 1. Every chosen answer gives PRIMARY_POINTS (3) to its primary heroine and
 *    SECONDARY_POINTS (1) to its secondary heroine.
 * 2. The heroine with the highest total wins.
 * 3. Ties are broken, in order, by:
 *    a. the number of answers in which she was the primary heroine;
 *    b. the most recent answer in which she was the primary heroine
 *       (later questions weigh more, as the quiz moves from manners to values);
 *    c. the fixed order of `heroines` in data/heroines.js.
 *
 * Nothing is random: the same answers always give the same result.
 *
 * @param {Record<string, string>} answers  questionId → answerId
 * @param {typeof quizQuestions} questions
 * @returns {{ winner: string, ranking: Array<{ id: string, score: number, primaryHits: number, lastPrimary: number }>, maxScore: number, complete: boolean }}
 */
export function scoreQuiz(answers, questions = quizQuestions) {
  const tally = Object.fromEntries(heroineOrder.map((id) => [id, { id, score: 0, primaryHits: 0, lastPrimary: -1 }]))

  questions.forEach((question, qIndex) => {
    const answer = question.answers.find((a) => a.id === answers?.[question.id])
    if (!answer) return
    tally[answer.primary].score += PRIMARY_POINTS
    tally[answer.primary].primaryHits += 1
    tally[answer.primary].lastPrimary = qIndex
    tally[answer.secondary].score += SECONDARY_POINTS
  })

  const ranking = Object.values(tally).sort(
    (a, b) =>
      b.score - a.score ||
      b.primaryHits - a.primaryHits ||
      b.lastPrimary - a.lastPrimary ||
      heroineOrder.indexOf(a.id) - heroineOrder.indexOf(b.id),
  )

  return {
    winner: ranking[0].id,
    ranking,
    maxScore: questions.length * PRIMARY_POINTS,
    complete: questions.every((q) => q.answers.some((a) => a.id === answers?.[q.id])),
  }
}

/** Text used by the copy and share buttons. */
export function resultSummary(heroine) {
  return `Fiz o questionário «Que heroína de Jane Austen és tu?» e sou ${heroine.name} (${heroine.novel}): ${heroine.traits
    .join(', ')
    .toLowerCase()
    .replace(/, ([^,]*)$/, ' e $1')}.\n\nJane Austen · Arquivo Literário, um projeto CodEst.`
}
