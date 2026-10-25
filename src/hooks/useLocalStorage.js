import { useEffect, useState } from 'react'

/**
 * useState mirrored to localStorage. Storage can be missing or refused
 * (private windows, sandboxed frames), so every access is guarded and the
 * component keeps working with in-memory state.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored ? { ...initialValue, ...JSON.parse(stored) } : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* storage unavailable: the draft simply isn't remembered */
    }
  }, [key, value])

  return [value, setValue]
}
