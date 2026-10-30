import {
  ArrowLeft,
  Clock,
  CloudOff,
  ImageOff,
  Pencil,
  Trash2,
} from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { deleteRecipe } from '@/api/items.api'
import { Alert } from '@/components/ui/Alert'
import { Button } from '@/components/ui/Button'
import { buttonClass } from '@/components/ui/buttonStyles'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { Spinner } from '@/components/ui/Spinner'
import { StateMessage } from '@/components/ui/StateMessage'
import { useCanManageRecipe } from '@/features/recipes/useCanManageRecipe'
import { useRecipe } from '@/features/recipes/useRecipe'
import { HOME_BY_ROLE } from '@/routes/paths'
import { selectRole, useAuthStore } from '@/stores/authStore'
import { useToastStore } from '@/stores/toastStore'
import { getErrorMessage } from '@/utils/apiError'

export function RecipeDetailPage() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const role = useAuthStore(selectRole)
  const showToast = useToastStore((state) => state.showToast)
  const { recipe, isLoading, error, isNotFound, reload } = useRecipe(id)
  const canManage = useCanManageRecipe(recipe)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState('')

  const listPath = role ? HOME_BY_ROLE[role] : '/'

  async function handleDelete() {
    setIsDeleting(true)
    setDeleteError('')
    try {
      await deleteRecipe(id)
      showToast('Tarif silindi')
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
          <Link to={listPath} className={buttonClass('secondary')}>
            Tariflere Dön
          </Link>
        }
      />
    )
  }

  if (error || !recipe) {
    return (
      <StateMessage
        icon={CloudOff}
        title={error}
        action={
          <Button variant="secondary" onClick={reload}>
            Tekrar Dene
          </Button>
        }
      />
    )
  }

  const mainImage = recipe.images[selectedImage] ?? recipe.images[0]
  const [summary, ...steps] = recipe.description.split(/\n\s*\n/)

  return (
    <article className="animate-rise space-y-8">
      <title>{`${recipe.title} · Sofra`}</title>
      <Link
        to={listPath}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-soft transition-colors hover:text-ink"
      >
        <ArrowLeft aria-hidden="true" className="h-4 w-4" />
        Tariflere dön
      </Link>

      {deleteError && <Alert tone="error">{deleteError}</Alert>}

      <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:items-center">
        <div className="space-y-3">
          {mainImage ? (
            <img
              src={mainImage.url}
              alt={recipe.title}
              className="aspect-4/3 w-full rounded-3xl bg-sand-200 object-cover shadow-card"
            />
          ) : (
            <div className="flex aspect-4/3 flex-col items-center justify-center gap-2 rounded-3xl bg-sand-100 text-ink-muted">
              <ImageOff aria-hidden="true" className="h-8 w-8" />
              <p className="text-sm font-medium">Bu tarifte görsel yok</p>
            </div>
          )}
          {recipe.images.length > 1 && (
            <ul className="flex gap-2.5">
              {recipe.images.map((image, index) => (
                <li key={image.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedImage(index)}
                    aria-label={`Görsel ${index + 1}`}
                    aria-pressed={image.id === mainImage?.id}
                    className={`block overflow-hidden rounded-xl border-2 transition-colors ${image.id === mainImage?.id ? 'border-brand-600' : 'border-transparent'}`}
                  >
                    <img
                      src={image.url}
                      alt=""
                      className="h-16 w-20 object-cover"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          {recipe.tags.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {recipe.tags.map((tag) => (
                <li
                  key={tag.id}
                  className="rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700"
                >
                  {tag.name}
                </li>
              ))}
            </ul>
          )}
          <h1 className="mt-4 font-display text-4xl leading-tight font-semibold tracking-tight text-ink sm:text-5xl">
            {recipe.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">{summary}</p>
          <p className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 font-semibold text-ink shadow-card">
            <Clock aria-hidden="true" className="h-4.5 w-4.5 text-brand-600" />
            {recipe.prepTimeMinutes} dakika
          </p>
          {canManage && (
            <div className="mt-6 flex gap-2.5">
              <Link
                to={`/user/recipes/${recipe.id}/edit`}
                className={buttonClass('secondary')}
              >
                <Pencil aria-hidden="true" className="h-4 w-4" />
                Düzenle
              </Link>
              <Button variant="ghost" onClick={() => setIsConfirmOpen(true)}>
                <Trash2 aria-hidden="true" className="h-4 w-4" />
                Sil
              </Button>
            </div>
          )}
        </div>
      </div>

      {steps.length > 0 && (
        <section className="max-w-3xl border-t border-sand-200 pt-8">
          <h2 className="font-display text-2xl font-semibold text-ink">
            Yapılışı
          </h2>
          <ol className="mt-5 space-y-5">
            {steps.map((step, index) => (
              <li key={step} className="flex gap-4">
                <span className="font-display text-3xl leading-none font-medium text-brand-600 italic">
                  {index + 1}
                </span>
                <p className="leading-relaxed whitespace-pre-line text-ink">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </section>
      )}

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
