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
  private readonly widgetElement: HTMLElement | null
  private readonly iframeElement: HTMLIFrameElement | null = null
  private readonly progressBarElement: HTMLDivElement | null = null

  constructor (elementId: string, params: IntegrationWidgetConfig, iframeParams?: IframeConfig) {
    this.entityId = this.generateEntityId()
    this.baseUrl = iframeParams?.baseUrl ?? 'https://widget.nepflow.dev'
    this.params = params
    this.iframeParams = iframeParams ?? {}

    // Get the widget element
    this.widgetElement = document.getElementById(elementId)
    if (!this.widgetElement) {
      console.error('Integration widget element not found.')
      return
    }

    this.widgetElement.innerHTML = ''
    
    // Append the progress bar
    if (!this.params.hideIframeProgressBar) {
      this.progressBarElement = this.createProgressBar()
      this.widgetElement.appendChild(this.progressBarElement)
    }
    
    // Append the iframe
    this.iframeElement = this.createIFrame()
    this.widgetElement.appendChild(this.iframeElement)

    this.setupMessageHandler(this.iframeElement)
  }

  private createProgressBar (): HTMLDivElement {
    // Add a CSS rotation animation
    const styleSheet = document.createElement('style')
    styleSheet.type = 'text/css'
    styleSheet.innerText = `
    @keyframes nepflowWidgetProgressBarRotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }`;
    (document.head || document.body).appendChild(styleSheet)

    // Create progress bar container
    const progressBar = document.createElement('div')
    progressBar.style.position = 'relative'
    progressBar.style.backgroundColor = this.params.backgroundColor
    progressBar.style.width = '100%'
    progressBar.style.minHeight = '100px'
    
    // Show only after 0.3s
    progressBar.style.opacity = '0'
    progressBar.style.transition = '0.3s'
    setTimeout(() => {
      progressBar.style.opacity = '1'
    }, 0)

    // Create progress bar icon
    const progressBarIcon = document.createElement('div')
    progressBarIcon.style.backgroundImage = 'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-loader-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 3a9 9 0 1 0 9 9" /></svg>\')'
    progressBarIcon.style.position = 'absolute'
    progressBarIcon.style.top = '50%'
    progressBarIcon.style.left = '50%'
    progressBarIcon.style.margin = '-18px 0 0 -18px'
    progressBarIcon.style.backgroundSize = '100% 100%'
    progressBarIcon.style.backgroundPosition = 'center center'
    progressBarIcon.style.opacity = '0.5'
    progressBarIcon.style.width = '36px'
    progressBarIcon.style.height = '36px'
    progressBarIcon.style.animation = 'nepflowWidgetProgressBarRotate 0.5s linear infinite'

    progressBar.appendChild(progressBarIcon)

    return progressBar
  }

  private hideProgressBar (): void {
    if (this.progressBarElement) {
      this.progressBarElement.style.display = 'none'
    }
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
        case 'handleLoaded':
          this.hideProgressBar()
          break
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
