import { useEffect, useState } from 'react'

/** Page scroll progress (0–1) and whether the reader has left the first screen. */
export function useScrollProgress() {
  const [state, setState] = useState({ progress: 0, scrolled: false, pastFold: false })

  useEffect(() => {
    let frame = 0
    const measure = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const y = window.scrollY
      setState({
        progress: max > 0 ? Math.min(1, Math.max(0, y / max)) : 0,
        scrolled: y > 24,
        pastFold: y > window.innerHeight * 0.9,
      })
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }
    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return state
}
