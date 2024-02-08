const configSearchParams = new URL(window.location.href).searchParams

export const entityId = configSearchParams.get('entityId')!
export const appHost = configSearchParams.get('appHost')!
