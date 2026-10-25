import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Copies text with the async Clipboard API, falling back to a hidden
 * textarea + execCommand where the API is missing or refused.
 * `status` is 'idle' | 'copied' | 'error' and resets after `resetAfter` ms.
 */
export function useClipboard(resetAfter = 2400) {
  const [status, setStatus] = useState('idle')
  const timer = useRef(0)

  useEffect(() => () => clearTimeout(timer.current), [])

  const settle = useCallback(
    (next) => {
      setStatus(next)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setStatus('idle'), resetAfter)
      return next === 'copied'
    },
    [resetAfter],
  )

  const copy = useCallback(
    async (text) => {
      try {
        if (!navigator.clipboard?.writeText) throw new Error('Clipboard API unavailable')
        await navigator.clipboard.writeText(text)
        return settle('copied')
      } catch {
        try {
          const area = document.createElement('textarea')
          area.value = text
          area.setAttribute('readonly', '')
          area.style.position = 'fixed'
          area.style.opacity = '0'
          document.body.appendChild(area)
          area.select()
          const ok = document.execCommand('copy')
          area.remove()
          return settle(ok ? 'copied' : 'error')
        } catch {
          return settle('error')
        }
      }
    },
    [settle],
  )

  return { copy, status }
}
