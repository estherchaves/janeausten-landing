import { useRef } from 'react'
import styles from './BookSpineStack.module.css'

/**
 * An illustrated stack of the six novels, drawn in CSS like a gouache sketch.
 *
 * It behaves as an ARIA tab list (vertical): one spine is in the tab order,
 * Arrow Up/Down move and select, Home/End jump to the ends. Hover or focus
 * slides a spine out of the stack; the selected one stays out.
 * Pass `panelId` to link the tabs to the panel they control.
 */
export default function BookSpineStack({ novels, selectedId, onSelect, panelId, label = 'Escolher um romance' }) {
  const refs = useRef({})

  const move = (index) => {
    const next = novels[(index + novels.length) % novels.length]
    onSelect?.(next.id)
    refs.current[next.id]?.focus()
  }

  const onKeyDown = (e, index) => {
    const keys = {
      ArrowDown: () => move(index + 1),
      ArrowRight: () => move(index + 1),
      ArrowUp: () => move(index - 1),
      ArrowLeft: () => move(index - 1),
      Home: () => move(0),
      End: () => move(novels.length - 1),
    }
    if (keys[e.key]) {
      e.preventDefault()
      keys[e.key]()
    }
  }

  return (
    <div className={styles.stack} role="tablist" aria-label={label} aria-orientation="vertical">
      {novels.map((n, i) => {
        const selected = n.id === selectedId
        return (
          <button
            key={n.id}
            ref={(el) => {
              refs.current[n.id] = el
            }}
            id={`lombada-${n.id}`}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls={panelId}
            tabIndex={selected ? 0 : -1}
            className={`${styles.spine} ${styles[n.spine.pattern]} ${selected ? styles.selected : ''}`}
            style={{ '--w': `${n.spine.width}%`, '--tilt': `${n.spine.tilt}deg` }}
            onClick={() => onSelect?.(n.id)}
            onKeyDown={(e) => onKeyDown(e, i)}
            data-cursor="Abrir"
          >
            <span className={`${styles.title} ${styles[n.spine.label]}`}>{n.title}</span>
            <span className={styles.author}>Jane Austen</span>
            <span className={styles.pages} aria-hidden="true" />
            <span className="visually-hidden">, {n.year}</span>
          </button>
        )
      })}
    </div>
  )
}
