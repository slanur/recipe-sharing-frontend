import { apiClient } from '@/api/client'
import type { ApiOrganization } from '@/types/api'

export async function getOrganizations() {
  const { data } = await apiClient.get<ApiOrganization[]>(
    '/organizations/get-all-organizations',
  )
  return data
}
