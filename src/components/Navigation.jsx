import { useCallback, useRef, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navSections } from '../data/sections.js'
import { useActiveSection } from '../hooks/useActiveSection.js'
import { useFocusTrap } from '../hooks/useFocusTrap.js'
import { useScrollProgress } from '../hooks/useScrollProgress.js'
import { scrollToSection } from '../utils/scrollToSection.js'
import styles from './Navigation.module.css'

const ids = navSections.map((s) => s.id)

export default function Navigation() {
  const [open, setOpen] = useState(false)
  const { progress, scrolled } = useScrollProgress()
  const active = useActiveSection(ids)
  const panelRef = useRef(null)

  const close = useCallback(() => setOpen(false), [])
  useFocusTrap(panelRef, open, close)

  const go = (e, id) => {
    e.preventDefault()
    setOpen(false)
    // Let the menu unmount and release the scroll lock before moving
    requestAnimationFrame(() => scrollToSection(id))
  }

  return (
    <>
      <header className={`${styles.bar} ${scrolled ? styles.solid : ''}`}>
        <nav className={`container ${styles.inner}`} aria-label="Principal">
          <a className={styles.logo} href="#inicio" onClick={(e) => go(e, 'inicio')}>
            <span className={styles.logoScript}>Jane Austen</span>
            <span className={styles.logoMeta}>Arquivo literário</span>
          </a>

          <ul className={styles.links}>
            {navSections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={`${styles.link} ${active === s.id ? styles.current : ''}`}
                  aria-current={active === s.id ? 'location' : undefined}
                  onClick={(e) => go(e, s.id)}
                >
                  <span className={styles.numeral} aria-hidden="true">
                    {s.numeral}
                  </span>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className={styles.menuButton}
            aria-expanded={open}
            aria-controls="menu-movel"
            onClick={() => setOpen(true)}
          >
            <Menu aria-hidden="true" />
            <span>Menu</span>
          </button>
        </nav>

        <span
          className={styles.progress}
          style={{ transform: `scaleX(${progress})` }}
          aria-hidden="true"
        />
      </header>

      <AnimatePresence>
        {open && (
          <m.div
            ref={panelRef}
            id="menu-movel"
            className={styles.panel}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            data-surface="ink"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: [0.65, 0, 0.35, 1] }}
          >
            <div className={styles.panelTop}>
              <span className={styles.logoScript}>Jane Austen</span>
              <button type="button" className={styles.close} onClick={close}>
                <X aria-hidden="true" />
                <span>Fechar</span>
              </button>
            </div>

            <ol className={styles.panelLinks}>
              {navSections.map((s, i) => (
                <m.li
                  key={s.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 + i * 0.05, duration: 0.5 }}
                >
                  <a href={`#${s.id}`} onClick={(e) => go(e, s.id)}>
                    <span className={styles.panelNumeral}>{s.numeral}</span>
                    <span className={styles.panelLabel}>{s.title}</span>
                  </a>
                </m.li>
              ))}
            </ol>

            <p className={`caption ${styles.panelNote}`}>
              Uma exposição digital em cinco salas. Concebido e desenvolvido pela CodEst.
            </p>
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}
