import apiClient from '..'
import { type Recommendation } from '../../../models/recommendation'

async function getRecommendations (serviceKey: string, secondServiceKey: string): Promise<Recommendation[]> {
  const res = await apiClient.get('/services/recommendations', {
    params: {
      serviceKey,
      secondServiceKey
    }
  })
  const result = await res.data

  return result.recommendations
}

export default getRecommendations
