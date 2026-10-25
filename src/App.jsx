import { lazy, Suspense, useEffect, useState } from 'react'
import { domAnimation, LazyMotion, MotionConfig } from 'framer-motion'
import BackToTop from './components/BackToTop.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import Footer from './components/Footer.jsx'
import Hero from './components/Hero.jsx'
import HeroineQuiz from './components/HeroineQuiz/HeroineQuiz.jsx'
import InkFilters from './components/InkFilters.jsx'
import LetterStudio from './components/LetterStudio/LetterStudio.jsx'
import Navigation from './components/Navigation.jsx'
import NovelExplorer from './components/NovelExplorer/NovelExplorer.jsx'
import Prelude from './components/Prelude.jsx'
import SocialSeason from './components/SocialSeason/SocialSeason.jsx'
import ThemeArchive from './components/ThemeArchive/ThemeArchive.jsx'

// The living style sheet is a studio tool, so it loads only when asked for.
const DesignSystem = lazy(() => import('./dev/DesignSystem.jsx'))

const STYLE_SHEET_HASH = '#folha-de-estilo'

function useHash() {
  const [hash, setHash] = useState(() => window.location.hash)
  useEffect(() => {
    const onChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return hash
}

export default function App() {
  const hash = useHash()

  if (hash === STYLE_SHEET_HASH) {
    return (
      <LazyMotion features={domAnimation} strict>
        <MotionConfig reducedMotion="user">
          <InkFilters />
          <a className="skip-link" href="#inicio">
            Voltar à exposição
          </a>
          <Suspense fallback={null}>
            <DesignSystem />
          </Suspense>
        </MotionConfig>
      </LazyMotion>
    )
  }

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <InkFilters />
        <a className="skip-link" href="#conteudo">
          Saltar para o conteúdo
        </a>
        <Navigation />
        <main id="conteudo" tabIndex={-1}>
          <Hero />
          <Prelude />
          <NovelExplorer />
          <HeroineQuiz />
          <LetterStudio />
          <SocialSeason />
          <ThemeArchive />
        </main>
        <Footer />
        <BackToTop />
        <CustomCursor />
      </MotionConfig>
    </LazyMotion>
  )
}
