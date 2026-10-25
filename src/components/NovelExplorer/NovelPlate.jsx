import BotanicalSprig from '../BotanicalSprig.jsx'
import WatercolorWash from '../WatercolorWash.jsx'
import WaxSeal from '../WaxSeal.jsx'
import styles from './NovelPlate.module.css'

/**
 * The "main image" of each novel: an original pen-and-wash plate drawn in
 * SVG, so the explorer never depends on film stills or uncertain licences.
 * Every drawing refers to a concrete moment or place in the book.
 */

const wave = (y, amp = 6, len = 30) => {
  let d = `M-10 ${y}`
  for (let x = -10; x < 310; x += len) d += ` q ${len / 4} ${-amp} ${len / 2} 0 t ${len / 2} 0`
  return d
}

const drawings = {
  // Pride and Prejudice: Darcy's letter, folded and addressed
  letter: (
    <g>
      <g transform="rotate(-7 150 200)">
        <rect x="52" y="104" width="196" height="232" className={styles.paper} />
        <path d="M52 181 H248 M52 258 H248" className={styles.fold} />
        {[124, 140, 156, 200, 216, 232, 276, 292, 308].map((y, i) => (
          <path key={y} d={`M70 ${y} q 20 -3 40 0 t 40 0 t 40 0 t ${i % 3 === 2 ? 10 : 40} 0`} className={styles.script} />
        ))}
      </g>
      <text x="150" y="70" textAnchor="middle" className={styles.hand}>
        Miss Elizabeth Bennet
      </text>
    </g>
  ),

  // Sense and Sensibility: two sisters, two temperaments
  sisters: (
    <g>
      <ellipse cx="104" cy="190" rx="50" ry="66" className={styles.cameo} />
      <ellipse cx="196" cy="206" rx="50" ry="66" className={styles.cameo} />
      <text x="104" y="194" textAnchor="middle" className={styles.label}>
        RAZÃO
      </text>
      <text x="196" y="210" textAnchor="middle" className={styles.label}>
        SENSIBILIDADE
      </text>
      <text x="96" y="290" textAnchor="middle" className={styles.hand}>
        Elinor
      </text>
      <text x="204" y="306" textAnchor="middle" className={styles.hand}>
        Marianne
      </text>
    </g>
  ),

  // Emma: the matchmaker's map of Highbury, with her mistakes crossed out
  matchmaking: (
    <g>
      <path d="M70 118 C 120 70, 170 84, 196 128" className={styles.plan} />
      <path d="M128 92 l10 -10 M128 82 l10 10" className={styles.cross} />
      <path d="M70 118 C 52 186, 92 246, 72 300" className={styles.match} />
      <path d="M130 206 C 160 178, 186 196, 186 242" className={styles.plan} />
      <path d="M160 186 l10 -10 M160 176 l10 10" className={styles.cross} />
      <path d="M130 206 C 140 256, 160 292, 176 318" className={styles.match} />
      {[
        [70, 118, 'Harriet'],
        [196, 128, 'Mr. Elton'],
        [72, 300, 'Robert Martin'],
        [130, 206, 'Emma'],
        [186, 242, 'Frank Churchill'],
        [176, 318, 'Mr. Knightley'],
      ].map(([x, y, name]) => (
        <g key={name}>
          <circle cx={x} cy={y} r="7" className={styles.node} />
          <text x={x + 12} y={y - 10} className={styles.handSmall}>
            {name}
          </text>
        </g>
      ))}
    </g>
  ),

  // Persuasion: the sea at Lyme, and the Cobb
  waves: (
    <g>
      <circle cx="214" cy="110" r="26" className={styles.sun} />
      <path d="M-10 214 C 60 206, 120 206, 168 214 C 196 220, 214 236, 222 256" className={styles.cobb} />
      <path d="M-10 226 C 60 218, 118 218, 160 226 C 186 232, 202 246, 208 262" className={styles.cobb} />
      {[250, 270, 292, 316, 342].map((y, i) => (
        <path key={y} d={wave(y, 5 + i, 26 + i * 4)} className={styles.wave} />
      ))}
      <path d="M232 222 l14 -40 l2 40 Z M226 224 h30 l-6 8 h-20 Z" className={styles.boat} />
      <text x="150" y="70" textAnchor="middle" className={styles.hand}>
        Lyme, em novembro
      </text>
    </g>
  ),

  // Mansfield Park: the house, symmetrical and severe
  house: (
    <g>
      <path d="M40 176 L150 120 L260 176 Z" className={styles.line} />
      <circle cx="150" cy="156" r="8" className={styles.line} />
      <rect x="40" y="176" width="220" height="140" className={styles.line} />
      {[60, 96, 186, 222].map((x) =>
        [196, 252].map((y) => <rect key={`${x}-${y}`} x={x} y={y} width="18" height="34" className={styles.window} />),
      )}
      {[124, 142, 158, 176].map((x) => (
        <path key={x} d={`M${x} 176 V316`} className={styles.column} />
      ))}
      <path d="M130 316 V280 a20 20 0 0 1 40 0 V316" className={styles.line} />
      <path d="M20 316 H280 M0 330 H300" className={styles.ground} />
      <text x="150" y="364" textAnchor="middle" className={styles.hand}>
        Mansfield Park
      </text>
    </g>
  ),

  // Northanger Abbey: a pointed window, and a candle that will gutter out
  gothic: (
    <g>
      <path d="M70 330 V170 Q70 90 150 60 Q230 90 230 170 V330 Z" className={styles.line} />
      <path d="M150 64 V330 M70 220 H230" className={styles.mullion} />
      <path d="M92 220 V170 Q92 116 150 88 Q208 116 208 170 V220" className={styles.mullion} />
      <circle cx="150" cy="140" r="22" className={styles.mullion} />
      <rect x="140" y="270" width="20" height="54" className={styles.candle} />
      <path d="M150 268 C 140 254, 146 240, 150 230 C 154 240, 160 254, 150 268 Z" className={styles.flame} />
      <path d="M118 324 H182" className={styles.line} />
    </g>
  ),
}

export default function NovelPlate({ novel, index }) {
  return (
    <figure className={styles.figure}>
      <div className={`${styles.plate} ${styles[novel.plate]}`}>
        <WatercolorWash color="var(--wash-1)" opacity={0.55} className={styles.washA} />
        <WatercolorWash color="var(--wash-2)" opacity={0.4} className={styles.washB} />
        <svg viewBox="0 0 300 380" className={styles.drawing} aria-hidden="true" focusable="false">
          {drawings[novel.plate]}
        </svg>
        {novel.plate === 'letter' && (
          <span className={styles.seal}>
            <WaxSeal monogram="D" size={64} />
          </span>
        )}
        {novel.plate === 'sisters' && (
          <>
            <BotanicalSprig className={styles.sprigA} leaves={10} sway={false} />
            <BotanicalSprig className={styles.sprigB} leaves={9} sway={false} />
          </>
        )}
      </div>
      <figcaption className={`caption ${styles.caption}`}>
        <span className={styles.plateNo}>Prancha {['I', 'II', 'III', 'IV', 'V', 'VI'][index]}</span>
        Ilustração original a tinta e aguarela, criada para esta exposição.
      </figcaption>
    </figure>
  )
}
