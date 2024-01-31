import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Root from './routes/root'
import Catalog from './routes/catalog'
import Guide from './routes/guide'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/:rootServiceId/guide/:serviceId',
        element: <Guide />
      },
      {
        path: '/:rootServiceId',
        element: <Catalog />
      },
      {
        path: '/',
        element: <Catalog />
      }
    ]
  }
])

function App () {
  return (
    <RouterProvider router={router} />
  )
}

export default App
