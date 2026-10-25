import { closings, letterDefaults, openings, salutations, MESSAGE_LIMIT } from '../data/letterTemplates.js'

const MONTHS = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']

/** "25 de outubro de 2026" */
export function formatLetterDate(date = new Date()) {
  return `${date.getDate()} de ${MONTHS[date.getMonth()]} de ${date.getFullYear()}`
}

const clean = (s) => String(s ?? '').replace(/\s+/g, ' ').trim()

/**
 * Turns the studio fields into a structured letter.
 * Unknown tones or occasions fall back to the defaults, empty fields to
 * readable placeholders, and the personal message is capped at MESSAGE_LIMIT.
 */
export function composeLetter(fields, date = new Date()) {
  const tone = salutations[fields?.tone] ? fields.tone : letterDefaults.tone
  const occasion = openings[fields?.occasion] ? fields.occasion : letterDefaults.occasion
  const recipient = clean(fields?.recipient) || 'Destinatário'
  const g = fields?.address === 'a' ? 'a' : 'o'
  const fill = (text) => text.replaceAll('{r}', recipient).replaceAll('{g}', g)
  const signature = clean(fields?.signature) || `Alguém que ${g} estima`
  const place = clean(fields?.place) || letterDefaults.place
  const message = clean(fields?.message).slice(0, MESSAGE_LIMIT)

  const letter = {
    dateline: `${place}, ${formatLetterDate(date)}`,
    salutation: fill(salutations[tone]),
    paragraphs: [fill(openings[occasion][tone]), message].filter(Boolean),
    closing: closings[tone],
    signature,
    monogram: signature.replace(/[^\p{L}]/gu, '').charAt(0).toUpperCase() || 'J',
  }

  letter.plainText = [letter.dateline, '', letter.salutation, '', ...letter.paragraphs.flatMap((p) => [p, '']), letter.closing, letter.signature].join('\n')
  return letter
}

/** Safe filename for the .txt download: "carta-para-mr-darcy.txt" */
export function letterFilename(recipient) {
  const slug = clean(recipient)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40)
  return `carta-${slug ? `para-${slug}` : 'da-regencia'}.txt`
}
