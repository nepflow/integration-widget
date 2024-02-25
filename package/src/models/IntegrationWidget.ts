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
  private readonly params: IntegrationWidgetConfig
  private readonly iframeParams: IframeConfig

  constructor (elementId: string, params: IntegrationWidgetConfig, iframeParams?: IframeConfig) {
    this.entityId = this.generateEntityId()
    this.baseUrl = iframeParams?.baseUrl ?? 'https://widget.nepflow.dev'
    this.params = params
    this.iframeParams = iframeParams ?? {}

    // Get the widget element
    const widgetElement = document.getElementById(elementId)
    if (!widgetElement) {
      console.error('Integration widget element not found.')
      return
    }

    // Create the iframe element
    const iframe = this.createIFrame()

    // Append the iframe to the element
    widgetElement.innerHTML = ''
    widgetElement.appendChild(iframe)

    this.setupMessageHandler(iframe)
  }

  private getSearchParams (): URLSearchParams {
    // Create URLSearchParams from the params object
    const searchParams = new URLSearchParams()
    for (const [key, value] of Object.entries(this.params)) {
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

    return searchParams
  }

  // Create the iframe element
  private createIFrame (): HTMLIFrameElement {
    const searchParams = this.getSearchParams()

    const iframe = document.createElement('iframe')
    iframe.src = `${this.baseUrl}/${this.params.zapierAppId || ''}?${searchParams.toString()}`
    iframe.style.width = this.iframeParams?.width ?? '100%'
    iframe.style.height = this.iframeParams?.height ?? '100%'
    iframe.style.minHeight = this.iframeParams?.minHeight ?? '500px'
    iframe.frameBorder = '0'

    return iframe
  }

  // Setup handler for messages from the iframe
  private setupMessageHandler (iframe: HTMLIFrameElement): void {
    window.addEventListener('message', (event) => {
      if (!event.origin.startsWith(this.baseUrl)) {
        console.debug('[Nepflow] Received message from unknown origin', event.origin)
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
          if (typeof this.params.onCardClick === 'function') {
            this.params.onCardClick(data.id as string)
          };
          break
      }
    })
  }

  // Generate unique entity id
  private generateEntityId (): string {
    const prefix = 'integration-widget-'
    const randomSuffix = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    return prefix + randomSuffix
  }
}
