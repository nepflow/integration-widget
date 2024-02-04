import { createContext } from 'react'
import { type Config } from '../models/config'

const configSearchParams = new URL(window.location.href).searchParams

export const defaultConfig: Config = {
  backgroundColor: configSearchParams.get('backgroundColor') || '#f5f5f5',
  cardColor: configSearchParams.get('cardColor') || '#fff',
  cardBorderColor: configSearchParams.get('cardBorderColor') || '#fff',
  innerSpace: configSearchParams.has('innerSpace') ? parseInt(configSearchParams.get('innerSpace')!) : 24,
  autoVerticalResize: configSearchParams.get('autoVerticalResize') === 'true',
  customCards: configSearchParams.has('customCards') ? JSON.parse(configSearchParams.get('customCards')!) : [],
}

const ConfigContext = createContext<Config>(defaultConfig)

export default ConfigContext
