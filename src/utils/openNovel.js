import { scrollToSection } from './scrollToSection.js'

export const OPEN_NOVEL_EVENT = 'ja:abrir-romance'

/**
 * Opens a novel in Sala I from anywhere on the page: the explorer listens
 * for this event, selects the book, and focus lands on its spine.
 */
export function openNovel(id) {
  window.dispatchEvent(new CustomEvent(OPEN_NOVEL_EVENT, { detail: { id } }))
  scrollToSection('romances')
  requestAnimationFrame(() => document.getElementById(`lombada-${id}`)?.focus({ preventScroll: true }))
}
