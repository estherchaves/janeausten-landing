import { useState } from 'react'
import { literaryThemes } from '../../data/literaryThemes.js'
import BotanicalSprig from '../BotanicalSprig.jsx'
import EditorialHeading from '../EditorialHeading.jsx'
import ThemeChapter from './ThemeChapter.jsx'
import styles from './ThemeArchive.module.css'

/**
 * Sala V. Six short thematic chapters in an editorial accordion. Several can
 * be open at once, so a reader can compare two themes side by side in the
 * scroll. The first chapter starts open, to show what lies inside.
 */
export default function ThemeArchive() {
  const [open, setOpen] = useState(() => new Set([literaryThemes[0].id]))
  const allOpen = open.size === literaryThemes.length

  const toggle = (id) =>
    setOpen((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const toggleAll = () => setOpen(allOpen ? new Set() : new Set(literaryThemes.map((t) => t.id)))

  return (
    <section id="arquivo" className={`chapter paper ${styles.room}`} aria-labelledby="arquivo-title">
      <BotanicalSprig className={styles.sprig} leaves={12} />
      <div className="container">
        <div className={styles.intro}>
          <EditorialHeading
            id="arquivo-title"
            eyebrow="Sala V · O arquivo"
            lines={['Por detrás', { text: 'da prosa', italic: true, indent: 2 }]}
          />
          <div className={styles.introCopy}>
            <p className={styles.lead}>
              Dinheiro, casamento, reputação, classe, inteligência e sentimento. Seis capítulos curtos sobre aquilo de
              que os romances falam quando parecem falar só de bailes.
            </p>
            <p className="caption">
              Cada capítulo termina com uma passagem conferida no texto original, em domínio público. As traduções são
              nossas.
            </p>
            <button type="button" className={`btn btn--quiet ${styles.all}`} onClick={toggleAll}>
              {allOpen ? 'Fechar todos os capítulos' : 'Abrir todos os capítulos'}
            </button>
          </div>
        </div>

        <ol className={styles.list}>
          {literaryThemes.map((theme) => (
            <ThemeChapter key={theme.id} theme={theme} open={open.has(theme.id)} onToggle={() => toggle(theme.id)} />
          ))}
        </ol>
      </div>
    </section>
  )
}
