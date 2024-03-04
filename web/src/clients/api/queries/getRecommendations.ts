import apiClient from '..'
import { type Recommendation } from '../../../models/recommendation'

async function getRecommendations (serviceId: string, secondServiceId: string): Promise<Recommendation[]> {
  const res = await apiClient.get('/services/recommendations', {
    params: {
      serviceId,
      secondServiceId
    }
  })
  const result = await res.data

  return result.recommendations
}

export default getRecommendations
