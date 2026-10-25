import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Plus } from 'lucide-react'
import { novelById } from '../../data/novels.js'
import { openNovel } from '../../utils/openNovel.js'
import styles from './ThemeArchive.module.css'

/** One accordion chapter: heading button, then the essay, the books, today, the reference. */
export default function ThemeChapter({ theme, open, onToggle }) {
  const reduce = useReducedMotion()
  const buttonId = `tema-${theme.id}-botao`
  const panelId = `tema-${theme.id}`
  const ref = theme.reference
  const refNovel = novelById[ref.novel]

  return (
    <li className={`${styles.item} ${open ? styles.isOpen : ''}`} style={{ '--tone': theme.tone }}>
      <h3 className={styles.itemHeading}>
        <button
          id={buttonId}
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          data-cursor={open ? 'Fechar' : 'Ler'}
        >
          <span className={`numeral ${styles.numeral}`} aria-hidden="true">
            <span className={styles.numeralWash} />
            {theme.numeral}
          </span>
          <span className={styles.titles}>
            <span className={styles.title}>{theme.title}</span>
            <span className={styles.dek}>{theme.dek}</span>
          </span>
          <span className={styles.icon} aria-hidden="true">
            <Plus />
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <m.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            className={styles.panel}
            initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.panelInner}>
              <div className={styles.essay}>
                {theme.body.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>

              <div className={styles.books}>
                <p className="eyebrow">Nos romances</p>
                <ul>
                  {theme.novels.map(({ id, note }) => (
                    <li key={id}>
                      <button type="button" className={styles.book} onClick={() => openNovel(id)} data-cursor="Abrir">
                        <span className={styles.bookTitle}>
                          {novelById[id].title}
                          <ArrowUpRight aria-hidden="true" />
                        </span>
                        <span className={styles.bookNote}>{note}</span>
                        <span className="visually-hidden">. Abrir na estante dos romances.</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.today}>
                <p className={styles.todayLabel}>Uma leitura de hoje</p>
                <p className={styles.todayText}>{theme.today}</p>
              </div>

              <figure className={styles.reference}>
                <p className="eyebrow">Referência</p>
                <blockquote className={styles.quote}>
                  <p className={styles.translation}>«{ref.translation}»</p>
                  <p className={styles.original} lang="en">
                    “{ref.original}”
                  </p>
                </blockquote>
                <figcaption className="caption">
                  {ref.speaker} · <cite>{refNovel.original}</cite>, cap. {ref.chapter} · Tradução editorial
                </figcaption>
              </figure>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </li>
  )
}
