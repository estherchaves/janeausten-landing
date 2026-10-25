import { useEffect, useState } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import { novelById, novels } from '../../data/novels.js'
import BookSpineStack from '../BookSpineStack.jsx'
import EditorialHeading from '../EditorialHeading.jsx'
import { OPEN_NOVEL_EVENT } from '../../utils/openNovel.js'
import NovelPanel from './NovelPanel.jsx'
import styles from './NovelExplorer.module.css'

const PANEL_ID = 'romance-em-destaque'

/**
 * Sala I. The whole room adopts the selected novel's world: the section's
 * data-novel attribute swaps the colour tokens (see tokens.css), and the
 * panel recomposes itself with that book's layout.
 */
export default function NovelExplorer() {
  const [selectedId, setSelectedId] = useState('pride')
  const reduce = useReducedMotion()

  useEffect(() => {
    const onOpen = (e) => {
      if (novelById[e.detail?.id]) setSelectedId(e.detail.id)
    }
    window.addEventListener(OPEN_NOVEL_EVENT, onOpen)
    return () => window.removeEventListener(OPEN_NOVEL_EVENT, onOpen)
  }, [])

  const index = novels.findIndex((n) => n.id === selectedId)
  const novel = novels[index]

  const step = (delta) => setSelectedId(novels[(index + delta + novels.length) % novels.length].id)

  return (
    <section id="romances" className={`chapter ${styles.room}`} data-novel={novel.id} aria-labelledby="romances-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.intro}>
          <EditorialHeading
            id="romances-title"
            eyebrow="Sala I · O universo literário"
            lines={['Seis romances,', { text: 'seis mundos.', italic: true, indent: 2 }]}
          />
          <p className={styles.lead}>
            Escolha um livro da estante. A sala muda de cor, de ritmo e de voz para receber o seu mundo.
          </p>
        </div>

        <div className={styles.shelf}>
          <div className={styles.shelfSticky}>
            <BookSpineStack
              novels={novels}
              selectedId={selectedId}
              onSelect={setSelectedId}
              panelId={PANEL_ID}
              label="Estante dos seis romances"
            />
            <p className={`caption ${styles.hint}`}>
              Clique numa lombada ou use as setas do teclado para percorrer a estante.
            </p>
          </div>
        </div>

        <div
          id={PANEL_ID}
          role="tabpanel"
          aria-labelledby={`lombada-${novel.id}`}
          className={styles.stage}
          tabIndex={0}
        >
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={novel.id}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: reduce ? 0.01 : 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <NovelPanel
                novel={novel}
                index={index}
                previous={novels[(index - 1 + novels.length) % novels.length]}
                next={novels[(index + 1) % novels.length]}
                onStep={step}
              />
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
