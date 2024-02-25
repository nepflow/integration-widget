import { IntegrationWidget as NepflowIntegrationWidget } from './models/IntegrationWidget'

declare global {
  interface Window {
    NepflowIntegrationWidget: typeof NepflowIntegrationWidget
  }
}

// Prevent tree-shaking
window.NepflowIntegrationWidget = NepflowIntegrationWidget

export default NepflowIntegrationWidget
