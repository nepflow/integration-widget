import { useEffect, useMemo, useState } from 'react'
import FullScreenLoading from '../FullScreenLoading'
import { Outlet, useLocation } from 'react-router-dom'
import { type Service } from '../../models/service'
import getService from '../../clients/api/queries/getService'
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs'
import ServiceContext from '../../contexts/serviceContext'

interface Props {
  rootServiceId: string
  serviceId: string
}

export default function ServicePage ({ rootServiceId, serviceId }: Props) {
  const location = useLocation()
  const { pathname } = location
  const [service, setService] = useState<Service>()

  const isGuideOpened = useMemo(() => pathname.includes('/guide/auto'), [pathname])

  useEffect(() => {
    if (serviceId) {
      getService(serviceId, rootServiceId).then((service) => { setService(service) })
    };
  }, [serviceId])

  if (!service) {
    return (
      <FullScreenLoading />
    )
  }

  return (
    <ServiceContext.Provider value={service}>
      <Breadcrumbs
        items={[
          { title: 'Catalog', path: `/${rootServiceId}` },
          { title: service.name, path: isGuideOpened ? `/${rootServiceId}/service/${serviceId}` : undefined },
          isGuideOpened ? { title: 'Guide' } : undefined
        ]}
      />

      <Outlet />
    </ServiceContext.Provider>
  )
}
