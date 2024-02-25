import styles from './methods.module.css'
import { useContext, useEffect, useState } from 'react'
import FullScreenLoading from '../../FullScreenLoading'
import { useNavigate } from 'react-router-dom'
import { type ServiceAction, type ServiceTrigger } from '../../../models/service'
import RootServiceContext from '../../../contexts/rootServiceContext'
import { type Recommendation } from '../../../models/recommendation'
import getRecommendations from '../../../clients/api/queries/getRecommendations'
import ServiceContext from '../../../contexts/serviceContext'
import TriggerToActionSelector from '../../TriggerToActionSelector/TriggerToActionSelector'
import Banner from './Banner'
import Header from '../../Header'
import Card from '../../Card'

export default function Methods () {
  const [trigger, setTrigger] = useState<ServiceTrigger>()
  const [action, setAction] = useState<ServiceAction>()

  useEffect(() => {
    if (action && trigger) {
      navigate(`/${rootService.id}/service/${connectedService.id}/guide/auto?triggerServiceId=${trigger.serviceId === rootService.id ? rootService.id : connectedService.id}&triggerId=${trigger.id}&actionId=${action.id}`)
    };
  }, [action, trigger])

  const rootService = useContext(RootServiceContext)!
  const connectedService = useContext(ServiceContext)!

  const navigate = useNavigate()
  const [data, setData] = useState<{ recommendations: Recommendation[] }>({ recommendations: [] })

  useEffect(() => {
    getRecommendations(rootService.id, connectedService.id).then(recommendations => { setData({ recommendations }) })
  }, [rootService, connectedService])

  if (!rootService || !connectedService) {
    return (
      <>
        <div className={styles.container} />
        <FullScreenLoading />
      </>
    )
  }

  const handleClickRecommendation = (recommendation: Recommendation) => {
    navigate(`/${rootService.id}/service/${connectedService.id}/guide/auto?triggerServiceId=${recommendation.headServiceId === rootService.id ? rootService.id : connectedService.id}&triggerId=${recommendation.headServiceTriggerId}&actionId=${recommendation.tailServiceActionId}&guidedRecipeId=${recommendation.guidedRecipeId || ''}`)
  }

  const handleBackClick = () => {
    navigate(`/${rootService.id || ''}`)
  }

  const hasRecommendations = data.recommendations?.length > 0

  return (
    <div className={styles.container}>
      <Header
        onBackClick={handleBackClick}
        title={`Integrate with ${connectedService.name}`}
      />

      <Card className={styles.card}>
        <TriggerToActionSelector
          action={action}
          trigger={trigger}
          rootService={rootService}
          connectedService={connectedService}
          onChangeAction={setAction}
          onChangeTrigger={setTrigger}
        />

        <Banner />
      </Card>

      {!!connectedService.recommendationsCount && !hasRecommendations && (
        <div className={[styles.recommendations, styles.recommendationsLoading].join(' ')}>
          {[...Array(connectedService.recommendationsCount)].map((_, i) => (
            <div key={i.toString()} className={[styles.card, styles.recommendation].join(' ')}>&nbsp;</div>
          ))}
        </div>
      )}

      {hasRecommendations && (
        <div className={styles.recommendations}>
          {data.recommendations.map((recommendation, i) => (
            <Card key={recommendation.title} className={[styles.card, styles.recommendation]} onClick={() => { handleClickRecommendation(recommendation) }}>
              <div className={styles.recommendationIcons}>
                <img src={recommendation.headServiceId === rootService.id ? rootService.iconURL : connectedService.iconURL} className={styles.recommendationIcon} />
                <img src={recommendation.headServiceId !== rootService.id ? rootService.iconURL : connectedService.iconURL} className={styles.recommendationIcon} />
              </div>

              <div className={styles.recommendationTitle}>
                {recommendation.title}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
