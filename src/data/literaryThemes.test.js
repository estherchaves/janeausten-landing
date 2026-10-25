import { describe, expect, it } from 'vitest'
import { literaryThemes } from './literaryThemes.js'
import { novelById } from './novels.js'

describe('literaryThemes', () => {
  it('has six chapters with unique ids and numerals', () => {
    expect(literaryThemes).toHaveLength(6)
    expect(new Set(literaryThemes.map((t) => t.id)).size).toBe(6)
    expect(literaryThemes.map((t) => t.numeral)).toEqual(['I', 'II', 'III', 'IV', 'V', 'VI'])
  })

  it('links only to novels that exist in the explorer', () => {
    for (const t of literaryThemes) {
      expect(t.novels.length).toBeGreaterThan(0)
      for (const n of t.novels) expect(novelById[n.id], `${t.id} → ${n.id}`).toBeDefined()
      expect(novelById[t.reference.novel], t.id).toBeDefined()
    }
  })

  it('gives every reference an original, a translation, a speaker and a chapter', () => {
    for (const { reference: r } of literaryThemes) {
      expect(r.original.length).toBeGreaterThan(10)
      expect(r.translation.length).toBeGreaterThan(10)
      expect(r.speaker).toBeTruthy()
      expect(Number.isInteger(r.chapter) && r.chapter > 0).toBe(true)
    }
  })

  it('fills every part of a chapter', () => {
    for (const t of literaryThemes) {
      expect(t.body.length).toBeGreaterThan(0)
      expect(t.today).toBeTruthy()
      expect(t.dek).toBeTruthy()
      expect(t.tone).toMatch(/^var\(--c-/)
    }
  })
})
