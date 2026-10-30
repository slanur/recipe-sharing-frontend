import { CloudOff } from 'lucide-react'
import { useEffect, type ReactNode } from 'react'
import { Button } from '@/components/ui/Button'
import { Pagination } from '@/components/ui/Pagination'
import { StateMessage } from '@/components/ui/StateMessage'
import type { Recipe } from '@/types/recipe'

interface RecipeResultsProps {
  recipes: Recipe[]
  page: number
  totalPages: number
  isLoading: boolean
  error: string
  emptyTitle: string
  emptyDescription?: string
  skeleton: ReactNode
  onRetry: () => void
  onPageChange: (page: number) => void
  children: ReactNode
}

export function RecipeResults({
  recipes,
  page,
  totalPages,
  isLoading,
  error,
  emptyTitle,
  emptyDescription,
  skeleton,
  onRetry,
  onPageChange,
  children,
}: RecipeResultsProps) {
  const isPastLastPage = !isLoading && !error && page > totalPages

  useEffect(() => {
    if (isPastLastPage) onPageChange(totalPages)
  }, [isPastLastPage, totalPages, onPageChange])

  if (isLoading || isPastLastPage) return skeleton

  if (error) {
    return (
      <StateMessage
        icon={CloudOff}
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
    <div className="space-y-8">
      {children}
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
