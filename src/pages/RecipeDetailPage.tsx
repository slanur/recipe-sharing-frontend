import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { deleteRecipe } from '@/api/items.api'
import { Alert } from '@/components/ui/Alert'
import { Button } from '@/components/ui/Button'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { Spinner } from '@/components/ui/Spinner'
import { StateMessage } from '@/components/ui/StateMessage'
import { useCanManageRecipe } from '@/features/recipes/useCanManageRecipe'
import { useRecipe } from '@/features/recipes/useRecipe'
import { HOME_BY_ROLE } from '@/routes/paths'
import { selectRole, useAuthStore } from '@/stores/authStore'
import { getErrorMessage } from '@/utils/apiError'

export function RecipeDetailPage() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const role = useAuthStore(selectRole)
  const { recipe, isLoading, error, isNotFound, reload } = useRecipe(id)
  const canManage = useCanManageRecipe(recipe)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState('')

  const listPath = role ? HOME_BY_ROLE[role] : '/'

  async function handleDelete() {
    setIsDeleting(true)
    setDeleteError('')
    try {
      await deleteRecipe(id)
      navigate(listPath, { replace: true })
    } catch (failure) {
      setDeleteError(getErrorMessage(failure, 'Tarif silinemedi'))
      setIsDeleting(false)
      setIsConfirmOpen(false)
    }
  }

  if (isLoading) return <Spinner />

  if (isNotFound) {
    return (
      <StateMessage
        title="Tarif bulunamadı"
        description="Aradığınız tarif silinmiş veya taşınmış olabilir."
        action={
          <Link to={listPath} className="font-medium text-orange-700">
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

  return (
    <article className="mx-auto max-w-3xl space-y-6">
      <Link to={listPath} className="text-sm font-medium text-orange-700">
        ← Tariflere dön
      </Link>

      {deleteError && <Alert tone="error">{deleteError}</Alert>}

      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-stone-950">
            {recipe.title}
          </h1>
          <p className="mt-1 text-sm text-stone-600">
            {recipe.prepTimeMinutes} dakika
          </p>
        </div>
        {canManage && (
          <div className="flex gap-2">
            <Link
              to={`/user/recipes/${recipe.id}/edit`}
              className="rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-800 hover:bg-stone-100"
            >
              Düzenle
            </Link>
            <Button variant="danger" onClick={() => setIsConfirmOpen(true)}>
              Sil
            </Button>
          </div>
        )}
      </header>

      {recipe.images.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {recipe.images.map((image) => (
            <img
              key={image.id}
              src={image.url}
              alt={recipe.title}
              className="aspect-4/3 w-full rounded-2xl object-cover"
            />
          ))}
        </div>
      ) : (
        <div className="flex aspect-video items-center justify-center rounded-2xl bg-stone-100 text-sm text-stone-500">
          Görsel yok
        </div>
      )}

      {recipe.tags.length > 0 && (
        <ul className="flex flex-wrap gap-2">
          {recipe.tags.map((tag) => (
            <li
              key={tag.id}
              className="rounded-full bg-orange-50 px-3 py-1 text-sm font-medium text-orange-800"
            >
              {tag.name}
            </li>
          ))}
        </ul>
      )}

      <p className="whitespace-pre-line text-stone-800">{recipe.description}</p>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        title="Tarif silinsin mi?"
        description={`"${recipe.title}" kalıcı olarak silinecek.`}
        confirmLabel="Sil"
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </article>
  )
}
