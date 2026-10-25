import { useSyncExternalStore } from 'react'

/**
 * Subscribes to a CSS media query. Returns false during SSR / unsupported envs.
 * @param {string} query e.g. '(min-width: 900px)'
 */
export function useMediaQuery(query) {
  return useSyncExternalStore(
    (onChange) => {
      if (typeof window === 'undefined' || !window.matchMedia) return () => {}
      const mql = window.matchMedia(query)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    () => (typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(query).matches : false),
    () => false,
  )
}

/** True on devices with a precise pointer that can hover (mouse, trackpad). */
export function useFinePointer() {
  return useMediaQuery('(hover: hover) and (pointer: fine)')
}
