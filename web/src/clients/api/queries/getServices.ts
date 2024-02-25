import apiClient from '..'
import { appHost } from '../../../globals'
import { type Service } from '../../../models/service'

async function getServices (fromServiceKey?: string, search: string = '', skip: number = 0, take: number = 60): Promise<Service[]> {
  const res = await apiClient.get('/services', {
    params: {
      fromServiceKey,
      appHost,
      skip,
      search,
      take
    }
  })
  const result = await res.data

  return result.services
}

export default getServices
