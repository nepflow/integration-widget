import { entityId } from '../globals'

type Action =
    | { action: 'setWidgetHeight', data: { widgetHeight: number } }
    | { action: 'handleCardClick', data: { id: string } }

// Send a message from the iframe to the parent window
function postMessageToParent (action: Action) {
  console.debug('[Nepflow] Send message to parent window', action.action, action.data)

  window.parent?.postMessage({
    action: action.action,
    data: action.data,
    entityId
  }, '*')
}

export default postMessageToParent
