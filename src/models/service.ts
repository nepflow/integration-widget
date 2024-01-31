interface AuthField {
  key: string
  label: string
}

export interface ServiceTrigger {
  id: string
  name: string
  serviceId: string
}

export interface ServiceAction {
  id: string
  name: string
  serviceId: string
}

export interface Service {
  id: string
  name: string
  iconURL: string

  isNative?: boolean
  isZapier?: boolean

  authType?: string
  authFields?: AuthField[]
  triggers: ServiceTrigger[]
  actions: ServiceAction[]
}
