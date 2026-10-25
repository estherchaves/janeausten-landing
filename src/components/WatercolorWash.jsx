import styles from './WatercolorWash.module.css'

/**
 * A soft pigment bloom painted behind content. Purely decorative.
 * Position it with `style` (top/left/width…) inside a relatively positioned parent.
 */
export default function WatercolorWash({ color = 'var(--c-leaf)', opacity = 0.5, className = '', style }) {
  return (
    <span
      className={`${styles.wash} ${className}`}
      style={{ '--wash': color, '--wash-opacity': opacity, ...style }}
      aria-hidden="true"
    />
  )
}
