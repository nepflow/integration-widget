import styles from './serviceCatalog.module.css'
import Icon from '../Icon/Icon'
import Button from '../Button/Button'
import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { type Service } from '../../models/service'
import { useNavigate, useParams } from 'react-router-dom'
import getServices from '../../clients/api/queries/getServices'
import postMessageToParent from '../../utils/postMessageToParent'

interface Data {
  services: Service[]
  loading?: boolean
  searchLoading?: boolean
  appendLoading?: boolean
}

export default function ServiceCatalog () {
  const { rootServiceId } = useParams()
  const navigate = useNavigate()

  const [search, setSearch] = useState('')
  const [searchValue] = useDebounce(search, 1000)

  const [data, setData] = useState<Data>({
    services: [],
    loading: false,
    searchLoading: false,
    appendLoading: false
  })

  useEffect(() => {
    setData({ services: [], loading: true })

    loadServices()
  }, [])

  useEffect(() => {
    setData({ services: [], loading: true })

    loadServices(searchValue)
  }, [searchValue])

  const loadServices = async (search: string = '', skip: number = 0) => {
    const services = await getServices(search, skip)

    setData({
      services: skip > 0 ? [...data.services, ...services] : services,
      loading: false,
      appendLoading: false,
      searchLoading: false
    })
  }

  const loadNextServices = async () => {
    setData({ services: data.services, appendLoading: true })

    await loadServices(searchValue, data.services.length)
  }

  const onChangeSearch = (e: React.FormEvent<HTMLInputElement>) => {
    setData({ searchLoading: true, services: data.services })

    setSearch(e.currentTarget.value)
  }

  const onClickLoadMore = () => {
    loadNextServices()
  }

  const handleServiceClick = (serviceId: string) => {
    if (rootServiceId) {
      navigate(`/${rootServiceId}/guide/${serviceId}`)
    };

    postMessageToParent({
      action: 'handleServiceClick',
      data: {
        serviceId
      }
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.search}>
          <input
            onChange={onChangeSearch}
            name='search' type='text' autoComplete='off' className={styles.searchInput} placeholder='Search integrations...' />
          <Icon icon={data.searchLoading ? 'loading' : 'search'} size={18} className={styles.searchIcon} />
        </div>
      </div>

      <div className={[styles.list, data.loading && styles.listLoading].join(' ')}>
        {data.loading && [...Array(60)].map((i: number) => (
          <div key={i.toString()} className={styles.listLink}>
            <div className={styles.listItem} />
          </div>
        ))}

        {!data.loading && data.services.map(service => (
          <div key={service.id} className={styles.listLink} onClick={() => { handleServiceClick(service.id) }}>
            <div className={styles.listItem}>
              <img src={service.iconURL} className={styles.listItemIcon} />
              <span className={styles.listItemName}>
                {service.name}
              </span>
            </div>
          </div>
        ))}
      </div>

      {!data.loading && data.services?.length >= 60 && (
        <div className={styles.buttonWrapper}>
          <Button loading={data.appendLoading} onClick={onClickLoadMore}>
            {data.appendLoading ? 'Loading...' : 'Load more'}
          </Button>
        </div>
      )}
    </div>
  )
}
