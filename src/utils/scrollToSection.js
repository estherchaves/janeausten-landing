/**
 * Scrolls to a section by id, respecting reduced motion, and moves keyboard
 * focus to it so screen-reader and keyboard users land where they asked to go.
 */
export function scrollToSection(id) {
  const target = document.getElementById(id)
  if (!target) return
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
  target.focus({ preventScroll: true })
  try {
    history.replaceState(null, '', `#${id}`)
  } catch {
    /* sandboxed frames may refuse history updates; scrolling still works */
  }
}
