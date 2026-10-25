import styles from './EditorialHeading.module.css'

/**
 * Editorial heading with intentional line breaks.
 *
 * `lines` accepts strings or objects: { text, italic, hand, indent, accent }.
 * Indent is a step on the grid (0–4), used to build asymmetric compositions.
 *
 * <EditorialHeading
 *   eyebrow="Capítulo II"
 *   lines={['Os romances', { text: 'como mundos', italic: true, indent: 2 }]}
 * />
 */
export default function EditorialHeading({
  as: Tag = 'h2',
  eyebrow,
  lines,
  size = 'h2',
  align = 'start',
  id,
  className = '',
}) {
  return (
    <header className={`${styles.wrap} ${styles[align]} ${className}`}>
      {eyebrow && <p className={`eyebrow ${styles.eyebrow}`}>{eyebrow}</p>}
      <Tag id={id} className={`${styles.heading} ${styles[size]}`}>
        {lines.map((line, i) => {
          const l = typeof line === 'string' ? { text: line } : line
          return (
            <span
              key={`${i}-${l.text}`}
              className={[
                styles.line,
                l.italic && styles.italic,
                l.hand && styles.hand,
                l.accent && styles.accent,
                l.indent && styles[`indent${l.indent}`],
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {l.text}
            </span>
          )
        })}
      </Tag>
    </header>
  )
}
