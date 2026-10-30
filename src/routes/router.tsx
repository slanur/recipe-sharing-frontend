import { createBrowserRouter } from 'react-router-dom'
import { PanelLayout } from '@/layouts/PanelLayout'
import { PublicLayout } from '@/layouts/PublicLayout'
import { AboutPage } from '@/pages/AboutPage'
import { LandingPage } from '@/pages/LandingPage'
import { LoginPage } from '@/pages/LoginPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { OrgRecipesPage } from '@/pages/OrgRecipesPage'
import { RecipeCreatePage } from '@/pages/RecipeCreatePage'
import { RecipeDetailPage } from '@/pages/RecipeDetailPage'
import { RecipeEditPage } from '@/pages/RecipeEditPage'
import { RegisterPage } from '@/pages/RegisterPage'
import { TagsPage } from '@/pages/TagsPage'
import { UnauthorizedPage } from '@/pages/UnauthorizedPage'
import { UserRecipesPage } from '@/pages/UserRecipesPage'
import { GuestRoute } from '@/routes/GuestRoute'
import { PrivateRoute } from '@/routes/PrivateRoute'
import { RoleRoute } from '@/routes/RoleRoute'

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/unauthorized', element: <UnauthorizedPage /> },
      {
        element: <GuestRoute />,
        children: [
          { path: '/login', element: <LoginPage /> },
          { path: '/register', element: <RegisterPage /> },
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
          { path: '/recipe/:id', element: <RecipeDetailPage /> },
          {
            element: <RoleRoute allowedRoles={['User']} />,
            children: [
              { path: '/user/recipes', element: <UserRecipesPage /> },
              { path: '/user/recipes/new', element: <RecipeCreatePage /> },
              { path: '/user/recipes/:id/edit', element: <RecipeEditPage /> },
            ],
          },
          {
            element: <RoleRoute allowedRoles={['Organization']} />,
            children: [
              { path: '/org/recipes', element: <OrgRecipesPage /> },
              { path: '/org/tags', element: <TagsPage /> },
            ],
          },
        ],
      },
    ],
  },
])
