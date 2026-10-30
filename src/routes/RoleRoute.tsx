import { Navigate, Outlet } from 'react-router-dom'
import { selectRole, useAuthStore } from '@/stores/authStore'
import type { Role } from '@/types/auth'

interface RoleRouteProps {
  allowedRoles: Role[]
}

export function RoleRoute({ allowedRoles }: RoleRouteProps) {
  const role = useAuthStore(selectRole)

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />
  }
  return <Outlet />
}
