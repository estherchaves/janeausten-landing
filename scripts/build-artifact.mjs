/**
 * Packs the Vite build (dist/) into a single self-contained HTML page for
 * preview hosting: CSS and JS are inlined; other assets (images, favicon)
 * are copied next to it and referenced relatively.
 *
 * Usage: npm run build:artifact  →  preview/index.html + preview/assets/*
 */
import { cpSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const dist = 'dist'
const out = 'preview'
const html = readFileSync(join(dist, 'index.html'), 'utf8')

const pick = (re) => [...html.matchAll(re)].map((m) => m[1])
const cssFiles = pick(/<link rel="stylesheet"[^>]*href="\.\/([^"]+\.css)"/g)
const jsFiles = pick(/<script type="module"[^>]*src="\.\/([^"]+\.js)"/g)
const fontLinks = pick(/(<link\s+rel="stylesheet"\s+href="https:\/\/fonts\.googleapis\.com[^>]*>)/g)
const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? 'Jane Austen'

const css = cssFiles.map((f) => readFileSync(join(dist, f), 'utf8')).join('\n')
const js = jsFiles
  .map((f) => readFileSync(join(dist, f), 'utf8'))
  .join('\n')
  .replace(/<\/script/gi, '<\\/script')
  // Vite resolves assets relative to the JS file (dist/assets/). Once the JS
  // is inlined, import.meta.url is the page itself, so add the folder back.
  .replace(/new URL\(`(?!assets\/)([^`]+)`,import\.meta\.url\)/g, 'new URL(`assets/$1`,import.meta.url)')

rmSync(out, { recursive: true, force: true })
mkdirSync(join(out, 'assets'), { recursive: true })
for (const f of readdirSync(join(dist, 'assets'))) {
  if (!/\.(js|css)$/.test(f)) cpSync(join(dist, 'assets', f), join(out, 'assets', f))
}

const page = `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${title}</title>
<meta name="claude:viewport-fit-sides" content="cover">
<script>document.documentElement.lang = 'pt-PT'</script>
${fontLinks.join('\n')}
<style>${css}</style>
<div id="root"></div>
<script type="module">${js}</script>
`
writeFileSync(join(out, 'index.html'), page)
console.log(`preview/index.html  ${(page.length / 1024).toFixed(1)} kB`)
