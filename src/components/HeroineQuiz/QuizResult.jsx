import { Check, Copy, RotateCcw, Share2 } from 'lucide-react'
import { useState } from 'react'
import { heroineById } from '../../data/heroines.js'
import { useClipboard } from '../../hooks/useClipboard.js'
import { resultSummary } from '../../utils/quizScoring.js'
import { scrollToSection } from '../../utils/scrollToSection.js'
import HeroineCameo from './HeroineCameo.jsx'
import styles from './QuizResult.module.css'

/** The result, set like a culture-magazine profile, with the scoring shown openly. */
export default function QuizResult({ result, heroine, onRestart, onBack }) {
  const { copy, status } = useClipboard()
  const [shareNote, setShareNote] = useState('')
  const summary = resultSummary(heroine)
  const runnerUp = heroineById[result.ranking[1].id]

  const share = async () => {
    setShareNote('')
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Jane Austen · Que heroína és tu?', text: summary })
        return
      } catch (err) {
        if (err?.name === 'AbortError') return
      }
    }
    const ok = await copy(summary)
    setShareNote(
      ok
        ? 'A partilha direta não está disponível aqui, por isso copiámos o texto para colar onde quiser.'
        : 'Não foi possível partilhar nem copiar. Selecione o texto do resultado e copie-o manualmente.',
    )
  }

  return (
    <article className={styles.result} aria-labelledby="resultado-nome">
      <div className={styles.head}>
        <HeroineCameo heroine={heroine} />
        <div className={styles.titleBlock}>
          <p className="eyebrow">O seu resultado</p>
          <p className={styles.youAre}>És</p>
          <h3 id="resultado-nome" className={styles.name}>
            {heroine.name}
          </h3>
          <p className={styles.novel}>
            em{' '}
            <a
              className="link"
              href="#romances"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('romances')
              }}
            >
              {heroine.novel}
            </a>
          </p>
        </div>
      </div>

      <ul className={styles.traits} aria-label="Traços">
        {heroine.traits.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>

      <p className={styles.description}>{heroine.description}</p>

      <div className={styles.context}>
        <p className="eyebrow">Contexto literário</p>
        <p>{heroine.context}</p>
      </div>

      <div className={styles.scores}>
        <p className="eyebrow">As suas afinidades</p>
        <ol className={styles.bars}>
          {result.ranking.map((r) => (
            <li key={r.id} className={r.id === heroine.id ? styles.top : ''}>
              <span className={styles.barName}>{heroineById[r.id].name}</span>
              <span className={styles.bar} aria-hidden="true">
                <span style={{ transform: `scaleX(${r.score / result.maxScore})` }} />
              </span>
              <span className={`numeral ${styles.barValue}`}>
                {r.score}
                <span className="visually-hidden"> pontos</span>
              </span>
            </li>
          ))}
        </ol>
        <p className="caption">
          Máximo possível: {result.maxScore} pontos. Logo a seguir vem {runnerUp.name}.
        </p>
      </div>

      <div className={styles.actions}>
        <button type="button" className="btn" onClick={() => copy(summary)}>
          {status === 'copied' ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
          {status === 'copied' ? 'Copiado' : 'Copiar resultado'}
        </button>
        <button type="button" className="btn btn--quiet" onClick={share}>
          <Share2 aria-hidden="true" /> Partilhar
        </button>
        <button type="button" className="btn btn--quiet" onClick={onRestart}>
          <RotateCcw aria-hidden="true" /> Recomeçar
        </button>
        <button type="button" className={`link ${styles.back}`} onClick={onBack}>
          Rever a última resposta
        </button>
      </div>
      <p className={`caption ${styles.feedback}`} role="status">
        {status === 'copied' && !shareNote && 'Resultado copiado para a área de transferência.'}
        {status === 'error' && !shareNote && 'Não foi possível copiar. Selecione o texto e copie-o manualmente.'}
        {shareNote}
      </p>
    </article>
  )
}
