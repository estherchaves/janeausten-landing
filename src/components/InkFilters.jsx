/**
 * Shared SVG filters, mounted once at the root of the app.
 *  - #ink-wobble: displaces strokes slightly so CSS borders read as pen lines.
 *  - #watercolor: frays the edges of a soft gradient into a pigment bloom.
 * Apply with `filter: url(#ink-wobble)` on decorative layers only, never on text.
 */
export default function InkFilters() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        <filter id="ink-wobble" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="watercolor" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="4" seed="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="70" xChannelSelector="R" yChannelSelector="G" result="frayed" />
          <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="2" seed="11" result="grain" />
          <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.4 1.25" result="pores" />
          <feComposite in="frayed" in2="pores" operator="in" />
        </filter>
      </defs>
    </svg>
  )
}
