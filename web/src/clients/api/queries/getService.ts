import apiClient from '..'
import { type Service } from '../../../models/service'

async function getService (key: string): Promise<Service> {
  const res = await apiClient.get(`/services/${key}`)
  const result = await res.data

  return result
}

export default getService
