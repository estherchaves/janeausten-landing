import { describe, expect, it } from 'vitest'
import { heroineOrder, heroines } from '../data/heroines.js'
import { quizQuestions } from '../data/quizQuestions.js'
import { resultSummary, scoreQuiz } from './quizScoring.js'

const pick = (letters) => Object.fromEntries(quizQuestions.map((q, i) => [q.id, letters[i]]))

/** Every one of the 4^6 = 4096 possible answer sheets. */
function* allSheets() {
  const letters = ['a', 'b', 'c', 'd']
  for (let n = 0; n < 4 ** quizQuestions.length; n++) {
    let x = n
    const sheet = []
    for (let i = 0; i < quizQuestions.length; i++) {
      sheet.push(letters[x % 4])
      x = Math.floor(x / 4)
    }
    yield sheet
  }
}

describe('question matrix', () => {
  it('has six questions with four answers each', () => {
    expect(quizQuestions).toHaveLength(6)
    quizQuestions.forEach((q) => expect(q.answers.map((a) => a.id)).toEqual(['a', 'b', 'c', 'd']))
  })

  it('only references known heroines, never the same one twice in an answer', () => {
    quizQuestions.forEach((q) =>
      q.answers.forEach((a) => {
        expect(heroineOrder).toContain(a.primary)
        expect(heroineOrder).toContain(a.secondary)
        expect(a.primary).not.toBe(a.secondary)
      }),
    )
  })

  it('is balanced: each heroine is primary 4 times and secondary 4 times', () => {
    const count = (key) =>
      quizQuestions.flatMap((q) => q.answers.map((a) => a[key])).reduce((m, id) => ({ ...m, [id]: (m[id] ?? 0) + 1 }), {})
    heroineOrder.forEach((id) => {
      expect(count('primary')[id]).toBe(4)
      expect(count('secondary')[id]).toBe(4)
    })
  })
})

describe('scoreQuiz', () => {
  it('awards 3 points to the primary and 1 to the secondary heroine', () => {
    const { ranking } = scoreQuiz({ baile: 'a' })
    const byId = Object.fromEntries(ranking.map((r) => [r.id, r.score]))
    expect(byId.elizabeth).toBe(3)
    expect(byId.emma).toBe(1)
    expect(byId.anne).toBe(0)
  })

  it('is deterministic', () => {
    const sheet = pick(['c', 'b', 'd', 'a', 'b', 'c'])
    expect(scoreQuiz(sheet)).toEqual(scoreQuiz(sheet))
  })

  it('reports whether every question was answered', () => {
    expect(scoreQuiz(pick(['a', 'a', 'a', 'a', 'a', 'a'])).complete).toBe(true)
    expect(scoreQuiz({ baile: 'a' }).complete).toBe(false)
    expect(scoreQuiz(undefined).complete).toBe(false)
  })

  it('ignores unknown answer ids', () => {
    expect(scoreQuiz({ baile: 'z' }).ranking.every((r) => r.score === 0)).toBe(true)
  })

  it.each(heroines.map((h) => h.id))('gives %s when every answer is hers', (id) => {
    const sheet = Object.fromEntries(
      quizQuestions.map((q) => [q.id, (q.answers.find((a) => a.primary === id) ?? q.answers.find((a) => a.secondary === id) ?? q.answers[0]).id]),
    )
    expect(scoreQuiz(sheet).winner).toBe(id)
  })

  it('breaks a tie on total points by primary answers, then by the most recent one', () => {
    // Custom matrix: emma, marianne and catherine each get one primary (3 points);
    // anne collects three secondaries (3 points) but no primary.
    const questions = ['emma', 'marianne', 'catherine'].map((primary, i) => ({
      id: `q${i}`,
      answers: [{ id: 'a', primary, secondary: 'anne' }],
    }))
    const { winner, ranking } = scoreQuiz({ q0: 'a', q1: 'a', q2: 'a' }, questions)
    expect(ranking.slice(0, 4).map((r) => r.score)).toEqual([3, 3, 3, 3])
    expect(ranking[3].id).toBe('anne')
    expect(winner).toBe('catherine')
  })

  it('breaks a full tie by the most recent primary answer', () => {
    // elinor (q1 b) and marianne (q6 c) both 3 + 0 points, one primary hit each
    const { winner, ranking } = scoreQuiz({ baile: 'b', valor: 'c' })
    expect(ranking.find((r) => r.id === 'elinor').score).toBe(3 + 0)
    expect(winner).toBe('marianne')
  })

  it('makes every heroine reachable, with no result dominating, across all 4096 answer sheets', () => {
    const wins = Object.fromEntries(heroineOrder.map((id) => [id, 0]))
    for (const sheet of allSheets()) {
      const result = scoreQuiz(pick(sheet))
      expect(result.complete).toBe(true)
      wins[result.winner] += 1
    }
    const total = 4 ** 6
    Object.values(wins).forEach((n) => {
      expect(n / total).toBeGreaterThan(0.1)
      expect(n / total).toBeLessThan(0.25)
    })
  })
})

describe('resultSummary', () => {
  it('names the heroine, the novel and the three traits', () => {
    const text = resultSummary(heroines[0])
    expect(text).toContain('Elizabeth Bennet')
    expect(text).toContain('Orgulho e Preconceito')
    expect(text).toContain('perspicaz, espirituosa e independente')
  })
})
