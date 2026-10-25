import { useState } from 'react'
import { ArrowRight, Copy, Feather } from 'lucide-react'
import BookSpineStack from '../components/BookSpineStack.jsx'
import BotanicalSprig from '../components/BotanicalSprig.jsx'
import WatercolorWash from '../components/WatercolorWash.jsx'
import EditorialHeading from '../components/EditorialHeading.jsx'
import OrnamentalRule from '../components/OrnamentalRule.jsx'
import WaxSeal from '../components/WaxSeal.jsx'
import { novels } from '../data/novels.js'
import { sections } from '../data/sections.js'
import styles from './DesignSystem.module.css'

/**
 * Phase 1 deliverable: the living style sheet of the identity.
 * It renders the real tokens and components, so it doubles as a visual
 * regression page for later phases.
 */

const palette = [
  { name: 'Marfim quente', hex: '#F5F0E7', token: '--c-ivory', role: 'Superfície principal', share: 46, ink: false },
  { name: 'Preto-tinta', hex: '#191716', token: '--c-ink', role: 'Texto e capítulos escuros', share: 30, ink: true },
  { name: 'Bordô profundo', hex: '#501C2B', token: '--c-burgundy', role: 'Contraste dramático', share: 14, ink: true },
  { name: 'Rosa antigo', hex: '#C9A2A0', token: '--c-rose', role: 'Acento sobre tinta', share: 4, ink: false },
  { name: 'Verde-sálvia', hex: '#87927B', token: '--c-sage', role: 'Botânica, Razão e Sensibilidade', share: 4, ink: false },
  { name: 'Dourado envelhecido', hex: '#B59A65', token: '--c-gold', role: 'Só detalhes: filetes, losangos', share: 2, ink: false },
]

const illustration = [
  { name: 'Folha ao sol', hex: '#9DB57A', token: '--c-leaf' },
  { name: 'Porcelana', hex: '#7D93B2', token: '--c-porcelain' },
  { name: 'Chita rosa', hex: '#E2B7B0', token: '--c-blush' },
  { name: 'Menta pintada', hex: '#A9C7B8', token: '--c-mint' },
  { name: 'Ocre', hex: '#DCA35A', token: '--c-ochre' },
  { name: 'Ardósia', hex: '#5B6577', token: '--c-slate' },
]

const typeScale = [
  { token: '--fs-signature', label: 'Assinatura', sample: 'Jane Austen', className: 'signature' },
  { token: '--fs-mega', label: 'Mega', sample: 'Austen', className: 'mega' },
  { token: '--fs-h1', label: 'H1', sample: 'Reputação', className: 'h1' },
  { token: '--fs-h2', label: 'H2', sample: 'Primeiras impressões', className: 'h2' },
  { token: '--fs-h3', label: 'H3', sample: 'Uma herança, um baile', className: 'h3' },
  { token: '--fs-lead', label: 'Lead', sample: 'Uma frase aparentemente inocente podia mudar tudo.', className: 'lead' },
  { token: '--fs-body', label: 'Corpo', sample: 'Texto corrido em DM Sans, com medida de cerca de 62 caracteres por linha.', className: 'body' },
]

export default function DesignSystem() {
  const [novelId, setNovelId] = useState('pride')
  const novel = novels.find((n) => n.id === novelId)

  return (
    <main id="conteudo" className={styles.page}>
      {/* --- Cover -------------------------------------------------------- */}
      <section className={`${styles.cover} paper`} aria-labelledby="ds-title">
        <WatercolorWash color="var(--c-leaf)" opacity={0.55} className={styles.washLeaf} />
        <WatercolorWash color="var(--c-blush)" opacity={0.5} className={styles.washBlush} />
        <WatercolorWash color="var(--c-porcelain)" opacity={0.32} className={styles.washBlue} />
        <BotanicalSprig className={styles.sprigLeft} leaves={16} />
        <BotanicalSprig className={styles.sprigRight} leaves={11} />
        <div className={`container ${styles.coverGrid}`}>
          <p className={`eyebrow ${styles.coverMeta}`}>
            <span>Arquivo literário · 1775</span>
            <span>Folha de estilo · Fase 1</span>
          </p>

          <h1 id="ds-title" className={styles.coverTitle}>
            <span className={styles.coverJane}>Jane</span>
            <span className={styles.coverAusten}>Austen</span>
          </h1>

          <div className={styles.coverAside}>
            <p className={styles.coverQuote}>
              Observava tudo.
              <br />
              <em>Perdoava quase nada.</em>
            </p>
            <OrnamentalRule draw />
            <p className="caption">
              Sistema de design da experiência: cor, tipografia, ritmo, componentes e os seis mundos dos
              romances. Tudo nesta página é renderizado a partir dos tokens reais do projeto.
            </p>
          </div>

          <span className={`annotation ${styles.coverNote}`} aria-hidden="true">
            a tinta, o papel, o bordô
          </span>
        </div>
      </section>

      {/* --- Palette ------------------------------------------------------- */}
      <section className="chapter" aria-labelledby="ds-palette">
        <div className="container">
          <EditorialHeading
            id="ds-palette"
            eyebrow="01 · Cor"
            lines={['Marfim e tinta', { text: 'dominam.', italic: true, indent: 2 }, { text: 'O bordô interrompe.', indent: 1, accent: true }]}
          />

          <div className={styles.proportion} role="img" aria-label="Proporção de uso das cores: marfim 46%, tinta 30%, bordô 14%, rosa 4%, sálvia 4%, dourado 2%">
            {palette.map((c) => (
              <span key={c.hex} style={{ flexGrow: c.share, background: c.hex }} />
            ))}
          </div>
          <p className={`caption ${styles.proportionCaption}`}>Proporção de uso pretendida em cada ecrã.</p>

          <ul className={styles.swatches}>
            {palette.map((c) => (
              <li key={c.hex} className={styles.swatch}>
                <span
                  className={styles.chip}
                  style={{ background: c.hex, color: c.ink ? '#F5F0E7' : '#191716' }}
                >
                  <span className="numeral">{c.share}%</span>
                </span>
                <span className={styles.swatchName}>{c.name}</span>
                <span className="caption">
                  {c.hex} · <code>{c.token}</code>
                </span>
                <span className="caption">{c.role}</span>
              </li>
            ))}
          </ul>

          <div className={styles.tones}>
            <p className="eyebrow">Tons de ilustração · só em aguarelas, lombadas e botânica</p>
            <ul className={styles.blots}>
              {illustration.map((c) => (
                <li key={c.hex} className={styles.blot}>
                  <span className={styles.blotPaint} style={{ '--wash': c.hex }} aria-hidden="true" />
                  <span className={styles.blotName}>{c.name}</span>
                  <span className="caption">
                    {c.hex} · <code>{c.token}</code>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* --- Typography ----------------------------------------------------- */}
      <section className="chapter" data-surface="ink" aria-labelledby="ds-type">
        <div className="container">
          <div className={styles.typeIntro}>
            <EditorialHeading
              id="ds-type"
              eyebrow="02 · Tipografia"
              lines={[{ text: 'A pena assina,', hand: true, accent: true }, { text: 'o Bodoni anuncia,', indent: 1 }, { text: 'o Garamond sussurra.', italic: true, indent: 2 }]}
            />
            <div className={styles.faces}>
              <div className={styles.face}>
                <span className={styles.faceSample} style={{ fontFamily: 'var(--font-hand)' }}>Aa</span>
                <span className={styles.faceName}>Pinyon Script</span>
                <span className="caption">O nome da autora na capa e anotações à margem.</span>
              </div>
              <div className={styles.face}>
                <span className={styles.faceSample} style={{ fontFamily: 'var(--font-display)' }}>Aa</span>
                <span className={styles.faceName}>Bodoni Moda</span>
                <span className="caption">Títulos, numerais, capas. Alto contraste de haste.</span>
              </div>
              <div className={styles.face}>
                <span className={styles.faceSample} style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>Aa</span>
                <span className={styles.faceName}>Cormorant Garamond</span>
                <span className="caption">Itálicos, citações, cartas, leads.</span>
              </div>
              <div className={styles.face}>
                <span className={styles.faceSample} style={{ fontFamily: 'var(--font-sans)' }}>Aa</span>
                <span className={styles.faceName}>DM Sans</span>
                <span className="caption">Interface, legendas, texto corrido.</span>
              </div>
            </div>
          </div>

          <ol className={styles.scale}>
            {typeScale.map((t) => (
              <li key={t.token} className={styles.scaleRow}>
                <span className={`caption ${styles.scaleMeta}`}>
                  {t.label}
                  <br />
                  <code>{t.token}</code>
                </span>
                <span className={`${styles.scaleSample} ${styles[t.className]}`}>{t.sample}</span>
              </li>
            ))}
          </ol>
          <p className={`caption ${styles.licence}`}>
            Todas as famílias são distribuídas pelo Google Fonts sob a SIL Open Font License 1.1, que permite
            uso comercial e incorporação na web.
          </p>
        </div>
      </section>

      {/* --- Components ----------------------------------------------------- */}
      <section className="chapter paper" aria-labelledby="ds-components">
        <div className="container">
          <EditorialHeading
            id="ds-components"
            eyebrow="03 · Componentes"
            lines={['Poucos objetos,', { text: 'bem desenhados.', italic: true, indent: 2 }]}
          />

          <div className={styles.componentGrid}>
            <div className={styles.cell}>
              <p className="eyebrow">Botões</p>
              <div className={styles.row}>
                <button type="button" className="btn">
                  Explorar os romances <ArrowRight aria-hidden="true" />
                </button>
                <button type="button" className="btn btn--quiet">
                  <Copy aria-hidden="true" /> Copiar carta
                </button>
              </div>
              <p className="caption">Duas vozes apenas: decisiva e discreta. Altura mínima de 48px.</p>
            </div>

            <div className={styles.cell}>
              <p className="eyebrow">Ligações</p>
              <p className={styles.linkDemo}>
                Uma <a className="link" href="#ds-components">ligação editorial</a> e uma{' '}
                <a className="link link--reveal" href="#ds-components">ligação revelada</a> no hover.
              </p>
              <p className="caption">O sublinhado desenha-se e recolhe; o foco por teclado é sempre visível.</p>
            </div>

            <div className={styles.cell}>
              <p className="eyebrow">Filete ornamental</p>
              <OrnamentalRule draw />
              <p className="caption">Separador da casa. O losango dourado é o único ornamento recorrente.</p>
            </div>

            <div className={styles.cell}>
              <p className="eyebrow">Anotação manuscrita</p>
              <p className={styles.annotated}>
                «É uma verdade universalmente reconhecida…»
                <span className={`annotation ${styles.annotatedNote}`}>ironia, claro</span>
              </p>
              <p className="caption">Usada como comentário à margem, nunca para texto essencial.</p>
            </div>

            <div className={`${styles.cell} ${styles.sealCell}`}>
              <p className="eyebrow">Selos de cera</p>
              <div className={styles.row}>
                <WaxSeal label="Selo de cera bordô" />
                <WaxSeal tone="sage" monogram="E" size={64} label="Selo de cera verde-sálvia" />
                <WaxSeal tone="ink" monogram="A" size={52} label="Selo de cera negro" />
              </div>
              <p className="caption">Desenhados em CSS: nenhuma imagem, escala perfeita.</p>
            </div>

            <div className={`${styles.cell} ${styles.sprigCell}`}>
              <p className="eyebrow">Botânica a tinta e aguarela</p>
              <BotanicalSprig className={styles.sprigDemo} leaves={12} />
              <p className="caption">Gerada por código ao longo de uma curva. Balança ao passar o rato.</p>
            </div>

            <div className={`${styles.cell} ${styles.washCell}`}>
              <p className="eyebrow">Mancha de aguarela</p>
              <div className={styles.washDemo}>
                <WatercolorWash color="var(--c-porcelain)" opacity={0.6} style={{ inset: '6% 30% 10% 4%' }} />
                <WatercolorWash color="var(--c-blush)" opacity={0.6} style={{ inset: '18% 4% 0 38%' }} />
              </div>
              <p className="caption">Gradiente desfiado por um filtro SVG: pigmento sem imagens.</p>
            </div>

            <div className={`${styles.cell} ${styles.wideCell}`}>
              <p className="eyebrow">Campo de formulário</p>
              <div className="field">
                <label htmlFor="ds-input">Destinatário</label>
                <input id="ds-input" className="input" defaultValue="Mr. Darcy" />
              </div>
              <p className="caption">Linha única, serifada, como escrever numa folha.</p>
            </div>
          </div>

          <figure className={styles.paperCard}>
            <Feather className={styles.paperIcon} aria-hidden="true" />
            <blockquote className={styles.paperQuote}>
              Papel com grão gerado por SVG, sombra quente e margens largas: a base das cartas e dos painéis.
            </blockquote>
            <figcaption className="caption">Superfície «papel» · <code>.paper</code> + <code>--shadow-paper</code></figcaption>
          </figure>
        </div>
      </section>

      {/* --- Novel worlds --------------------------------------------------- */}
      <section className={`chapter ${styles.worldsSection}`} data-surface="mist" aria-labelledby="ds-worlds">
        <div className={`container ${styles.worldsGrid}`}>
          <div className={styles.worldsCopy}>
            <EditorialHeading
              id="ds-worlds"
              eyebrow="04 · Os seis mundos"
              lines={['Cada romance', { text: 'muda a sala.', italic: true, indent: 2 }]}
            />
            <p className={`lead ${styles.worldsLead}`}>
              A estante é o seletor. Escolha uma lombada: na Fase 3, a secção inteira adota o mundo do livro.
            </p>

            <div data-novel={novel.id} className={styles.worldCard} aria-live="polite">
              <span className={`numeral ${styles.worldYear}`}>{novel.year}</span>
              <span className={styles.worldTitle}>{novel.title}</span>
              <span className={styles.worldOriginal}>{novel.original}</span>
              <span className={styles.worldMood}>{novel.mood}</span>
              <span className={styles.worldSwatches} aria-hidden="true">
                <i style={{ background: 'var(--surface)' }} />
                <i style={{ background: 'var(--text)' }} />
                <i style={{ background: 'var(--accent)' }} />
              </span>
            </div>
          </div>

          <div className={styles.shelf}>
            <BookSpineStack novels={novels} selectedId={novelId} onSelect={setNovelId} />
            <span className={`annotation ${styles.shelfNote}`} aria-hidden="true">escolha uma</span>
          </div>
        </div>
      </section>

      {/* --- Exhibition map ------------------------------------------------- */}
      <section className="chapter paper" aria-labelledby="ds-map">
        <div className="container">
          <EditorialHeading
            id="ds-map"
            eyebrow="05 · Estrutura"
            lines={['O percurso', { text: 'da exposição.', italic: true, indent: 1 }]}
          />
          <ol className={styles.map}>
            {sections.map((s) => (
              <li key={s.id} className={styles.mapRow}>
                <span className={`numeral ${styles.mapNumeral}`}>{s.numeral}</span>
                <span className={styles.mapTitle}>{s.title}</span>
                <span className="caption">#{s.id}</span>
                <span className={`caption ${styles.mapPhase}`}>Fase {s.phase}</span>
              </li>
            ))}
          </ol>
          <p className={`caption ${styles.footnote}`}>
            Concebido e desenvolvido pela CodEst · Projeto editorial independente, sem afiliação a qualquer
            instituição associada a Jane Austen.
          </p>
        </div>
      </section>
    </main>
  )
}
