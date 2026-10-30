import { createBrowserRouter } from 'react-router-dom'
import { PanelLayout } from '@/layouts/PanelLayout'
import { PublicLayout } from '@/layouts/PublicLayout'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { PlaceholderPage } from '@/pages/PlaceholderPage'
import { UnauthorizedPage } from '@/pages/UnauthorizedPage'
import { GuestRoute } from '@/routes/GuestRoute'
import { PrivateRoute } from '@/routes/PrivateRoute'
import { RoleRoute } from '@/routes/RoleRoute'

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <PlaceholderPage title="Ana Sayfa" /> },
      { path: '/about', element: <PlaceholderPage title="Hakkında" /> },
      { path: '/unauthorized', element: <UnauthorizedPage /> },
      {
        element: <GuestRoute />,
        children: [
          { path: '/login', element: <PlaceholderPage title="Giriş Yap" /> },
          { path: '/register', element: <PlaceholderPage title="Kayıt Ol" /> },
        ],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <PanelLayout />,
        children: [
          {
            path: '/recipe/:id',
            element: <PlaceholderPage title="Tarif Detayı" />,
          },
          {
            element: <RoleRoute allowedRoles={['User']} />,
            children: [
              {
                path: '/user/recipes',
                element: <PlaceholderPage title="Tarifler" />,
              },
              {
                path: '/user/recipes/new',
                element: <PlaceholderPage title="Yeni Tarif" />,
              },
              {
                path: '/user/recipes/:id/edit',
                element: <PlaceholderPage title="Tarifi Düzenle" />,
              },
            ],
          },
          {
            element: <RoleRoute allowedRoles={['Organization']} />,
            children: [
              {
                path: '/org/recipes',
                element: <PlaceholderPage title="Organization Tarifleri" />,
              },
              {
                path: '/org/tags',
                element: <PlaceholderPage title="Tag Yönetimi" />,
              },
            ],
          },
        ],
      },
    ],
  },
])
