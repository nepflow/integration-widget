import styles from './serviceGuide.module.css'
import Icon from '../Icon/Icon'
import { useContext, useEffect, useState } from 'react'
import Guide from './guide/Guide'
import Select, { type SingleValue } from 'react-select'
import FullScreenLoading from '../FullScreanLoading/FullScreenLoading'
import { type IntegrationGuide } from '../../models/integrationGuide'
import { Link } from 'react-router-dom'
import { type Service, type ServiceAction, type ServiceTrigger } from '../../models/service'
import getService from '../../clients/api/queries/getService'
import RootServiceContext from '../../contexts/rootServiceContext'
import getGuide from '../../clients/api/queries/getGuide'

interface Props {
  serviceId?: string
  connectedServiceId?: string
}

export default function ServiceGuide ({ serviceId, connectedServiceId }: Props) {
  const rootService = useContext(RootServiceContext)
  const [data, setData] = useState<{ connectedService: Service }>()
  const [trigger, setTrigger] = useState<ServiceTrigger>()
  const [action, setAction] = useState<ServiceAction>()

  const [guideData, setGuideData] = useState<{ loading: boolean, guide?: IntegrationGuide }>({ loading: false })
  const service = rootService
  const connectedService = data?.connectedService

  useEffect(() => {
    if (serviceId && connectedServiceId) {
      getService(connectedServiceId)
        .then(connectedService => { setData({ connectedService }) })
    };
  }, [serviceId, connectedServiceId])

  useEffect(() => {
    if (trigger && action && service && connectedService) {
      setGuideData({ loading: true })
      getGuide(
        trigger?.serviceId === connectedService.id ? connectedService.id : service.id,
        trigger?.serviceId === connectedService.id ? service.id : connectedService.id,
        trigger.id,
        action.id
      ).then(guide => { setGuideData({ guide, loading: false }) })
    };
  }, [trigger, action, service, connectedService])

  const getOption = (value: string, iconUrl: string, label: string) => {
    return {
      value,
      label: (
        <>
          <img className={styles.headerSelectOptionIcon} src={iconUrl} alt="" />
          <span className={styles.headerSelectOptionLabel}>{label}</span>
        </>
      )
    }
  }

  const selectStyles = {
    control: (baseStyles: any) => ({
      ...baseStyles,
      border: '1px solid #ccc',
      boxShadow: 'none',
      '&:hover': {
        border: '1px solid #aaa'
      }
    })
  }

  if (!service || !connectedService) {
    return (
      <>
        <div className={styles.container} />
        <FullScreenLoading />
      </>
    )
  }

  const handleTriggerChange = (newValue: SingleValue<{ value: string }>) => {
    const trigger = [...service.triggers, ...connectedService.triggers].find(t => t.id === newValue?.value)

    if (trigger) {
      setTrigger(trigger)
    }
  }

  const handleActionChange = (newValue: SingleValue<{ value: string }>) => {
    const action = [...service.actions, ...connectedService.actions].find(a => a.id === newValue?.value)

    if (action) {
      setAction(action)
    }
  }

  return (
    <div className={styles.container}>
      <div>
        <Link className={styles.backLink} to={`/${service.id}`}>
          <Icon className={styles.backLinkIcon} size={18} icon='arrowLeft' />
          All integrations
        </Link>
        <div className={styles.header}>
          <img src={connectedService.iconURL} className={styles.headerIcon} />
          <div className={styles.headerTitle}>Integrate with {connectedService.name}</div>
        </div>
      </div>

      <div className={styles.card}>
        <div>
          <div className={styles.headerTrigger}>
            <div className={styles.headerFieldLabel}>Trigger</div>
            <Select
              autoFocus
              styles={selectStyles}
              placeholder='Choose a trigger'
              isSearchable
              onChange={handleTriggerChange}
              isOptionSelected={o => o.value === trigger?.id}
              options={[
                ...service.triggers.map(trigger => (
                  getOption(trigger.id, service.iconURL, trigger.name)
                )),
                ...connectedService.triggers.map(trigger => (
                  getOption(trigger.id, connectedService.iconURL, trigger.name)
                ))
              ]}
            />
          </div>
          <div className={styles.headerPointer}>
            <Icon icon='arrowRightCircle' size={24} className={styles.headerPointerArrow} />
          </div>
          <div className={styles.headerAction}>
            <div className={styles.headerFieldLabel}>Action</div>
            <Select
              styles={selectStyles}
              placeholder='Choose an action'
              isSearchable
              onChange={handleActionChange}
              isOptionSelected={o => o.value === action?.id}
              options={[
                ...service.actions.map(action => (
                  getOption(action.id, service.iconURL, action.name)
                )),
                ...connectedService.actions.map(action => (
                  getOption(action.id, connectedService.iconURL, action.name)
                ))
              ]}
            />
          </div>
        </div>

        {guideData.loading && (
          <div className={styles.guideLoading}>
            <Icon className={styles.guideLoadingIcon} icon='loading' size={18} />
            <span>Generating guide...</span>
          </div>
        )}
        {guideData.guide && trigger && action && (
          <Guide
            trigger={trigger}
            action={action}
            service={trigger?.serviceId === connectedService.id ? connectedService : service}
            secondService={trigger?.serviceId === connectedService.id ? service : connectedService}
            steps={guideData.guide?.steps}
          />
        )}
      </div>
    </div>
  )
}
