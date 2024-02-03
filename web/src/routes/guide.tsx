import 'react'
import ServiceGuide from '../components/ServiceGuide/ServiceGuide'
import { useParams } from 'react-router-dom'

export default function Guide () {
  const { rootServiceId, serviceId } = useParams()

  return (
    <ServiceGuide
      serviceId={rootServiceId}
      connectedServiceId={serviceId}
    />
  )
}
