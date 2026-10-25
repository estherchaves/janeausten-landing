import { useEffect, useState } from 'react'
import { m, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { useFinePointer } from '../hooks/useMediaQuery.js'
import styles from './CustomCursor.module.css'

/**
 * A quiet ink ring that follows the pointer only over elements marked with
 * `data-cursor="Label"`. The native cursor is never hidden, so nothing about
 * pointing or clicking changes. Disabled on touch and with reduced motion.
 */
export default function CustomCursor() {
  const fine = useFinePointer()
  const reduce = useReducedMotion()
  const enabled = fine && !reduce
  const [label, setLabel] = useState(null)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40 })
  const sy = useSpring(y, { stiffness: 500, damping: 40 })

  useEffect(() => {
    if (!enabled) return undefined
    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const target = e.target instanceof Element ? e.target.closest('[data-cursor]') : null
      setLabel(target ? target.getAttribute('data-cursor') : null)
    }
    const onLeave = () => setLabel(null)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <m.div className={`${styles.cursor} ${label ? styles.visible : ''}`} style={{ x: sx, y: sy }} aria-hidden="true">
      <span className={styles.ring}>
        <span className={styles.label}>{label}</span>
      </span>
    </m.div>
  )
}
