import { useRef } from 'react'
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import styles from './Prelude.module.css'

/**
 * The thesis of the exhibition, read word by word as the visitor scrolls.
 * Scroll is never captured: words simply gain ink as they pass through
 * the viewport. Key words carry a margin note.
 */
const statement = [
  { t: 'Em' }, { t: 'Jane' }, { t: 'Austen,' }, { t: 'um' },
  { t: 'olhar,', key: true, note: 'Darcy, no baile de Meryton' },
  { t: 'uma' }, { t: 'herança,', key: true, note: 'Norland, perdida por testamento' },
  { t: 'um' }, { t: 'baile', key: true, note: 'Netherfield, Bath, Highbury' },
  { t: 'ou' }, { t: 'uma' }, { t: 'frase' }, { t: 'aparentemente' },
  { t: 'inocente', key: true, note: 'e quase nunca inocente' },
  { t: 'podiam' }, { t: 'mudar' }, { t: 'tudo.' },
]

const facts = [
  { year: '1775', text: 'Nasce em Steventon, no Hampshire, sétima de oito filhos de um pároco.' },
  { year: '1811', text: 'Publica Razão e Sensibilidade. Na folha de rosto lê-se apenas «By a Lady».' },
  { year: '1817', text: 'Morre em Winchester, aos 41 anos. Persuasão e A Abadia de Northanger saem nesse dezembro.' },
]

function Word({ word, index, total, progress }) {
  const start = index / total
  const end = start + 1.6 / total
  const opacity = useTransform(progress, [start, end], [0.16, 1])
  return (
    <m.span className={`${styles.word} ${word.key ? styles.key : ''}`} style={{ opacity }}>
      {word.t}
      {word.note && (
        <span className={styles.note} aria-hidden="true">
          {word.note}
        </span>
      )}{' '}
    </m.span>
  )
}

export default function Prelude() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.55'] })

  return (
    <section id="prologo" ref={ref} className={`chapter ${styles.prelude}`} data-surface="ink" aria-labelledby="prologo-title">
      <div className={`container ${styles.grid}`}>
        <p id="prologo-title" className={`eyebrow ${styles.eyebrow}`}>
          Prólogo · Inteligência, desejo, reputação e rebeldia
        </p>

        <p className={styles.statement}>
          {reduce
            ? statement.map((w, i) => (
                <span key={i} className={`${styles.word} ${w.key ? styles.key : ''}`}>
                  {w.t}{' '}
                </span>
              ))
            : statement.map((w, i) => (
                <Word key={i} word={w} index={i} total={statement.length} progress={scrollYProgress} />
              ))}
        </p>

        <ol className={styles.facts} aria-label="Datas essenciais">
          {facts.map((f) => (
            <li key={f.year} className={styles.fact}>
              <span className={`numeral ${styles.year}`}>{f.year}</span>
              <span className={styles.factText}>{f.text}</span>
            </li>
          ))}
        </ol>
        <p className={`caption ${styles.factsNote}`}>Factos biográficos. As notas à margem são leituras editoriais.</p>
      </div>
    </section>
  )
}
