import { useNavigate } from 'react-router-dom'
import { createRecipe } from '@/api/items.api'
import { RecipeForm } from '@/features/recipes/RecipeForm'
import type { RecipeInput } from '@/types/recipe'

export function RecipeCreatePage() {
  const navigate = useNavigate()

  async function handleSubmit(input: RecipeInput) {
    const recipe = await createRecipe(input)
    navigate(`/user/recipes/${recipe.id}/edit`, {
      replace: true,
      state: { created: true },
    })
  }

  return (
    <section className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-semibold text-stone-950">Yeni Tarif</h1>
      <RecipeForm
        submitLabel="Tarifi Kaydet"
        cancelTo="/user/recipes"
        onSubmit={handleSubmit}
      />
    </section>
  )
}
