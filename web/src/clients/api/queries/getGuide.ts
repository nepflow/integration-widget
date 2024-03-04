import apiClient from '..'
import { appHost } from '../../../globals'
import { type IntegrationGuide } from '../../../models/integrationGuide'

async function getGuide (serviceId: string, secondServiceId: string, triggerId: string, actionId: string, guidedRecipeId?: string): Promise<IntegrationGuide> {
  const res = await apiClient.get(`/services/${serviceId}/guides/${secondServiceId}`, {
    params: {
      appHost,
      guidedRecipeId,
      triggerId,
      actionId
    }
  })
  const result = await res.data

  return result
}

export default getGuide
