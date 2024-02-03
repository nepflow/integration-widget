interface ChildStep {
  text: string
  picUrl?: string
  type: 'zapierTriggerClick' | 'zapierActionClick' | 'zapierTriggerAccountClick' | 'zapierActionAccountClick'
}

interface Step {
  text: string
  childSteps?: ChildStep[]
}

export interface IntegrationGuide {
  steps: Step[]
}
