import { IntegrationWidget as NepflowIntegrationWidget } from './models/IntegrationWidget'

declare global {
  interface Window {
    NepflowIntegrationWidget: Function
  }
}

// Prevent tree-shaking
window.NepflowIntegrationWidget = NepflowIntegrationWidget

export default NepflowIntegrationWidget
