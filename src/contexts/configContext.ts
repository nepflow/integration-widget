import { createContext } from 'react'
import { type Config } from '../models/config'

const configSearchParams = new URL(window.location.href).searchParams

export const defaultConfig: Config = {
  theme: configSearchParams.get('theme') as Config['theme'] || 'light',
  backgroundColor: configSearchParams.get('backgroundColor') || '#f5f5f5',
  cardColor: configSearchParams.get('cardColor') || '#fff',
  innerSpace: configSearchParams.has('innerSpace') ? parseInt(configSearchParams.get('innerSpace')!) : 24,
  showShadows: false,
  autoVerticalResize: configSearchParams.get('autoVerticalResize') === 'true'
}

const ConfigContext = createContext<Config>(defaultConfig)

export default ConfigContext
