import { type ReactNode } from 'react'
import styles from './card.module.css'

interface Props {
  className: string | string[]
  children?: ReactNode
  onClick?: () => void
}

function Card ({ className, children, onClick }: Props) {
  let finalClassName = [styles.card]
  if (Array.isArray(className)) {
    finalClassName = [
      ...finalClassName,
      ...className
    ]
  } else {
    finalClassName.push(className)
  }

  return (
    <div onClick={onClick} className={finalClassName.join(' ')}>{children}</div>
  )
}

export default Card
