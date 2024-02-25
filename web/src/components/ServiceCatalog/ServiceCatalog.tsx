import styles from './serviceCatalog.module.css'
import Icon from '../Icon/Icon'
import Button from '../Button/Button'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { type Service } from '../../models/service'
import { useNavigate, useParams } from 'react-router-dom'
import getServices from '../../clients/api/queries/getServices'
import postMessageToParent from '../../utils/postMessageToParent'
import ConfigContext from '../../contexts/configContext'
import Card from '../Card'

interface Data {
  services: Service[]
  loading?: boolean
  searchLoading?: boolean
  appendLoading?: boolean
}

export default function ServiceCatalog () {
  const navigate = useNavigate()
  const { rootServiceId } = useParams()

  const [search, setSearch] = useState('')
  const [searchValue] = useDebounce(search, 1000)

  const config = useContext(ConfigContext)

  const [data, setData] = useState<Data>({
    services: [],
    loading: false,
    searchLoading: false,
    appendLoading: false
  })

  const newCustomCardsCount = useMemo(() => {
    return searchValue ? 0 : config.customCards?.filter(c => !c.replacedZapierAppId)?.length
  }, [config.customCards, searchValue])

  useEffect(() => {
    setData({ services: [], loading: true })

    loadServices(undefined, 0, 60 - newCustomCardsCount)
  }, [])

  useEffect(() => {
    setData({ services: [], loading: true })

    loadServices(searchValue, 0, 60 - newCustomCardsCount)
  }, [searchValue, newCustomCardsCount])

  const loadServices = useCallback(async (search: string = '', skip: number = 0, take: number = 60) => {
    const services = await getServices(rootServiceId || undefined, search, skip, take)

    setData({
      services: skip > 0 ? [...data.services, ...services] : services,
      loading: false,
      appendLoading: false,
      searchLoading: false
    })
  }, [data])

  const loadNextServices = useCallback(async () => {
    setData({ services: data.services, appendLoading: true })

    await loadServices(searchValue, data.services.length + newCustomCardsCount)
  }, [data, searchValue])

  const handleSearchChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    setData({ searchLoading: true, services: data.services })

    setSearch(e.currentTarget.value)
  }, [data])

  const handleLoadMoreClick = () => {
    loadNextServices()
  }

  const handleServiceClick = (service: Service) => {
    if (rootServiceId && !service.isCustom) {
      navigate(`/${rootServiceId}/service/${service.id}`)
    };

    postMessageToParent({
      action: 'handleCardClick',
      data: {
        id: service.id
      }
    })
  }

  const services: Service[] = useMemo(() => {
    const services = [...data.services]

    if (config.customCards?.length) {
      config.customCards.forEach(customCard => {
        if (customCard.replacedZapierAppId) {
          const replaceableServiceIndex = services.findIndex(s => s.id === customCard.replacedZapierAppId)
          if (replaceableServiceIndex !== -1) {
            services[replaceableServiceIndex] = {
              id: customCard.id,
              name: customCard.name,
              iconURL: customCard.iconURL,
              isCustom: true,
              triggers: [],
              actions: []
            }
          };
        } else if (!searchValue) {
          services.unshift({
            id: customCard.id,
            name: customCard.name,
            iconURL: customCard.iconURL,
            isCustom: true,
            triggers: [],
            actions: []
          })
        }
      })
    };

    return services
  }, [data.services, config.customCards])

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.search}>
          <input
            onChange={handleSearchChange}
            name='search'
            type='text'
            autoComplete='off'
            className={styles.searchInput}
            placeholder={'Search integrations...'}
          />
          <Icon icon={data.searchLoading ? 'loading' : 'search'} size={18} className={styles.searchIcon} />
        </div>
      </div>

      <div className={[styles.list, data.loading && styles.listLoading].join(' ')}>
        {data.loading && [...Array(60)].map((i: number) => (
          <div key={i?.toString()} className={styles.listLink}>
            <Card className={styles.listItem} />
          </div>
        ))}

        {!data.loading && services.map(service => (
          <div key={service.id} className={styles.listLink} onClick={() => { handleServiceClick(service) }}>
            <Card className={styles.listItem}>
              <img src={service.iconURL} className={styles.listItemIcon} />
              <span className={styles.listItemName}>
                {service.name}
              </span>
            </Card>
          </div>
        ))}
      </div>

      {!data.loading && services?.length >= 60 && (
        <div className={styles.buttonWrapper}>
          <Button loading={data.appendLoading} onClick={handleLoadMoreClick}>
            {data.appendLoading ? 'Loading...' : 'Load more'}
          </Button>
        </div>
      )}
    </div>
  )
}
