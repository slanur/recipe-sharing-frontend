import { HOME_BY_ROLE } from '@/routes/paths'
import {
  selectIsAuthenticated,
  selectRole,
  useAuthStore,
} from '@/stores/authStore'

export function useAccountCta() {
  const isAuthenticated = useAuthStore(selectIsAuthenticated)
  const role = useAuthStore(selectRole)

  if (isAuthenticated && role) {
    return { to: HOME_BY_ROLE[role], label: 'Panelime Git' }
  }
  return { to: '/register', label: 'Ücretsiz Başla' }
}
