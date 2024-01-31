export interface Config {
  theme: 'light' | 'dark'
  backgroundColor: string
  cardColor: string
  showShadows: boolean
  innerSpace: number
  autoVerticalResize: boolean

  onNativeService?: (serviceId: string) => void
  onServiceGuide?: (serviceId: string) => void
}
