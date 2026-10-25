import { m, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { images } from '../data/images.js'
import { useFinePointer } from '../hooks/useMediaQuery.js'
import { scrollToSection } from '../utils/scrollToSection.js'
import BotanicalSprig from './BotanicalSprig.jsx'
import OrnamentalRule from './OrnamentalRule.jsx'
import WatercolorWash from './WatercolorWash.jsx'
import styles from './Hero.module.css'

const ease = [0.22, 1, 0.36, 1]

/*
 * Entrance choreography (≈1.8 s, never blocks reading or scrolling):
 *   0.00  paper veil lifts, washes bloom
 *   0.25  "Jane" is written on, left to right
 *   0.55  "Austen" follows
 *   0.90  ornamental rule draws, tagline settles
 *   1.10  portrait uncovers; margin notes appear
 */
const write = (delay) => ({
  initial: { clipPath: 'inset(-20% 100% -20% -15%)' },
  animate: { clipPath: 'inset(-20% -15% -20% -15%)' },
  transition: { duration: 1.1, delay, ease },
})

const rise = (delay) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease },
})

export default function Hero() {
  const reduce = useReducedMotion()
  const fine = useFinePointer()
  const parallax = fine && !reduce
  const portrait = images.portrait
  // With reduced motion everything is simply present: no veil, no write-on
  const w = (delay) => (reduce ? {} : write(delay))
  const r = (delay) => (reduce ? {} : rise(delay))

  // Pointer position relative to the hero centre, -1…1
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 60, damping: 18 })
  const sy = useSpring(py, { stiffness: 60, damping: 18 })
  const imgX = useTransform(sx, (v) => v * 10)
  const imgY = useTransform(sy, (v) => v * 8)
  const sprigX = useTransform(sx, (v) => v * -18)
  const sprigY = useTransform(sy, (v) => v * -12)
  const washX = useTransform(sx, (v) => v * 6)

  const onPointerMove = (e) => {
    if (!parallax) return
    const r = e.currentTarget.getBoundingClientRect()
    px.set(((e.clientX - r.left) / r.width) * 2 - 1)
    py.set(((e.clientY - r.top) / r.height) * 2 - 1)
  }
  const onPointerLeave = () => {
    px.set(0)
    py.set(0)
  }

  return (
    <section
      id="inicio"
      className={`${styles.hero} paper`}
      aria-labelledby="hero-title"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {!reduce && (
      <m.span
        className={styles.veil}
        aria-hidden="true"
        initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        animate={{ clipPath: 'inset(0% 0% 100% 0%)' }}
        transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
      />
      )}

      <m.div className={styles.washes} style={{ x: washX }} aria-hidden="true" {...r(0.1)}>
        <WatercolorWash color="var(--c-leaf)" opacity={0.5} className={styles.washLeaf} />
        <WatercolorWash color="var(--c-blush)" opacity={0.45} className={styles.washBlush} />
        <WatercolorWash color="var(--c-porcelain)" opacity={0.3} className={styles.washBlue} />
      </m.div>

      <div className={`container ${styles.grid}`}>
        <m.p className={`eyebrow ${styles.meta}`} {...r(0.2)}>
          <span>Arquivo literário · 1775</span>
          <span className={styles.metaRight}>Steventon, Hampshire · Winchester, 1817</span>
        </m.p>

        <div className={styles.copy}>
          <h1 id="hero-title" className={styles.title}>
            <m.span className={styles.jane} {...w(0.25)}>
              Jane
            </m.span>
            <m.span className={styles.austen} {...w(0.55)}>
              Austen
            </m.span>
          </h1>

          <div className={styles.rule}>
            <OrnamentalRule draw />
          </div>

          <m.p className={styles.tagline} {...r(0.95)}>
            «Observava tudo.
            <br />
            <em>Perdoava quase nada.</em>»
          </m.p>

          <m.p className={styles.intro} {...r(1.05)}>
            Escreveu sobre o casamento, o dinheiro, a classe social e as convenções com uma precisão que nenhum baile
            conseguia disfarçar. Em seis romances, transformou as salas de visitas de província numa literatura que
            continua a reconhecer-nos.
          </m.p>

          <m.div className={styles.actions} {...r(1.15)}>
            <a className="btn" href="#romances" onClick={(e) => (e.preventDefault(), scrollToSection('romances'))}>
              Entrar no arquivo <ArrowRight aria-hidden="true" />
            </a>
            <a
              className={`link ${styles.secondary}`}
              href="#questionario"
              onClick={(e) => (e.preventDefault(), scrollToSection('questionario'))}
            >
              Que heroína és tu?
            </a>
          </m.div>
        </div>

        <m.figure
          className={styles.figure}
          {...(reduce
            ? {}
            : {
                initial: { clipPath: 'inset(100% -40% -20% -40%)' },
                animate: { clipPath: 'inset(-20% -40% -20% -40%)' },
                transition: { duration: 1.2, delay: 0.5, ease },
              })}
        >
          <div className={styles.frame} data-cursor="Retrato">
            <m.img
              src={portrait.src}
              srcSet={portrait.srcSet}
              sizes="(max-width: 760px) 78vw, 34vw"
              width={portrait.width}
              height={portrait.height}
              alt={portrait.alt}
              className={styles.portrait}
              style={{ x: imgX, y: imgY, scale: 1.06 }}
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <m.div className={styles.sprigWrap} style={{ x: sprigX, y: sprigY }} aria-hidden="true">
            <BotanicalSprig leaves={15} />
          </m.div>
          <figcaption className={`caption ${styles.caption}`}>
            <span className={styles.captionNo}>Fig. 1</span>
            {portrait.caption}. Gravura colorida, 1873. Domínio público.
          </figcaption>
        </m.figure>

        <m.span className={`annotation ${styles.noteBirth}`} aria-hidden="true" {...r(1.3)}>
          nasceu a 16 de dezembro de 1775
        </m.span>
        <m.span className={`annotation ${styles.noteNovels}`} aria-hidden="true" {...r(1.45)}>
          seis romances, nenhum com o seu nome na folha de rosto
        </m.span>

        <m.button
          type="button"
          className={styles.cue}
          onClick={() => scrollToSection('prologo')}
          {...r(1.5)}
        >
          <span className={styles.cueLine} aria-hidden="true" />
          <span>Explorar</span>
          <ArrowDown aria-hidden="true" />
        </m.button>
      </div>
    </section>
  )
}
