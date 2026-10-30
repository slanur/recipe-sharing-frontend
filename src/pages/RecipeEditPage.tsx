import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom'
import { updateRecipe } from '@/api/items.api'
import { Alert } from '@/components/ui/Alert'
import { Button } from '@/components/ui/Button'
import { Spinner } from '@/components/ui/Spinner'
import { StateMessage } from '@/components/ui/StateMessage'
import { RecipeForm } from '@/features/recipes/RecipeForm'
import { RecipeImages } from '@/features/recipes/RecipeImages'
import { useCanManageRecipe } from '@/features/recipes/useCanManageRecipe'
import { useRecipe } from '@/features/recipes/useRecipe'
import type { RecipeInput } from '@/types/recipe'

export function RecipeEditPage() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { recipe, isLoading, error, isNotFound, reload } = useRecipe(id)
  const canManage = useCanManageRecipe(recipe)

  async function handleSubmit(input: RecipeInput) {
    await updateRecipe(id, input)
    navigate(`/recipe/${id}`)
  }

  if (isLoading) return <Spinner />

  if (isNotFound) {
    return (
      <StateMessage
        title="Tarif bulunamadı"
        action={
          <Link to="/user/recipes" className="font-medium text-orange-700">
            Tariflere dön
          </Link>
        }
      />
    )
  }

  if (error || !recipe) {
    return (
      <StateMessage
        title={error}
        action={
          <Button variant="secondary" onClick={reload}>
            Tekrar Dene
          </Button>
        }
      />
    )
  }

  if (!canManage) return <Navigate to="/unauthorized" replace />

  return (
    <section className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-semibold text-stone-950">Tarifi Düzenle</h1>
      {location.state?.created && (
        <Alert tone="success">
          Tarif oluşturuldu. Şimdi görsel ekleyebilirsiniz.
        </Alert>
      )}
      <RecipeImages recipeId={id} initialImages={recipe.images} />
      <RecipeForm
        recipe={recipe}
        submitLabel="Değişiklikleri Kaydet"
        cancelTo={`/recipe/${id}`}
        onSubmit={handleSubmit}
      />
    </section>
  )
}
