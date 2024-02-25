import Icon from '../Icon/Icon'
import styles from './backButton.module.css'

interface Props {
  onClick: () => void
}

function BackButton ({ onClick }: Props) {
  return (
    <div
      className={styles.backButton}
      onClick={onClick}
    >
      <Icon icon='arrowLeft' className={styles.backButtonIcon} size={18} />
    </div>
  )
}

export default BackButton
