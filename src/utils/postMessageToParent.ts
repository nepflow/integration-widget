type Action =
    | { action: 'setWidgetHeight', data: { widgetHeight: number } }
    | { action: 'handleServiceClick', data: { serviceId: string } }

// Send a message from the iframe to the parent window
function postMessageToParent (action: Action) {
  window.parent?.postMessage({
    action: action.action,
    data: action.data
  }, '*')
}

export default postMessageToParent
