import styles from './QuizQuestion.module.css'

const LETTERS = { a: 'a', b: 'b', c: 'c', d: 'd' }

/** One scene, four answers, as a native radio group (arrow keys work out of the box). */
export default function QuizQuestion({ question, index, total, value, onChange }) {
  const name = `pergunta-${question.id}`
  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>
        <span className="eyebrow">
          Cena {index + 1} de {total} · {question.scene}
        </span>
        <span className={styles.prompt}>{question.prompt}</span>
      </legend>

      <div className={styles.answers}>
        {question.answers.map((a) => {
          const id = `${name}-${a.id}`
          const checked = value === a.id
          return (
            <label key={a.id} htmlFor={id} className={`${styles.answer} ${checked ? styles.checked : ''}`}>
              <input
                id={id}
                type="radio"
                name={name}
                value={a.id}
                checked={checked}
                onChange={() => onChange(a.id)}
                className={styles.radio}
              />
              <span className={styles.letter} aria-hidden="true">
                {LETTERS[a.id]}
              </span>
              <span className={styles.text}>{a.text}</span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
