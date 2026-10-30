import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { buttonClass } from '@/components/ui/buttonStyles'
import { PageHeader } from '@/components/ui/PageHeader'
import { RecipeCard } from '@/features/recipes/RecipeCard'
import { RecipeCardSkeleton } from '@/features/recipes/RecipeCardSkeleton'
import { RecipeFilters } from '@/features/recipes/RecipeFilters'
import { RecipeResults } from '@/features/recipes/RecipeResults'
import {
  RECIPES_PER_PAGE,
  useRecipeFilters,
} from '@/features/recipes/useRecipeFilters'
import { useRecipes } from '@/features/recipes/useRecipes'
import { useTags } from '@/features/tags/useTags'

export function UserRecipesPage() {
  const filters = useRecipeFilters()
  const { search, tagId, sort, page } = filters
  const { tags } = useTags()
  const { recipes, totalPages, isLoading, error, reload } = useRecipes({
    search,
    tagId,
    sort,
    page,
    limit: RECIPES_PER_PAGE,
  })

  return (
    <section className="space-y-7">
      <PageHeader
        title="Keşfet"
        description="Bugün sofraya ne koyacağını birlikte bulalım."
        action={
          <Link
            to="/user/recipes/new"
            className={buttonClass('primary', 'md', 'max-lg:hidden')}
          >
            <Plus aria-hidden="true" className="h-4.5 w-4.5" />
            Yeni Tarif
          </Link>
        }
      />
      <RecipeFilters
        search={search}
        tagId={tagId}
        sort={sort}
        tags={tags}
        onSearchChange={filters.setSearch}
        onTagChange={filters.setTagId}
        onSortChange={filters.setSort}
      />
      <RecipeResults
        recipes={recipes}
        page={page}
        totalPages={totalPages}
        isLoading={isLoading}
        error={error}
        emptyTitle="Tarif bulunamadı"
        emptyDescription="Aramanızı veya filtrelerinizi değiştirmeyi deneyin."
        skeleton={<RecipeCardSkeleton />}
        onRetry={reload}
        onPageChange={filters.setPage}
      >
        <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {recipes.map((recipe) => (
            <li key={recipe.id} className="animate-rise">
              <RecipeCard recipe={recipe} />
            </li>
          ))}
        </ul>
      </RecipeResults>
    </section>
  )
}
