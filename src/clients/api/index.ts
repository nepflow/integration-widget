import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_BASE_URL,
  timeout: 10000
})

export default apiClient
