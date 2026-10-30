import { apiClient } from '@/api/client'
import type { ApiTag } from '@/types/api'

export async function getTags() {
  const { data } = await apiClient.get<ApiTag[]>('/tags/get-tags')
  return data
}

export async function createTag(name: string) {
  const { data } = await apiClient.post<ApiTag>('/tags/create-tag', { name })
  return data
}

export async function updateTag(id: string, name: string) {
  const { data } = await apiClient.put<ApiTag>(`/tags/update-tag/${id}`, {
    name,
  })
  return data
}

export async function deleteTag(id: string) {
  await apiClient.delete(`/tags/delete-tag/${id}`)
}
