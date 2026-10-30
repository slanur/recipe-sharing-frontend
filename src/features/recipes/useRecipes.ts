import { useCallback, useEffect, useState } from 'react'
import { getRecipes } from '@/api/items.api'
import type { RecipePage, RecipeQuery } from '@/types/recipe'
import { getErrorMessage } from '@/utils/apiError'

interface RecipesResult {
  requestKey: string
  page: RecipePage | null
  error: string
}

export function useRecipes(query: RecipeQuery) {
  const [reloadCount, setReloadCount] = useState(0)
  const [result, setResult] = useState<RecipesResult | null>(null)
  const queryKey = JSON.stringify(query)
  const requestKey = `${queryKey}:${reloadCount}`

  useEffect(() => {
    let isActive = true
    getRecipes(JSON.parse(queryKey) as RecipeQuery)
      .then((page) => {
        if (isActive) setResult({ requestKey, page, error: '' })
      })
      .catch((error) => {
        if (isActive) {
          setResult({
            requestKey,
            page: null,
            error: getErrorMessage(error, 'Tarifler yüklenemedi'),
          })
        }
      })
    return () => {
      isActive = false
    }
  }, [queryKey, requestKey])

  const reload = useCallback(() => {
    setReloadCount((count) => count + 1)
  }, [])

  const isCurrent = result?.requestKey === requestKey

  return {
    recipes: isCurrent ? (result.page?.recipes ?? []) : [],
    totalPages: isCurrent ? (result.page?.totalPages ?? 1) : 1,
    isLoading: !isCurrent,
    error: isCurrent ? result.error : '',
    reload,
  }
}
