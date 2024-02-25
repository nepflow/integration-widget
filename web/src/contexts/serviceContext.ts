import { createContext } from 'react'
import { type Service } from '../models/service'

const ServiceContext = createContext<Service | null>(null)

export default ServiceContext
