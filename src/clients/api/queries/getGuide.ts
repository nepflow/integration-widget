import apiClient from '..'
import { type IntegrationGuide } from '../../../models/integrationGuide'

async function getGuide (serviceId: string, secondServiceId: string, triggerId: string, actionId: string): Promise<IntegrationGuide> {
  const res = await apiClient.get(`/services/${serviceId}/guide/${secondServiceId}/triggers/${triggerId}/actions/${actionId}`)
  const result = await res.data

  return result
}

export default getGuide
