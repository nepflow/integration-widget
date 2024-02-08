import { type IntegrationWidgetConfig } from './IntegrationWidgetConfig'

interface IframeConfig {
  baseUrl?: string
  width?: string
  height?: string
  minHeight?: string
}

export class IntegrationWidget {
  private readonly entityId: string
  private readonly baseUrl: string

  constructor (elementId: string, params: IntegrationWidgetConfig, iframeParams?: IframeConfig) {
    this.entityId = this.generateEntityId()
    this.baseUrl = iframeParams?.baseUrl ?? 'https://widget.nepflow.dev'

    const widgetElement = document.getElementById(elementId)
    if (!widgetElement) {
      console.error('Integration widget element not found.')
      return
    }

    // Create URLSearchParams from the params object
    const searchParams = new URLSearchParams()
    for (const [key, value] of Object.entries(params)) {
      if (typeof value === 'boolean') {
        searchParams.append(key, value ? 'true' : '')
      } else if (typeof value === 'object') {
        searchParams.append(key, JSON.stringify(value))
      } else if (typeof value === 'number') {
        searchParams.append(key, value.toString())
      } else if (typeof value === 'string') {
        searchParams.append(key, value)
      }
    }

    // Add widgetId
    searchParams.append('entityId', this.entityId)

    // Add parent window host
    searchParams.append('appHost', window.location.host)

    // Create the iframe element
    const iframe = document.createElement('iframe')
    iframe.src = `${this.baseUrl}/${params.zapierAppId || ''}?${searchParams.toString()}`
    iframe.style.width = iframeParams?.width ?? '100%'
    iframe.style.height = iframeParams?.height ?? '100%'
    iframe.style.minHeight = iframeParams?.minHeight ?? '500px'
    iframe.frameBorder = '0'

    // Append the iframe to the integration-widget element
    widgetElement.innerHTML = ''
    widgetElement.appendChild(iframe)

    // Handler for messages from the iframe
    window.addEventListener('message', (event) => {
      if (!event.origin.startsWith(this.baseUrl)) {
        console.debug('[Nepflow] Received message from unknown origin:', event.origin)
        return
      }

      const { action, data, entityId: receivedEntityId } = event.data

      if (receivedEntityId !== this.entityId) {
        return
      }

      console.debug('[Nepflow] Received message:', action, data)

      switch (action) {
        case 'setWidgetHeight':
          iframe.style.height = `${data.widgetHeight}px`
          break
        case 'handleCardClick':
          if (typeof params.onCardClick === 'function') {
            params.onCardClick(data.id as string)
          };
          break
      }
    })
  }

  private generateEntityId (): string {
    const prefix = 'integration-widget-'
    const randomSuffix = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    return prefix + randomSuffix
  }
}
