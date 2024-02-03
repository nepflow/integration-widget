import styles from './button.module.css'
import Icon, { type IconKey } from '../Icon/Icon'

interface Props {
  icon?: IconKey
  children: React.ReactNode
  loading?: boolean
  onClick: () => void
}

function Button ({ icon, children, loading = false, onClick }: Props) {
  return (
    <div
      className={styles.button}
      onClick={onClick}
    >
      {!!icon && !loading && (
        <Icon className={styles.buttonIcon} icon={icon} size={16} />
      )}
      {loading && (
        <Icon className={styles.buttonIcon} icon='loading' size={16} />
      )}
      {children}
    </div>
  )
}

export default Button
