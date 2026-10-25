import { useCallback, useRef, useState } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import { BookOpen, Feather, X } from 'lucide-react'
import { seasonYear, socialEvents } from '../../data/socialEvents.js'
import { useFocusTrap } from '../../hooks/useFocusTrap.js'
import EditorialHeading from '../EditorialHeading.jsx'
import EventVignette from './EventVignette.jsx'
import styles from './SocialSeason.module.css'

/**
 * Sala IV. A fictional season laid out as invitation cards. Opening one
 * shows an editorial panel (modal dialog) that separates the invented
 * scene from the historical note.
 */
export default function SocialSeason() {
  const [openId, setOpenId] = useState(null)
  const panelRef = useRef(null)
  const reduce = useReducedMotion()
  const close = useCallback(() => setOpenId(null), [])
  useFocusTrap(panelRef, Boolean(openId), close)
  const event = socialEvents.find((e) => e.id === openId)

  return (
    <section id="temporada" className={`chapter ${styles.room}`} data-surface="burgundy" aria-labelledby="temporada-title">
      <div className="container">
        <div className={styles.intro}>
          <EditorialHeading
            id="temporada-title"
            eyebrow="Sala IV · A temporada social"
            lines={['A temporada', { text: `de ${seasonYear}`, italic: true, indent: 2 }]}
          />
          <div className={styles.introCopy}>
            <p className={styles.lead}>
              Cinco convites para uma temporada imaginária, de janeiro em Bath a agosto em Meryton. Abra um para conhecer
              a ocasião, o traje e o costume da época que a explica.
            </p>
            <ul className={styles.legend} aria-label="Legenda">
              <li>
                <Feather aria-hidden="true" />
                <span>
                  <strong>Ficção</strong>: eventos, anfitriões e convidados inventados
                </span>
              </li>
              <li>
                <BookOpen aria-hidden="true" />
                <span>
                  <strong>Facto histórico</strong>: costumes reais da Regência
                </span>
              </li>
            </ul>
          </div>
        </div>

        <ol className={styles.calendar}>
          {socialEvents.map((e, i) => (
            <li key={e.id} className={styles.slot} style={{ '--tilt': `${[-1.2, 0.8, -0.4, 1.1, -0.9][i]}deg` }}>
              <button
                type="button"
                className={styles.invite}
                onClick={() => setOpenId(e.id)}
                aria-haspopup="dialog"
                data-cursor="Abrir"
              >
                <span className={styles.date}>
                  <span className={`numeral ${styles.day}`}>{e.day}</span>
                  <span className={styles.month}>{e.month}</span>
                </span>
                <EventVignette name={e.vignette} className={styles.vignette} />
                <span className={styles.inviteTitle}>{e.title}</span>
                <span className={styles.place}>{e.place}</span>
                <span className={styles.summary}>{e.summary}</span>
                <span className={styles.open}>Abrir convite</span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <AnimatePresence>
        {event && (
          <m.div
            className={styles.backdrop}
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <m.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="evento-titulo"
              className={`${styles.panel} paper`}
              onClick={(ev) => ev.stopPropagation()}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, rotate: -1 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <button type="button" className={styles.close} onClick={close}>
                <X aria-hidden="true" />
                <span className="visually-hidden">Fechar convite</span>
              </button>

              <header className={styles.panelHead}>
                <p className="eyebrow">
                  {event.weekday}, {event.day} de {event.month} de {seasonYear}
                </p>
                <h3 id="evento-titulo" className={styles.panelTitle}>
                  {event.title}
                </h3>
                <p className={styles.panelPlace}>{event.place}</p>
              </header>

              <EventVignette name={event.vignette} className={styles.panelVignette} />

              <div className={styles.panelBody}>
                <section className={styles.block}>
                  <p className={styles.tag}>
                    <Feather aria-hidden="true" /> Ficção
                  </p>
                  <p className={styles.fiction}>{event.fiction}</p>
                </section>

                <section className={styles.block}>
                  <p className={styles.tag}>Traje</p>
                  <p>{event.dress}</p>
                </section>

                <section className={`${styles.block} ${styles.history}`}>
                  <p className={styles.tag}>
                    <BookOpen aria-hidden="true" /> Facto histórico · {event.history.title}
                  </p>
                  <p>{event.history.text}</p>
                </section>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </section>
  )
}
