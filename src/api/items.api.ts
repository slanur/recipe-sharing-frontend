import {
  toItemPayload,
  toItemQuery,
  toRecipe,
  toRecipePage,
} from '@/adapters/recipe.adapter'
import { apiClient } from '@/api/client'
import type { ApiItem, ApiItemPage } from '@/types/api'
import type { RecipeInput, RecipeQuery } from '@/types/recipe'

export async function getRecipes(query: RecipeQuery = {}) {
  const { data } = await apiClient.get<ApiItemPage>('/items/get-items', {
    params: toItemQuery(query),
  })
  return toRecipePage(data)
}

export async function getRecipe(id: string) {
  const { data } = await apiClient.get<ApiItem>(`/items/get-item/${id}`)
  return toRecipe(data)
}

export async function createRecipe(input: RecipeInput) {
  const { data } = await apiClient.post<ApiItem>(
    '/items/add-item',
    toItemPayload(input),
  )
  return toRecipe(data)
}

export async function updateRecipe(id: string, input: RecipeInput) {
  const { data } = await apiClient.patch<ApiItem>(
    `/items/update-item/${id}`,
    toItemPayload(input),
  )
  return toRecipe(data)
}

export async function deleteRecipe(id: string) {
  await apiClient.delete(`/items/delete-item/${id}`)
}

export async function addRecipeImage(recipeId: string, file: File) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('itemId', recipeId)
  await apiClient.post('/items/add-item-photo', formData)
}

// Postman'de görsel silme endpoint'i yok; bu yol varsayımdır ve sadece sahte API'de çalışır.
export async function deleteRecipeImage(recipeId: string, imageId: string) {
  await apiClient.delete(`/items/delete-item-photo/${recipeId}/${imageId}`)
}
