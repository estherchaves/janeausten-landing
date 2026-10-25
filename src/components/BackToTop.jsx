import { ArrowUp } from 'lucide-react'
import { useScrollProgress } from '../hooks/useScrollProgress.js'
import { scrollToSection } from '../utils/scrollToSection.js'
import styles from './BackToTop.module.css'

const R = 22
const C = 2 * Math.PI * R

/** Return-to-top seal with a ring that fills as the visitor explores. */
export default function BackToTop() {
  const { progress, pastFold } = useScrollProgress()

  return (
    <button
      type="button"
      className={`${styles.button} ${pastFold ? styles.shown : ''}`}
      onClick={() => scrollToSection('inicio')}
      aria-label={`Voltar ao início. Explorou ${Math.round(progress * 100)}% da página.`}
      tabIndex={pastFold ? 0 : -1}
      aria-hidden={!pastFold}
    >
      <svg className={styles.ring} viewBox="0 0 52 52" aria-hidden="true">
        <circle cx="26" cy="26" r={R} className={styles.track} />
        <circle
          cx="26"
          cy="26"
          r={R}
          className={styles.fill}
          strokeDasharray={C}
          strokeDashoffset={C * (1 - progress)}
        />
      </svg>
      <ArrowUp className={styles.icon} aria-hidden="true" />
      <span className={styles.tip} aria-hidden="true">
        ao início
      </span>
    </button>
  )
}
