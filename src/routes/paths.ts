import type { Role } from '@/types/auth'

export const HOME_BY_ROLE: Record<Role, string> = {
  User: '/user/recipes',
  Organization: '/org/recipes',
}
