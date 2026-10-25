import BotanicalSprig from '../BotanicalSprig.jsx'
import WatercolorWash from '../WatercolorWash.jsx'
import styles from './HeroineCameo.module.css'

/** An oval cameo with the heroine's initial: a portrait without inventing a face. */
export default function HeroineCameo({ heroine }) {
  return (
    <div className={styles.cameo} data-novel={heroine.novelId} aria-hidden="true">
      <WatercolorWash color="var(--wash-1)" opacity={0.6} className={styles.wash} />
      <span className={styles.oval}>
        <span className={styles.initial}>{heroine.initial}</span>
      </span>
      <BotanicalSprig className={styles.sprig} leaves={9} sway={false} />
    </div>
  )
}
