import styles from './banner.module.css'

export default function Banner () {
  return (
    <div className={styles.banner}>
      <div className={styles.bannerTitle}>
        Select Trigger and Action
      </div>

      <div className={styles.bannerText}>
        Begin with selecting a <b>Trigger</b>, which starts your automation. Then, choose an <b>Action</b> for what happens after the trigger.
      </div>
    </div>
  )
}
