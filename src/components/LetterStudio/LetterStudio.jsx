import { useEffect, useMemo, useRef, useState } from 'react'
import { Check, Copy, Download, Eraser, Printer } from 'lucide-react'
import { MESSAGE_LIMIT, addressForms, letterDefaults, occasions, tones } from '../../data/letterTemplates.js'
import { useClipboard } from '../../hooks/useClipboard.js'
import { useLocalStorage } from '../../hooks/useLocalStorage.js'
import { composeLetter, letterFilename } from '../../utils/letter.js'
import EditorialHeading from '../EditorialHeading.jsx'
import LetterPreview from './LetterPreview.jsx'
import styles from './LetterStudio.module.css'

const empty = { recipient: '', address: 'o', tone: 'afetuoso', occasion: 'contacto', message: '', signature: '', place: '' }

/**
 * Sala III. A writing desk: fields on the left, the letter composing itself
 * on the right in real time. The draft is remembered in this browser only.
 */
export default function LetterStudio() {
  const [fields, setFields] = useLocalStorage('ja-carta-rascunho', letterDefaults)
  const [notice, setNotice] = useState('')
  const { copy, status } = useClipboard()
  const letter = useMemo(() => composeLetter(fields), [fields])
  const ready = fields.recipient.trim() && fields.message.trim()

  const set = (key) => (e) => setFields((f) => ({ ...f, [key]: e.target.value }))

  // When the page runs inside a host that mediates downloads (the claude.ai
  // artifact viewer exposes window.claude.use), save through it; on the
  // public site window.claude is absent and a normal Blob download is used.
  const hostDownloads = useRef(null)
  useEffect(() => {
    let alive = true
    window.claude
      ?.use?.('downloads')
      .then((ns) => {
        if (alive) hostDownloads.current = ns
      })
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [])

  const download = async () => {
    const filename = letterFilename(fields.recipient)
    if (hostDownloads.current) {
      try {
        await hostDownloads.current.save({ filename, data: letter.plainText })
        setNotice(`Carta guardada como «${filename}».`)
      } catch (err) {
        setNotice(err?.code === 'declined' ? 'Transferência cancelada.' : 'Não foi possível guardar o ficheiro aqui. Use «Copiar texto».')
      }
      return
    }
    try {
      const blob = new Blob([letter.plainText], { type: 'text/plain;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      a.remove()
      setTimeout(() => URL.revokeObjectURL(url), 1000)
      setNotice(`Transferência de «${a.download}» iniciada. Se não aparecer, o browser bloqueou-a: use «Copiar texto».`)
    } catch {
      setNotice('Não foi possível criar o ficheiro neste browser. Use «Copiar texto».')
    }
  }

  const print = () => {
    setNotice('A abrir a impressão. Se a janela não aparecer, este ambiente não permite imprimir: use «Copiar texto».')
    window.print()
  }

  const onCopy = async () => {
    const ok = await copy(letter.plainText)
    setNotice(ok ? 'Texto da carta copiado.' : 'Não foi possível copiar. Selecione o texto da carta e copie-o manualmente.')
  }

  return (
    <section id="cartas" className={`chapter paper ${styles.room}`} aria-labelledby="cartas-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.desk}>
          <EditorialHeading
            id="cartas-title"
            eyebrow="Sala III · Estúdio de cartas"
            lines={['Uma carta', { text: 'muda tudo.', italic: true, indent: 2 }]}
          />
          <p className={styles.lead}>
            Em Austen, as cartas declaram, desmentem e reparam. Escolha o tom e a ocasião, escreva duas linhas e veja-as
            ganhar forma de carta da Regência.
          </p>

          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <div className={styles.row}>
              <div className="field">
                <label htmlFor="carta-destinatario">Destinatário</label>
                <input id="carta-destinatario" className="input" value={fields.recipient} onChange={set('recipient')} maxLength={60} placeholder="Mr. Darcy" autoComplete="off" />
              </div>
              <fieldset className={`field ${styles.inline}`}>
                <legend>Tratar por</legend>
                <div className={styles.pills}>
                  {addressForms.map((f) => (
                    <label key={f.id} className={styles.pill}>
                      <input type="radio" name="carta-tratamento" value={f.id} checked={fields.address === f.id} onChange={set('address')} />
                      <span>{f.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>

            <fieldset className="field">
              <legend>Tom</legend>
              <div className={styles.pills}>
                {tones.map((t) => (
                  <label key={t.id} className={styles.pill}>
                    <input type="radio" name="carta-tom" value={t.id} checked={fields.tone === t.id} onChange={set('tone')} />
                    <span>
                      {t.label}
                      <small>{t.hint}</small>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="field">
              <legend>Ocasião</legend>
              <div className={styles.occasions}>
                {occasions.map((o) => (
                  <label key={o.id} className={styles.occasion}>
                    <input type="radio" name="carta-ocasiao" value={o.id} checked={fields.occasion === o.id} onChange={set('occasion')} />
                    <span>{o.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="field">
              <label htmlFor="carta-mensagem">Mensagem pessoal</label>
              <textarea
                id="carta-mensagem"
                className={`input ${styles.textarea}`}
                value={fields.message}
                onChange={set('message')}
                maxLength={MESSAGE_LIMIT}
                rows={4}
                aria-describedby="carta-contador"
                placeholder="Duas ou três frases suas."
              />
              <span id="carta-contador" className={`caption ${styles.counter}`}>
                {fields.message.length} de {MESSAGE_LIMIT} caracteres
              </span>
            </div>

            <div className={styles.row}>
              <div className="field">
                <label htmlFor="carta-assinatura">Assinatura</label>
                <input id="carta-assinatura" className="input" value={fields.signature} onChange={set('signature')} maxLength={40} placeholder="E. B." autoComplete="off" />
              </div>
              <div className="field">
                <label htmlFor="carta-local">Escrita em</label>
                <input id="carta-local" className="input" value={fields.place} onChange={set('place')} maxLength={40} placeholder="Longbourn" autoComplete="off" />
              </div>
            </div>
          </form>
        </div>

        <div className={styles.previewCol}>
          <LetterPreview letter={letter} />

          <div className={styles.actions}>
            <button type="button" className="btn" onClick={onCopy} disabled={!ready}>
              {status === 'copied' ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
              {status === 'copied' ? 'Copiado' : 'Copiar texto'}
            </button>
            <button type="button" className="btn btn--quiet" onClick={download} disabled={!ready}>
              <Download aria-hidden="true" /> Descarregar .txt
            </button>
            <button type="button" className="btn btn--quiet" onClick={print} disabled={!ready}>
              <Printer aria-hidden="true" /> Imprimir
            </button>
            <button type="button" className={`link ${styles.reset}`} onClick={() => (setFields(empty), setNotice('Folha em branco. O rascunho anterior foi apagado.'))}>
              <Eraser aria-hidden="true" /> Folha em branco
            </button>
          </div>
          <p className={`caption ${styles.notice}`} role="status">
            {!ready ? 'Preencha o destinatário e a mensagem para copiar, descarregar ou imprimir.' : notice}
          </p>
          <p className={`caption ${styles.privacy}`}>
            A carta não é enviada a ninguém. O rascunho fica guardado apenas neste browser.
          </p>
        </div>
      </div>
    </section>
  )
}
