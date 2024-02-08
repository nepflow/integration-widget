import apiClient from '..'
import { appHost } from '../../../globals'
import { type Service } from '../../../models/service'

async function getService (key: string): Promise<Service> {
  const res = await apiClient.get(`/services/${key}`, {
    params: {
      appHost
    }
  })
  const result = await res.data

  return result
}

export default getService
