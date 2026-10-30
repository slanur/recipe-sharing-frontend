import { isAxiosError } from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { getRecipe } from '@/api/items.api'
import type { Recipe } from '@/types/recipe'
import { getErrorMessage } from '@/utils/apiError'

interface RecipeResult {
  requestKey: string
  recipe: Recipe | null
  error: string
  isNotFound: boolean
}

export function useRecipe(id: string) {
  const [reloadCount, setReloadCount] = useState(0)
  const [result, setResult] = useState<RecipeResult | null>(null)
  const requestKey = `${id}:${reloadCount}`

  useEffect(() => {
    let isActive = true
    getRecipe(id)
      .then((recipe) => {
        if (isActive) {
          setResult({ requestKey, recipe, error: '', isNotFound: false })
        }
      })
      .catch((error) => {
        if (isActive) {
          setResult({
            requestKey,
            recipe: null,
            error: getErrorMessage(error, 'Tarif yüklenemedi'),
            isNotFound: isAxiosError(error) && error.response?.status === 404,
          })
        }
      })
    return () => {
      isActive = false
    }
  }, [id, requestKey])

  const reload = useCallback(() => {
    setReloadCount((count) => count + 1)
  }, [])

  const isCurrent = result?.requestKey === requestKey

  return {
    recipe: isCurrent ? result.recipe : null,
    error: isCurrent ? result.error : '',
    isNotFound: isCurrent && result.isNotFound,
    isLoading: !isCurrent,
    reload,
  }
}
