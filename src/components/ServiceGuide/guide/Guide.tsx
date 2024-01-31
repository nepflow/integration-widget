import styles from './guide.module.css'
import { type Service, type ServiceAction, type ServiceTrigger } from '../../../models/service'
import { type IntegrationGuide } from '../../../models/guide'
import SpecialImage from '../../SpecialImage/SpecialImage'

interface Props {
  trigger: ServiceTrigger
  action: ServiceAction
  service: Service
  secondService: Service
  steps: IntegrationGuide['steps']
}

export default function Guide ({ steps, service, secondService, action, trigger }: Props) {
  // ...

  return (
    <>
      <div className={styles.divider} />

      <p>To set up this integration, we'll use Zapier, a tool for creating automated integrations.</p>

      <div className={styles.steps}>
        {steps?.map((step, i) => (
          <div key={i.toString()} className={styles.step}>
            <div className={styles.stepNumber}>{i + 1}</div>
            <span dangerouslySetInnerHTML={{ __html: step.text }}></span>

            {!!step.childSteps?.length && (
              <div className={styles.childSteps}>
                {step.childSteps.map((childStep, i) => (
                  <div key={i.toString()} className={styles.childStep}>
                    {childStep.picSpecialType ? <SpecialImage service={service} secondService={secondService} trigger={trigger} action={action} type={childStep.picSpecialType} /> : <img className={styles.childStepPic} src={childStep.picUrl} />}
                    <div className={styles.childStepTitle} dangerouslySetInnerHTML={{ __html: childStep.text }}></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}
