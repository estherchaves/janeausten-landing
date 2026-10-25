import { ArrowLeft, ArrowRight } from 'lucide-react'
import NovelPlate from './NovelPlate.jsx'
import styles from './NovelPanel.module.css'

/** One novel's spread: plate, story, verified quotation, and why it still matters. */
export default function NovelPanel({ novel, index, previous, next, onStep }) {
  const { quote } = novel

  return (
    <article className={styles.panel} data-layout={novel.layout}>
      <header className={styles.header}>
        <p className={`eyebrow ${styles.meta}`}>
          <span className="numeral">{novel.year}</span>
          <span>{novel.yearNote}</span>
        </p>
        <h3 className={styles.title}>{novel.title}</h3>
        {novel.original !== novel.title && <p className={styles.original}>{novel.original}</p>}
        <span className={`annotation ${styles.note}`} aria-hidden="true">
          {novel.annotation}
        </span>
      </header>

      <div className={styles.plate}>
        <NovelPlate novel={novel} index={index} />
      </div>

      <div className={styles.body}>
        <p className={styles.description}>{novel.description}</p>

        <dl className={styles.facts}>
          <div>
            <dt>Heroína</dt>
            <dd>{novel.heroine}</dd>
          </div>
          <div>
            <dt>Cenário</dt>
            <dd>{novel.setting}</dd>
          </div>
        </dl>

        <ul className={styles.themes} aria-label="Temas">
          {novel.themes.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>

      <figure className={styles.quote}>
        <blockquote>
          <p className={styles.translation}>«{quote.translation}»</p>
          <p className={styles.originalQuote} lang="en">
            “{quote.original}”
          </p>
        </blockquote>
        <figcaption className="caption">
          {quote.speaker} · {novel.original}, cap. {quote.chapter} · Tradução editorial
        </figcaption>
      </figure>

      <section className={styles.matters} aria-label="Porque continua a importar">
        <h4 className={styles.mattersTitle}>
          Porque continua <em>a importar</em>
        </h4>
        <p>{novel.whyItMatters}</p>
      </section>

      <nav className={styles.pager} aria-label="Outros romances">
        <button type="button" className="btn btn--quiet" onClick={() => onStep(-1)}>
          <ArrowLeft aria-hidden="true" />
          <span className="visually-hidden">Romance anterior: </span>
          {previous.title}
        </button>
        <button type="button" className="btn btn--quiet" onClick={() => onStep(1)}>
          <span className="visually-hidden">Romance seguinte: </span>
          {next.title}
          <ArrowRight aria-hidden="true" />
        </button>
      </nav>
    </article>
  )
}
