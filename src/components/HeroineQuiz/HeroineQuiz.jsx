import { useMemo, useRef, useState } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Feather } from 'lucide-react'
import { heroineById } from '../../data/heroines.js'
import { quizQuestions } from '../../data/quizQuestions.js'
import { scoreQuiz } from '../../utils/quizScoring.js'
import EditorialHeading from '../EditorialHeading.jsx'
import QuizProgress from './QuizProgress.jsx'
import QuizQuestion from './QuizQuestion.jsx'
import QuizResult from './QuizResult.jsx'
import styles from './HeroineQuiz.module.css'

/**
 * Sala II. A six-question personality quiz, entirely client-side.
 * step: -1 = cover, 0…5 = questions, 6 = result.
 * Scoring lives in utils/quizScoring.js and is unit-tested.
 */
export default function HeroineQuiz() {
  const [step, setStep] = useState(-1)
  const [answers, setAnswers] = useState({})
  const [direction, setDirection] = useState(1)
  const reduce = useReducedMotion()
  const stageRef = useRef(null)

  const total = quizQuestions.length
  const question = quizQuestions[step]
  const result = useMemo(() => scoreQuiz(answers), [answers])
  const showResult = step === total

  const go = (next) => {
    setDirection(next > step ? 1 : -1)
    setStep(next)
    // Keep keyboard and screen-reader users on the new screen
    requestAnimationFrame(() => stageRef.current?.focus({ preventScroll: true }))
  }

  const restart = () => {
    setAnswers({})
    go(0)
  }

  const slide = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, x: 40 * direction },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -40 * direction },
      }

  return (
    <section id="questionario" className={`chapter ${styles.room}`} data-surface="ink" aria-labelledby="questionario-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.aside}>
          <EditorialHeading
            id="questionario-title"
            eyebrow="Sala II · Questionário"
            lines={['Que heroína', { text: 'de Jane Austen', italic: true, indent: 1 }, { text: 'és tu?', indent: 2 }]}
          />
          {step >= 0 && !showResult && <QuizProgress current={step} total={total} answers={answers} questions={quizQuestions} />}
          <p className={`caption ${styles.method}`}>
            Sem sorteios: cada resposta soma pontos a duas heroínas e o resultado é sempre o mesmo para as mesmas
            respostas. Nada é enviado para nenhum servidor.
          </p>
        </div>

        <div ref={stageRef} className={styles.stage} tabIndex={-1}>
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={showResult ? 'result' : step}
              {...slide}
              transition={{ duration: reduce ? 0.15 : 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
              {step === -1 && (
                <div className={styles.cover}>
                  <Feather className={styles.coverIcon} aria-hidden="true" />
                  <p className={styles.coverLead}>
                    Seis cenas da vida na Regência, de um baile em Meryton a uma tarde livre em Bath. Escolha a resposta
                    mais parecida consigo, não a mais elegante.
                  </p>
                  <p className="caption">Seis perguntas · cerca de dois minutos</p>
                  <button type="button" className="btn" onClick={() => go(0)}>
                    Começar o questionário <ArrowRight aria-hidden="true" />
                  </button>
                </div>
              )}

              {question && (
                <form
                  className={styles.form}
                  onSubmit={(e) => {
                    e.preventDefault()
                    if (answers[question.id]) go(step + 1)
                  }}
                >
                  <QuizQuestion
                    question={question}
                    index={step}
                    total={total}
                    value={answers[question.id]}
                    onChange={(answerId) => setAnswers((prev) => ({ ...prev, [question.id]: answerId }))}
                  />
                  <div className={styles.nav}>
                    <button
                      type="button"
                      className="btn btn--quiet"
                      onClick={() => go(step - 1)}
                      aria-label={step === 0 ? 'Voltar à apresentação' : 'Pergunta anterior'}
                    >
                      <ArrowLeft aria-hidden="true" /> Voltar
                    </button>
                    <button type="submit" className="btn" disabled={!answers[question.id]}>
                      {step === total - 1 ? 'Ver o resultado' : 'Seguinte'} <ArrowRight aria-hidden="true" />
                    </button>
                  </div>
                  {!answers[question.id] && <p className={`caption ${styles.hint}`}>Escolha uma resposta para continuar.</p>}
                </form>
              )}

              {showResult && result.complete && (
                <QuizResult result={result} heroine={heroineById[result.winner]} onRestart={restart} onBack={() => go(total - 1)} />
              )}
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
