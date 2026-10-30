import { jwtDecode } from 'jwt-decode'
import type { Role } from '@/types/auth'

// PDF "User | Organization", API dokümanı "User" ve "Organization User" diyor.
// Claim değerleri canlı doğrulanmadı.
const ROLE_BY_CLAIM: Record<string, Role> = {
  User: 'User',
  Organization: 'Organization',
  'Organization User': 'Organization',
}

function readClaims(accessToken: string) {
  try {
    return jwtDecode<{ role?: string; sub?: string }>(accessToken)
  } catch {
    return null
  }
}

export function isReadableToken(accessToken: string) {
  return readClaims(accessToken) !== null
}

export function getRole(accessToken: string): Role | null {
  const role = readClaims(accessToken)?.role
  return (role && ROLE_BY_CLAIM[role]) || null
}

export function getUserId(accessToken: string) {
  return readClaims(accessToken)?.sub ?? null
}
