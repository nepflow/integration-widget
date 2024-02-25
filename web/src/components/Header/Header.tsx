import styles from './header.module.css'
import BackButton from '../BackButton'

interface Props {
  title?: string
  onBackClick: () => void
}

function Header ({ title, onBackClick }: Props) {
  return (
    <div className={styles.header}>
      <BackButton onClick={onBackClick} />

      <div className={styles.headerTitle}>{title}</div>
    </div>
  )
}

export default Header
