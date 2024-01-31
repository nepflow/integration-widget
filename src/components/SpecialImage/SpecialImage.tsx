import { type Service, type ServiceAction, type ServiceTrigger } from '../../models/service'
import styles from './specialImage.module.css'

interface Props {
  service: Service
  secondService: Service
  trigger?: ServiceTrigger
  action?: ServiceAction
  type: 'zapierTriggerClick' | 'zapierActionClick' | 'zapierTriggerAccountClick' | 'zapierActionAccountClick'
}

function SpecialImage ({ type, service, secondService, trigger, action }: Props) {
  if (type === 'zapierTriggerClick') {
    return (
      <div className={styles.image} style={{ backgroundImage: 'url(/zapierTriggerClick.png)', height: '140px' }}>
        <div
          className={styles.imageText}
          style={{
            top: '67px',
            left: '70px',
            right: '80px'
          }}
        >
          1. {trigger?.name} in {service.name}
        </div>
        <img
          src={service.iconURL}
          className={styles.imageIcon}
          style={{
            top: '55px',
            left: '25px'
          }}
        />
      </div>
    )
  }

  if (type === 'zapierActionClick') {
    return (
      <div className={styles.image} style={{ backgroundImage: 'url(/zapierActionClick.png)', height: '140px' }}>
        <div
          className={styles.imageText}
          style={{
            top: '61px',
            left: '70px',
            right: '80px'
          }}
        >
          2. {action?.name} in {secondService.name}
        </div>
        <img
          src={secondService.iconURL}
          className={styles.imageIcon}
          style={{
            top: '56px',
            left: '26px'
          }}
        />
      </div>
    )
  }

  if (type === 'zapierTriggerAccountClick' || type === 'zapierActionAccountClick') {
    return (
      <div className={styles.image} style={{ backgroundImage: 'url(/zapierAccountClick.png)', height: '120px' }}>
        <div
          className={styles.imageText}
          style={{
            top: '68px',
            left: '80px',
            right: '95px',
            fontSize: '12px',
            lineHeight: '12px',
            fontWeight: '600'
          }}
        >
          Connect {type === 'zapierTriggerAccountClick' ? service.name : secondService.name}
        </div>
        <img
          src={type === 'zapierTriggerAccountClick' ? service.iconURL : secondService.iconURL}
          className={styles.imageIcon}
          style={{
            top: '65px',
            left: '50.5px',
            width: '18px',
            height: '18px'
          }}
        />
      </div>
    )
  }

  return null
}

export default SpecialImage
