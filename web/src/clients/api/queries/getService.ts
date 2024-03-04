import apiClient from '..'
import { appHost } from '../../../globals'
import { type Service } from '../../../models/service'

async function getService (key: string, secondServiceId?: string): Promise<Service> {
  const res = await apiClient.get(`/services/${key}`, {
    params: {
      appHost,
      secondServiceId
    }
  })
  const result = await res.data

  return result
}

export default getService
