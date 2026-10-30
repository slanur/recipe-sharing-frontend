import { useNavigate } from 'react-router-dom'
import { createRecipe } from '@/api/items.api'
import { PageHeader } from '@/components/ui/PageHeader'
import { RecipeForm } from '@/features/recipes/RecipeForm'
import { useToastStore } from '@/stores/toastStore'
import type { RecipeInput } from '@/types/recipe'

export function RecipeCreatePage() {
  const navigate = useNavigate()
  const showToast = useToastStore((state) => state.showToast)

  async function handleSubmit(input: RecipeInput) {
    const recipe = await createRecipe(input)
    showToast('Tarif oluşturuldu')
    navigate(`/user/recipes/${recipe.id}/edit`, {
      replace: true,
      state: { created: true },
    })
  }

  return (
    <section className="mx-auto max-w-3xl space-y-7">
      <PageHeader
        title="Yeni Tarif"
        description="Tarifini yaz, ardından görsellerini ekle."
      />
      <RecipeForm
        submitLabel="Tarifi Kaydet"
        cancelTo="/user/recipes"
        onSubmit={handleSubmit}
      />
    </section>
  )
}
