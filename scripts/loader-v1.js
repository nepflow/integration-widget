class NepflowWidget {
  constructor() {
    this.baseUrl = 'http://localhost:5173/';
  }

  load(elementId, params) {
    const widgetElement = document.getElementById(elementId);
    if (!widgetElement) {
      console.error('Integration widget element not found.');
      return;
    }

    // Create URLSearchParams from the params object
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      searchParams.append(key, value.toString());
    }

    // Create the iframe element
    const iframe = document.createElement('iframe');
    iframe.src = `${this.baseUrl}?${searchParams.toString()}`;
    iframe.style.width = '100%';  
    iframe.style.height = '100%'; 
    iframe.frameBorder = '0';     

    // Append the iframe to the integration-widget element
    widgetElement.innerHTML = '';
    widgetElement.appendChild(iframe);

    // Handler for messages from the iframe
    window.addEventListener('message', (event) => {
      if (event.origin !== this.baseUrl) {
        console.debug('[Nepflow] Received message from unknown origin:', event.origin);
        return;
      }

      console.debug('[Nepflow] Received message:', event.data);
    });
  }
}

window.nepflow = new NepflowWidget();
