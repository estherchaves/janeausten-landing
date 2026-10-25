import styles from './BotanicalSprig.module.css'

/**
 * A pen-and-wash branch, generated rather than hand-traced: leaves are placed
 * along a cubic curve, alternating sides, each with a watercolour fill and an
 * ink outline. Deterministic, so it renders identically on every visit.
 */
const LEAF = 'M0 0 C 6 -9, 22 -11, 34 0 C 22 11, 6 9, 0 0 Z'

function point(t, [p0, p1, p2, p3]) {
  const u = 1 - t
  const x = u ** 3 * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t ** 3 * p3[0]
  const y = u ** 3 * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t ** 3 * p3[1]
  return [x, y]
}

export default function BotanicalSprig({ className = '', leaves = 14, sway = true }) {
  const curve = [
    [10, 20],
    [120, 0],
    [180, 140],
    [300, 210],
  ]
  const stem = `M${curve[0]} C${curve[1]} ${curve[2]} ${curve[3]}`
  const items = Array.from({ length: leaves }, (_, i) => {
    const t = 0.08 + (i / leaves) * 0.9
    const [x, y] = point(t, curve)
    const [nx, ny] = point(Math.min(t + 0.01, 1), curve)
    const tangent = (Math.atan2(ny - y, nx - x) * 180) / Math.PI
    const side = i % 2 === 0 ? -1 : 1
    const scale = 0.55 + 0.5 * Math.sin(Math.PI * t)
    return { x, y, rotate: tangent + side * 52, scale, tone: i % 3 }
  })

  return (
    <svg
      className={`${styles.sprig} ${sway ? 'sway' : ''} ${className}`}
      viewBox="0 0 320 240"
      aria-hidden="true"
      focusable="false"
    >
      <path className={styles.stem} d={stem} />
      {items.map((l) => (
        <g key={`${l.x.toFixed(1)}-${l.y.toFixed(1)}`} transform={`translate(${l.x} ${l.y}) rotate(${l.rotate}) scale(${l.scale})`}>
          <path className={`${styles.leaf} ${styles[`tone${l.tone}`]}`} d={LEAF} />
          <path className={styles.vein} d="M2 0 H28" />
        </g>
      ))}
    </svg>
  )
}
