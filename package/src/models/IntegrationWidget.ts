import { type IntegrationWidgetConfig } from './IntegrationWidgetConfig'

interface IframeConfig {
  baseUrl?: string
  width?: string
  height?: string
  minHeight?: string
}

export class IntegrationWidget {
  private readonly baseUrl: string

  constructor (elementId: string, params: IntegrationWidgetConfig, iframeParams?: IframeConfig) {
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

      const { action, data } = event.data
      console.debug('[Nepflow] Received message:', action, data)

      switch (action) {
        case 'setWidgetHeight':
          iframe.style.height = `${data.widgetHeight}px`
          break
        case 'handleCardClick':
          if (typeof params.onCardClick === 'function') {
            params.onCardClick(data.id)
          };
          break
      }
    })
  }
}
