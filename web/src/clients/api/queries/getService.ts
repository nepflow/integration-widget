import apiClient from '..'
import { appHost } from '../../../globals'
import { type Service } from '../../../models/service'

async function getService (key: string, secondServiceKey?: string): Promise<Service> {
  const res = await apiClient.get(`/services/${key}`, {
    params: {
      appHost,
      secondServiceKey
    }
  })
  const result = await res.data

  return result
}

export default getService
