import WaxSeal from '../WaxSeal.jsx'
import styles from './LetterPreview.module.css'

/** The letter itself: paper, drop cap, signature and seal. Also the print layout. */
export default function LetterPreview({ letter }) {
  const [first, ...rest] = letter.paragraphs
  return (
    <article className={`${styles.paper} carta-impressao`} aria-label="Pré-visualização da carta">
      <p className={styles.dateline}>{letter.dateline}</p>
      <p className={styles.salutation}>{letter.salutation}</p>
      {first && (
        <p className={styles.body}>
          <span className={styles.dropcap} aria-hidden="true">
            {first.charAt(0)}
          </span>
          <span className="visually-hidden">{first.charAt(0)}</span>
          {first.slice(1)}
        </p>
      )}
      {rest.map((p, i) => (
        <p key={i} className={styles.body}>
          {p}
        </p>
      ))}
      <div className={styles.signoff}>
        <p className={styles.closing}>{letter.closing}</p>
        <p className={styles.signature}>{letter.signature}</p>
      </div>
      <span className={styles.seal}>
        <WaxSeal monogram={letter.monogram} size={84} label={`Selo de cera com a inicial ${letter.monogram}`} />
      </span>
    </article>
  )
}
