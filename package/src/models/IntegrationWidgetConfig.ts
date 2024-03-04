interface CustomCard {
  id: string
  name: string
  iconURL: string
  replacedZapierAppId?: string
}

export interface IntegrationWidgetConfig {
  zapierAppId?: string
  backgroundColor: string
  cardColor: string
  cardBorderColor: string
  innerSpace: number
  autoVerticalResize: boolean
  hideIframeProgressBar?: boolean // false by default
  onCardClick?: (id: string) => void
  customCards?: CustomCard[]
}
