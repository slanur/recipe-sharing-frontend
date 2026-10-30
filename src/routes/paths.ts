import type { Location } from 'react-router-dom'
import type { Role } from '@/types/auth'

export const HOME_BY_ROLE: Record<Role, string> = {
  User: '/user/recipes',
  Organization: '/org/recipes',
}

const PANEL_PREFIX_BY_ROLE: Record<Role, string> = {
  User: '/user/',
  Organization: '/org/',
}

// Saklanan adres başka bir role aitse (ör. çıkış sonrası farklı hesapla giriş) panele gidilir.
export function getPostLoginPath(role: Role | null, from?: Location) {
  if (!role) return '/unauthorized'
  if (!from) return HOME_BY_ROLE[role]

  const isAllowed =
    from.pathname.startsWith(PANEL_PREFIX_BY_ROLE[role]) ||
    from.pathname.startsWith('/recipe/')

  return isAllowed ? `${from.pathname}${from.search}` : HOME_BY_ROLE[role]
}
