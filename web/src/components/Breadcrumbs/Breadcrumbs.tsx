import Icon from '../Icon/Icon'
import styles from './breadcrumbs.module.css'
import { Link } from 'react-router-dom'

interface Item { title: string, path?: string }

interface Props {
  items: Array<Item | undefined>
}

function Breadcrumbs ({ items }: Props) {
  const filteredItems = items.filter(i => !!i) as Item[]

  return (
    <div
      className={styles.breadcrumbs}
    >
      {filteredItems.map((item, i) => (
        <div key={i.toString()} className={styles.breadcrumbsItem}>
          {item.path
            ? (
            <Link to={item.path}>
              {item.title}
            </Link>
              )
            : (
            <span>
              {item.title}
            </span>
              )}

          {i < filteredItems.length - 1 && (
            <Icon icon='chevronRight' className={styles.breadcrumbsItemSeparator} size={16} />
          )}
        </div>
      ))}
    </div>
  )
}

export default Breadcrumbs
