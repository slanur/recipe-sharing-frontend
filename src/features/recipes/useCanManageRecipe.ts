import { selectRole, selectUserId, useAuthStore } from '@/stores/authStore'
import type { Recipe } from '@/types/recipe'

// API sahip bilgisi dönmezse butonlar gösterilir, son kararı sunucu verir.
export function useCanManageRecipe(recipe: Recipe | null) {
  const role = useAuthStore(selectRole)
  const userId = useAuthStore(selectUserId)

  if (!recipe || role !== 'User') return false
  return recipe.ownerId === null || recipe.ownerId === userId
}
