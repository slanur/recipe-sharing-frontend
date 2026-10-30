import { PageHeader } from '@/components/ui/PageHeader'
import { Spinner } from '@/components/ui/Spinner'
import { RecipeResults } from '@/features/recipes/RecipeResults'
import { RecipeTable } from '@/features/recipes/RecipeTable'
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
    <section className="space-y-7">
      <PageHeader
        title="Tarifler"
        description="Organization'ındaki tüm tarifler."
      />
      <RecipeResults
        recipes={recipes}
        page={page}
        totalPages={totalPages}
        isLoading={isLoading}
        error={error}
        emptyTitle="Henüz tarif yok"
        emptyDescription="Kullanıcılar tarif ekledikçe burada görünecek."
        skeleton={<Spinner />}
        onRetry={reload}
        onPageChange={setPage}
      >
        <RecipeTable recipes={recipes} />
      </RecipeResults>
    </section>
  )
}
