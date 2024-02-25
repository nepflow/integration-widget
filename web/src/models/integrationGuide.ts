export type IntegrationGuideChildStepType = 'zapierTriggerClick' | 'zapierActionClick' | 'zapierTriggerAccountClick' | 'zapierActionAccountClick' | 'zapierTriggerDetails' | 'zapierActionDetails' | 'zapierTriggerTest';

interface ChildStep {
  text: string
  picUrl?: string
  type?: IntegrationGuideChildStepType
}

interface Step {
  text: string
  childSteps?: ChildStep[]
}

export interface IntegrationGuide {
  steps: Step[]
}
