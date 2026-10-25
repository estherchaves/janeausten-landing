import styles from './OrnamentalRule.module.css'

/**
 * The house divider: two hairlines meeting at a small lozenge with sprigs.
 * With `draw`, the hairlines extend outward from the centre and the
 * lozenge is traced, once, when the rule mounts.
 */
export default function OrnamentalRule({ draw = false, className = '' }) {
  return (
    <div className={`${styles.rule} ${draw ? styles.draw : ''} ${className}`} aria-hidden="true">
      <span className={`${styles.line} ${styles.left}`} />
      <svg className={`${styles.mark} ${draw ? 'draw-line' : ''}`} viewBox="0 0 56 24" focusable="false">
        <path d="M2 12 C8 5 14 5 16 12 C14 19 8 19 2 12" style={{ '--path-length': 40, '--delay': '0.7s' }} />
        <path d="M28 2 L38 12 L28 22 L18 12 Z" style={{ '--path-length': 60, '--delay': '0.4s' }} />
        <path d="M54 12 C48 5 42 5 40 12 C42 19 48 19 54 12" style={{ '--path-length': 40, '--delay': '0.7s' }} />
      </svg>
      <span className={`${styles.line} ${styles.right}`} />
    </div>
  )
}
