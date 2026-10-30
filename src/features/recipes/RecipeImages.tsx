import { useState, type ChangeEvent } from 'react'
import {
  addRecipeImage,
  deleteRecipeImage,
  getRecipe,
} from '@/api/items.api'
import { Alert } from '@/components/ui/Alert'
import { Button } from '@/components/ui/Button'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import type { RecipeImage } from '@/types/recipe'
import { getErrorMessage } from '@/utils/apiError'

const MAX_IMAGE_MB = 5

interface RecipeImagesProps {
  recipeId: string
  initialImages: RecipeImage[]
}

export function RecipeImages({ recipeId, initialImages }: RecipeImagesProps) {
  const [images, setImages] = useState(initialImages)
  const [imageToDelete, setImageToDelete] = useState<RecipeImage | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState('')

  async function handleFilesChange(event: ChangeEvent<HTMLInputElement>) {
    const files = [...(event.target.files ?? [])]
    event.target.value = ''
    if (files.length === 0) return

    const invalidFile = files.find(
      (file) =>
        !file.type.startsWith('image/') ||
        file.size > MAX_IMAGE_MB * 1024 * 1024,
    )
    if (invalidFile) {
      setError(
        `"${invalidFile.name}" yüklenemedi. En fazla ${MAX_IMAGE_MB} MB boyutunda görsel seçin.`,
      )
      return
    }

    setError('')
    setIsUploading(true)
    try {
      for (const file of files) await addRecipeImage(recipeId, file)
    } catch (uploadError) {
      setError(getErrorMessage(uploadError, 'Görsel yüklenemedi'))
    }

    // Yükleme yarıda kesilse bile eklenebilen görseller listede görünür.
    try {
      setImages((await getRecipe(recipeId)).images)
    } catch (loadError) {
      setError(getErrorMessage(loadError, 'Görseller yenilenemedi'))
    } finally {
      setIsUploading(false)
    }
  }

  async function handleDelete() {
    if (!imageToDelete) return

    setIsDeleting(true)
    setError('')
    try {
      await deleteRecipeImage(recipeId, imageToDelete.id)
      setImages((current) =>
        current.filter((image) => image.id !== imageToDelete.id),
      )
    } catch (deleteError) {
      setError(getErrorMessage(deleteError, 'Görsel silinemedi'))
    } finally {
      setIsDeleting(false)
      setImageToDelete(null)
    }
  }

  return (
    <section className="space-y-4 rounded-2xl border border-stone-200 bg-white p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-semibold text-stone-950">Görseller</h2>
          <p className="text-sm text-stone-600">
            Görsel değişiklikleri hemen kaydedilir.
          </p>
        </div>
        <label
          className={`rounded-lg bg-orange-700 px-4 py-2 text-sm font-medium text-white focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-orange-700 hover:bg-orange-800 ${isUploading ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
        >
          {isUploading ? 'Yükleniyor...' : 'Görsel Ekle'}
          <input
            type="file"
            accept="image/*"
            multiple
            disabled={isUploading}
            onChange={handleFilesChange}
            className="sr-only"
          />
        </label>
      </div>

      {error && <Alert tone="error">{error}</Alert>}

      {images.length === 0 ? (
        <p className="py-6 text-center text-sm text-stone-600">
          Bu tarifte henüz görsel yok.
        </p>
      ) : (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {images.map((image, index) => (
            <li key={image.id}>
              <img
                src={image.url}
                alt={`Tarif görseli ${index + 1}`}
                className="aspect-4/3 w-full rounded-xl object-cover"
              />
              <Button
                variant="secondary"
                onClick={() => setImageToDelete(image)}
                className="mt-2 w-full"
                aria-label={`Görsel ${index + 1} sil`}
              >
                Sil
              </Button>
            </li>
          ))}
        </ul>
      )}

      <ConfirmDialog
        isOpen={imageToDelete !== null}
        title="Görsel silinsin mi?"
        description="Bu görsel tariften kalıcı olarak kaldırılacak."
        confirmLabel="Sil"
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setImageToDelete(null)}
      />
    </section>
  )
}
