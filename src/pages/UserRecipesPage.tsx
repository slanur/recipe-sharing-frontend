import { Link } from 'react-router-dom'
import { RecipeFilters } from '@/features/recipes/RecipeFilters'
import { RecipeGrid } from '@/features/recipes/RecipeGrid'
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
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-stone-950">Tarifler</h1>
        <Link
          to="/user/recipes/new"
          className="rounded-lg bg-orange-700 px-4 py-2 text-sm font-medium text-white hover:bg-orange-800"
        >
          Yeni Tarif
        </Link>
      </div>
      <RecipeFilters
        search={search}
        tagId={tagId}
        sort={sort}
        tags={tags}
        onSearchChange={filters.setSearch}
        onTagChange={filters.setTagId}
        onSortChange={filters.setSort}
      />
      <RecipeGrid
        recipes={recipes}
        page={page}
        totalPages={totalPages}
        isLoading={isLoading}
        error={error}
        emptyTitle="Tarif bulunamadı"
        emptyDescription="Aramanızı veya filtrelerinizi değiştirmeyi deneyin."
        onRetry={reload}
        onPageChange={filters.setPage}
      />
    </section>
  )
}
