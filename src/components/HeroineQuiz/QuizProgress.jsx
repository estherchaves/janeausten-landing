import styles from './QuizProgress.module.css'

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI']

/** Six Roman numerals on a thread; answered ones are inked, the current one is circled. */
export default function QuizProgress({ current, total, answers, questions }) {
  return (
    <div className={styles.progress}>
      <p className={styles.label}>
        Pergunta <span className="numeral">{ROMAN[current]}</span> de <span className="numeral">{ROMAN[total - 1]}</span>
      </p>
      <ol className={styles.steps} aria-hidden="true">
        {questions.map((q, i) => (
          <li
            key={q.id}
            className={[styles.step, answers[q.id] && styles.done, i === current && styles.current].filter(Boolean).join(' ')}
          >
            {ROMAN[i]}
          </li>
        ))}
      </ol>
      <span className={styles.thread} aria-hidden="true">
        <span style={{ transform: `scaleX(${(current + 1) / total})` }} />
      </span>
    </div>
  )
}
