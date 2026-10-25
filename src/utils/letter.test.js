import { describe, expect, it } from 'vitest'
import { MESSAGE_LIMIT, closings, occasions, openings, tones } from '../data/letterTemplates.js'
import { composeLetter, formatLetterDate, letterFilename } from './letter.js'

const date = new Date(2026, 9, 25)

describe('templates', () => {
  it('cover every tone × occasion combination', () => {
    occasions.forEach((o) => tones.forEach((t) => expect(openings[o.id][t.id]).toMatch(/\.$/)))
    tones.forEach((t) => expect(closings[t.id]).toBeTruthy())
  })
})

describe('composeLetter', () => {
  const fields = { recipient: '  Miss   Bennet ', address: 'a', tone: 'formal', occasion: 'convite', message: 'Venha.', signature: 'F. Darcy', place: 'Pemberley' }

  it('builds dateline, salutation, paragraphs, closing and signature', () => {
    const l = composeLetter(fields, date)
    expect(l.dateline).toBe('Pemberley, 25 de outubro de 2026')
    expect(l.salutation).toBe('Ex.ma Miss Bennet,')
    expect(l.paragraphs).toEqual(['Tenho a honra de a convidar a comparecer na reunião que se realizará em breve, em data a confirmar por mensageiro.', 'Venha.'])
    expect(l.closing).toBe(closings.formal)
    expect(l.signature).toBe('F. Darcy')
    expect(l.monogram).toBe('F')
  })

  it('produces plain text in reading order', () => {
    const lines = composeLetter(fields, date).plainText.split('\n')
    expect(lines[0]).toBe('Pemberley, 25 de outubro de 2026')
    expect(lines[2]).toBe('Ex.ma Miss Bennet,')
    expect(lines.at(-1)).toBe('F. Darcy')
  })

  it('falls back on unknown tone/occasion and empty fields', () => {
    const l = composeLetter({ tone: 'zangado', occasion: 'xyz' }, date)
    expect(l.salutation).toBe('Estimadíssimo Destinatário,')
    expect(l.paragraphs).toEqual([openings.desculpas.ironico])
    expect(l.signature).toBe('Alguém que o estima')
    expect(l.dateline.startsWith('Longbourn,')).toBe(true)
  })

  it(`caps the personal message at ${MESSAGE_LIMIT} characters`, () => {
    const l = composeLetter({ ...fields, message: 'x'.repeat(MESSAGE_LIMIT + 50) }, date)
    expect(l.paragraphs[1]).toHaveLength(MESSAGE_LIMIT)
  })

  it('takes the monogram from the first letter, ignoring punctuation and accents', () => {
    expect(composeLetter({ signature: '— Élinor' }, date).monogram).toBe('É')
    expect(composeLetter({ signature: '123' }, date).monogram).toBe('J')
  })
})

describe('gender agreement', () => {
  it('never leaves template tokens or slashes in any combination', () => {
    for (const address of ['a', 'o'])
      for (const t of tones)
        for (const o of occasions) {
          const text = composeLetter({ recipient: 'Anne', address, tone: t.id, occasion: o.id, message: 'Olá.' }, date).plainText
          expect(text).not.toMatch(/[{}]|\/a\b|o\/a/)
        }
  })

  it('agrees with the chosen form of address', () => {
    expect(composeLetter({ recipient: 'Anne', address: 'a', tone: 'afetuoso' }, date).salutation).toBe('Querida Anne,')
    expect(composeLetter({ recipient: 'Frederick', address: 'o', tone: 'afetuoso' }, date).salutation).toBe('Querido Frederick,')
  })
})

describe('helpers', () => {
  it('formats dates in European Portuguese', () => {
    expect(formatLetterDate(new Date(1813, 0, 28))).toBe('28 de janeiro de 1813')
  })

  it('builds safe filenames', () => {
    expect(letterFilename('Mr. Darcy')).toBe('carta-para-mr-darcy.txt')
    expect(letterFilename('Senhora D. Inês Conceição')).toBe('carta-para-senhora-d-ines-conceicao.txt')
    expect(letterFilename('   ')).toBe('carta-da-regencia.txt')
  })
})
