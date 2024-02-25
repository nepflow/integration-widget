import { type Service, type ServiceAction, type ServiceTrigger } from '../../models/service'
import styles from './specialImage.module.css'

enum SpecialImageType {
  ZapierTriggerClick = 'zapierTriggerClick',
  ZapierActionClick = 'zapierActionClick',
  ZapierTriggerAccountClick = 'zapierTriggerAccountClick',
  ZapierActionAccountClick = 'zapierActionAccountClick',
  ZapierTriggerDetails = 'zapierTriggerDetails',
  ZapierActionDetails = 'zapierActionDetails',
  ZapierTriggerTest = 'zapierTriggerTest',
}

interface Props {
  service: Service
  secondService: Service
  trigger?: ServiceTrigger
  action?: ServiceAction
  type?: SpecialImageType
}

function SpecialImage ({ type, service, secondService, trigger, action }: Props) {
  if (type === SpecialImageType.ZapierTriggerClick) {
    return (
      <div className={styles.image} style={{ backgroundImage: 'url(/zapierTriggerClick.png)', height: '123px' }}>
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

  if (type === SpecialImageType.ZapierActionClick) {
    return (
      <div className={styles.image} style={{ backgroundImage: 'url(/zapierActionClick.png)', height: '123px' }}>
        <div
          className={styles.imageText}
          style={{
            top: '54px',
            left: '58px',
            right: '80px',
            fontSize: '12px',
            lineHeight: '12px',
            fontWeight: '500'
          }}
        >
          2. {action?.name} in {secondService.name}
        </div>
        <img
          src={secondService.iconURL}
          className={styles.imageIcon}
          style={{
            top: '50px',
            left: '23.6px',
            width: '20px',
            height: '20px'
          }}
        />
      </div>
    )
  }

  if (type === SpecialImageType.ZapierTriggerAccountClick || type === SpecialImageType.ZapierActionAccountClick) {
    return (
      <div className={styles.image} style={{ backgroundImage: 'url(/zapierAccountClick.png)', height: '105px' }}>
        <div
          className={styles.imageText}
          style={{
            top: '60px',
            left: '68px',
            right: '95px',
            fontSize: '10px',
            lineHeight: '10px',
            fontWeight: '600'
          }}
        >
          Connect {type === 'zapierTriggerAccountClick' ? service.name : secondService.name}
        </div>
        <img
          src={type === 'zapierTriggerAccountClick' ? service.iconURL : secondService.iconURL}
          className={styles.imageIcon}
          style={{
            top: '56.5px',
            left: '44.5px',
            width: '16px',
            height: '16px'
          }}
        />
      </div>
    )
  }

  if (type === SpecialImageType.ZapierTriggerDetails || type === SpecialImageType.ZapierActionDetails) {
    return (
      <div className={styles.image} style={{ backgroundImage: type === SpecialImageType.ZapierTriggerDetails ? 'url(/zapierTriggerDetails.png)' : 'url(/zapierActionDetails.png)', height: '105px' }}>
        <div
          className={styles.imageText}
          style={{
            top: '48px',
            left: '40px',
            right: '95px',
            width: '140px',
            fontSize: '10px',
            lineHeight: '10px',
            fontWeight: '500'
          }}
        >
          {(type === SpecialImageType.ZapierTriggerDetails ? trigger?.needs?.[0] : action?.needs?.[0]) || 'Choose value'}
        </div>
      </div>
    )
  }

  if (type === SpecialImageType.ZapierTriggerTest) {
    return (
      <div className={styles.image} style={{ backgroundImage: 'url(/zapierTriggerTest.png)', height: '106px' }}>
        <img
          src={service.iconURL}
          className={styles.imageIcon}
          style={{
            top: '44px',
            left: '117px',
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
