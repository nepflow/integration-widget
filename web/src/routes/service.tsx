import 'react'
import ServicePage from '../components/ServicePage'
import { useParams } from 'react-router-dom'

export default function Service () {
  const { rootServiceId, serviceId } = useParams()

  return (
    <>
      <ServicePage
        rootServiceId={rootServiceId!}
        serviceId={serviceId!}
      />
    </>
  )
}
