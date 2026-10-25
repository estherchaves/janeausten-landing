import styles from './WaxSeal.module.css'

/** Wax seal drawn entirely in CSS, with an embossed monogram. */
export default function WaxSeal({ monogram = 'JA', size = 88, tone = 'burgundy', label }) {
  return (
    <span
      className={`${styles.seal} ${styles[tone]}`}
      style={{ '--size': `${size}px` }}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : 'true'}
    >
      <span className={styles.ring}>
        <span className={styles.monogram}>{monogram}</span>
      </span>
    </span>
  )
}
