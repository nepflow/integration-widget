import { createContext } from 'react'
import { type Service } from '../models/service'

const RootServiceContext = createContext<Service | null>(null)

export default RootServiceContext
