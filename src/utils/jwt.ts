import { jwtDecode } from 'jwt-decode'
import type { Role } from '@/types/auth'

// PDF "User | Organization", API dokümanı "User" ve "Organization User" diyor.
// Claim değerleri canlı doğrulanmadı.
const ROLE_BY_CLAIM: Record<string, Role> = {
  User: 'User',
  Organization: 'Organization',
  'Organization User': 'Organization',
}

export function getRole(accessToken: string): Role | null {
  try {
    const { role } = jwtDecode<{ role?: string }>(accessToken)
    return (role && ROLE_BY_CLAIM[role]) || null
  } catch {
    return null
  }
}

export function getUserId(accessToken: string) {
  try {
    return jwtDecode<{ sub?: string }>(accessToken).sub ?? null
  } catch {
    return null
  }
}
