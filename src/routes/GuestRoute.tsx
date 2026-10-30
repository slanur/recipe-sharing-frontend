import { Navigate, Outlet } from 'react-router-dom'
import { HOME_BY_ROLE } from '@/routes/paths'
import {
  selectIsAuthenticated,
  selectRole,
  useAuthStore,
} from '@/stores/authStore'

export function GuestRoute() {
  const isAuthenticated = useAuthStore(selectIsAuthenticated)
  const role = useAuthStore(selectRole)

  if (isAuthenticated) {
    return <Navigate to={role ? HOME_BY_ROLE[role] : '/unauthorized'} replace />
  }
  return <Outlet />
}
