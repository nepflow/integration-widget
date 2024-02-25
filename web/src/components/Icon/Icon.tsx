import styles from './icon.module.css'

export type IconKey = 'loading' | 'search' | 'arrowLeft' | 'arrowRightCircle' | 'chevronRight'

interface Props {
  icon: IconKey
  size: number
  className?: string
}

export default function Icon ({ icon, className, size }: Props) {
  const iconPath = `/icons/${icon}.svg`

  return (
    <div
      className={[className, styles.icon].join(' ')}
      style={{ width: size, height: size }}
    >
      <img className={icon === 'loading' ? styles.spinning : undefined} alt='' src={iconPath} width={size} height={size} />
    </div>
  )
}
