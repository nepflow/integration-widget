import apiClient from '..'
import { type Service } from '../../../models/service'

async function getServices (search: string = '', skip: number = 0): Promise<Service[]> {
  const res = await apiClient.get(`/services?skip=${skip}&search=${search}`)
  const result = await res.data

  return result.services
}

export default getServices
