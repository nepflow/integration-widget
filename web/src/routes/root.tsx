import { useEffect, useRef, useState } from 'react'
import RootServiceContext from '../contexts/rootServiceContext'
import { Outlet, useParams } from 'react-router-dom'
import { type Service } from '../models/service'
import getService from '../clients/api/queries/getService'
import ConfigContext, { defaultConfig } from '../contexts/configContext'
import { type Config } from '../models/config'
import postMessageToParent from '../utils/postMessageToParent'
import FullScreenLoading from '../components/FullScreenLoading'

export default function Root () {
  const { rootServiceId } = useParams()
  const [config] = useState<Config>(defaultConfig)
  const [rootService, setRootService] = useState<Service | null>(null)

  useEffect(() => {
    document.documentElement.style.setProperty('--background-color', config.backgroundColor)
    document.documentElement.style.setProperty('--card-color', config.cardColor)
    document.documentElement.style.setProperty('--card-border-color', config.cardBorderColor)
    document.documentElement.style.setProperty('--inner-space', `${+(config.innerSpace)}px`)
  }, [config])

  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (config.autoVerticalResize) {
      const sendHeight = () => {
        if (contentRef.current) {
          const height = contentRef.current.getBoundingClientRect().height

          postMessageToParent({
            action: 'setWidgetHeight',
            data: {
              widgetHeight: height + (config.innerSpace * 2) + 50
            }
          })
        }
      }

      const resizeObserver = new ResizeObserver(() => {
        sendHeight()
      })

      if (contentRef.current) {
        resizeObserver.observe(contentRef.current)
      }

      return () => {
        if (contentRef.current) {
          resizeObserver.unobserve(contentRef.current)
        }
      }
    }
  }, [config.autoVerticalResize])

  useEffect(() => {
    if (rootServiceId) {
      getService(rootServiceId).then(service => { setRootService(service) })
    }
  }, [rootServiceId])

  useEffect(() => {
    postMessageToParent({ action: 'handleLoaded' })
  }, [])

  return (
    <ConfigContext.Provider value={config}>
      <RootServiceContext.Provider value={rootService}>
        <div ref={contentRef}>
          {(rootServiceId && !rootService)
            ? (
            <FullScreenLoading />
              )
            : (
            <Outlet />
              )}
        </div>
      </RootServiceContext.Provider>
    </ConfigContext.Provider>
  )
}
