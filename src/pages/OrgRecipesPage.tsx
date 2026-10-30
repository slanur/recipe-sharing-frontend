import { RecipeGrid } from '@/features/recipes/RecipeGrid'
import {
  RECIPES_PER_PAGE,
  useRecipeFilters,
} from '@/features/recipes/useRecipeFilters'
import { useRecipes } from '@/features/recipes/useRecipes'

export function OrgRecipesPage() {
  const { page, setPage } = useRecipeFilters()
  const { recipes, totalPages, isLoading, error, reload } = useRecipes({
    page,
    limit: RECIPES_PER_PAGE,
  })

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold text-stone-950">Tarifler</h1>
      <RecipeGrid
        recipes={recipes}
        page={page}
        totalPages={totalPages}
        isLoading={isLoading}
        error={error}
        emptyTitle="Henüz tarif yok"
        showDescription={false}
        onRetry={reload}
        onPageChange={setPage}
      />
    </section>
  )
}
