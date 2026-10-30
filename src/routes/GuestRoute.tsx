import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { getPostLoginPath } from '@/routes/paths'
import {
  selectIsAuthenticated,
  selectRole,
  useAuthStore,
} from '@/stores/authStore'

export function GuestRoute() {
  const isAuthenticated = useAuthStore(selectIsAuthenticated)
  const role = useAuthStore(selectRole)
  const location = useLocation()

  if (isAuthenticated) {
    return <Navigate to={getPostLoginPath(role, location.state?.from)} replace />
  }
  return <Outlet />
}
