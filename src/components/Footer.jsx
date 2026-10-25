import { ArrowUp } from 'lucide-react'
import { imageCredits } from '../data/images.js'
import { navSections } from '../data/sections.js'
import { scrollToSection } from '../utils/scrollToSection.js'
import WaxSeal from './WaxSeal.jsx'
import styles from './Footer.module.css'

/**
 * The colophon. Closes the exhibition like the last page of a volume:
 * a sign-off, the route through the rooms, sources and credits, and the
 * independence note.
 */
export default function Footer() {
  return (
    <footer className={styles.footer} data-surface="ink">
      <div className="container">
        <div className={styles.finis}>
          <p className={styles.fim} aria-hidden="true">
            Fim
          </p>
          <div className={styles.finisCopy}>
            <p className={styles.closing}>
              A exposição termina aqui. Os romances, não: continuam na estante, à espera de uma segunda leitura.
            </p>
            <div className={styles.actions}>
              <a className="btn" href="#romances">
                Voltar à estante
              </a>
              <button type="button" className="btn btn--quiet" onClick={() => scrollToSection('inicio')}>
                <ArrowUp aria-hidden="true" />
                Regressar à entrada
              </button>
            </div>
          </div>
          <span className={styles.seal}>
            <WaxSeal monogram="JA" size={104} />
          </span>
        </div>

        <div className={styles.grid}>
          <div className={styles.brand}>
            <p className={styles.script}>Jane Austen</p>
            <p className="caption">Arquivo literário · Steventon, 1775 · Winchester, 1817</p>
            <p className={styles.tagline}>
              Uma exposição digital sobre inteligência, desejo, reputação e rebeldia.
            </p>
          </div>

          <nav aria-label="Salas da exposição" className={styles.col}>
            <p className="eyebrow">Percurso</p>
            <ol className={styles.links}>
              {navSections.map((s) => (
                <li key={s.id}>
                  <span className={`numeral ${styles.linkNum}`} aria-hidden="true">
                    {s.numeral}
                  </span>
                  <a className="link link--reveal" href={`#${s.id}`}>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className={styles.col}>
            <p className="eyebrow">Fontes e créditos</p>
            <p className="caption">
              Citações conferidas nas edições originais, em domínio público, com capítulo indicado. Traduções
              editoriais da CodEst. As cartas, os convites e as cenas da temporada social são ficção original.
            </p>
            {imageCredits.map((c) => (
              <p key={c.url} className="caption">
                Imagem: {c.work}. {c.author}. {c.licence}. Fonte:{' '}
                <a className="link" href={c.url} target="_blank" rel="noreferrer">
                  {c.source}
                  <span className="visually-hidden"> (abre num novo separador)</span>
                </a>
                .
              </p>
            ))}
            <p className="caption">
              Tipografia: Pinyon Script, Bodoni Moda, Cormorant Garamond e DM Sans, via Google Fonts, sob a SIL Open
              Font License 1.1. Ilustrações originais em CSS e SVG.
            </p>
          </div>

          <div className={styles.col}>
            <p className="eyebrow">Nota de independência</p>
            <p className="caption">
              Projeto editorial independente, sem afiliação a qualquer instituição, herdeiro, editora, adaptação ou
              detentor de propriedade intelectual associado a Jane Austen. Nenhuma imagem de filmes ou séries foi usada.
            </p>
            <p className="caption">
              <a className="link link--reveal" href="#folha-de-estilo">
                Folha de estilo do projeto
              </a>
            </p>
          </div>
        </div>

        <p className={styles.legal}>
          <span>Concebido e desenvolvido pela CodEst</span>
          <span className={styles.made}>Feito com React, Vite e Framer Motion</span>
        </p>
      </div>
    </footer>
  )
}
