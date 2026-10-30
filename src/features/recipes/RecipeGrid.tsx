import { useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Pagination } from '@/components/ui/Pagination'
import { Spinner } from '@/components/ui/Spinner'
import { StateMessage } from '@/components/ui/StateMessage'
import { RecipeCard } from '@/features/recipes/RecipeCard'
import type { Recipe } from '@/types/recipe'

interface RecipeGridProps {
  recipes: Recipe[]
  page: number
  totalPages: number
  isLoading: boolean
  error: string
  emptyTitle: string
  emptyDescription?: string
  showDescription?: boolean
  onRetry: () => void
  onPageChange: (page: number) => void
}

export function RecipeGrid({
  recipes,
  page,
  totalPages,
  isLoading,
  error,
  emptyTitle,
  emptyDescription,
  showDescription,
  onRetry,
  onPageChange,
}: RecipeGridProps) {
  const isPastLastPage = !isLoading && !error && page > totalPages

  useEffect(() => {
    if (isPastLastPage) onPageChange(totalPages)
  }, [isPastLastPage, totalPages, onPageChange])

  if (isLoading || isPastLastPage) return <Spinner />

  if (error) {
    return (
      <StateMessage
        title={error}
        action={
          <Button variant="secondary" onClick={onRetry}>
            Tekrar Dene
          </Button>
        }
      />
    )
  }

  if (recipes.length === 0) {
    return <StateMessage title={emptyTitle} description={emptyDescription} />
  }

  return (
    <div className="space-y-6">
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <RecipeCard recipe={recipe} showDescription={showDescription} />
          </li>
        ))}
      </ul>
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={(nextPage) => {
          onPageChange(nextPage)
          window.scrollTo({ top: 0 })
        }}
      />
    </div>
  )
}
