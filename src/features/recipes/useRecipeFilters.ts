import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { RecipeSort } from '@/types/recipe'

export const RECIPES_PER_PAGE = 9

function parsePage(value: string | null) {
  const page = Number(value)
  return Number.isInteger(page) && page > 0 ? page : 1
}

export function useRecipeFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get('q') ?? ''
  const tagId = searchParams.get('tag') ?? ''
  const sort: RecipeSort =
    searchParams.get('sort') === 'oldest' ? 'oldest' : 'newest'
  const page = parsePage(searchParams.get('page'))

  const updateParams = useCallback(
    (changes: Record<string, string>, options?: { replace: boolean }) => {
      setSearchParams((current) => {
        const next = new URLSearchParams(current)
        Object.entries(changes).forEach(([key, value]) => {
          if (value) next.set(key, value)
          else next.delete(key)
        })
        return next
      }, options)
    },
    [setSearchParams],
  )

  const setSearch = useCallback(
    (value: string) =>
      updateParams({ q: value, page: '' }, { replace: true }),
    [updateParams],
  )
  const setTagId = useCallback(
    (value: string) => updateParams({ tag: value, page: '' }),
    [updateParams],
  )
  const setSort = useCallback(
    (value: RecipeSort) =>
      updateParams({ sort: value === 'oldest' ? value : '', page: '' }),
    [updateParams],
  )
  const setPage = useCallback(
    (value: number) => updateParams({ page: value > 1 ? String(value) : '' }),
    [updateParams],
  )

  return { search, tagId, sort, page, setSearch, setTagId, setSort, setPage }
}
