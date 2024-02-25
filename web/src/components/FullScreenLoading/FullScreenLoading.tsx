import styles from './fullScreenLoading.module.css'
import Icon from '../Icon/Icon'

function FullScreenLoading () {
  return (
    <div
      className={styles.container}
    >
      <Icon className={styles.containerLoadingIcon} icon='loading' size={48} />
    </div>
  )
}

export default FullScreenLoading
