import styles from './EventVignette.module.css'

/** Small pen drawings for the invitations: chandelier, house, table, garden arch, fan. */
const drawings = {
  chandelier: (
    <g>
      <path d="M60 4 V26" />
      <path d="M24 44 Q60 70 96 44" />
      <path d="M34 34 Q60 52 86 34" />
      {[24, 42, 60, 78, 96].map((x, i) => (
        <g key={x}>
          <path d={`M${x} ${i % 4 === 0 ? 44 : 50} v-10`} />
          <path className={styles.flame} d={`M${x} ${i % 4 === 0 ? 30 : 36} c-3 -4 0 -8 0 -10 c0 2 3 6 0 10 Z`} />
        </g>
      ))}
      <path d="M60 58 v10 M54 74 l6 8 l6 -8 Z" />
    </g>
  ),
  house: (
    <g>
      <path d="M14 46 L60 18 L106 46 Z" />
      <rect x="14" y="46" width="92" height="38" />
      {[24, 40, 74, 90].map((x) => (
        <rect key={x} x={x} y="54" width="8" height="12" />
      ))}
      <path d="M52 84 V66 a8 8 0 0 1 16 0 V84" />
      <path d="M0 84 H120" />
    </g>
  ),
  table: (
    <g>
      <ellipse cx="60" cy="58" rx="50" ry="16" />
      {[22, 42, 60, 78, 98].map((x, i) => (
        <circle key={x} cx={x} cy={i % 2 ? 54 : 62} r="5" />
      ))}
      <path d="M60 28 V48 M52 34 h16 M54 28 c0 -6 12 -6 12 0" />
      <path d="M20 72 V88 M100 72 V88" />
    </g>
  ),
  garden: (
    <g>
      <path d="M30 88 V40 Q60 6 90 40 V88" />
      <path d="M38 88 V44 Q60 18 82 44 V88" />
      <path d="M44 88 Q60 70 76 88" />
      {[[24, 36], [96, 36], [20, 60], [100, 60], [60, 14]].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="6" className={styles.leaf} />
      ))}
    </g>
  ),
  fan: (
    <g>
      <path d="M60 84 L14 40 Q60 0 106 40 Z" />
      {[24, 36, 48, 60, 72, 84, 96].map((x) => (
        <path key={x} d={`M60 84 L${x} ${x === 60 ? 20 : 40 - Math.abs(60 - x) / 3}`} />
      ))}
      <path d="M22 44 Q60 14 98 44" className={styles.lace} />
      <circle cx="60" cy="84" r="3" />
    </g>
  ),
}

export default function EventVignette({ name, className = '' }) {
  return (
    <svg viewBox="0 0 120 92" className={`${styles.vignette} ${className}`} aria-hidden="true" focusable="false">
      {drawings[name]}
    </svg>
  )
}
