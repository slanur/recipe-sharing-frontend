import { ImagePlus, LoaderCircle, Trash2 } from 'lucide-react'
import { useState, type ChangeEvent, type DragEvent } from 'react'
import {
  addRecipeImage,
  deleteRecipeImage,
  getRecipe,
} from '@/api/items.api'
import { Alert } from '@/components/ui/Alert'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { useToastStore } from '@/stores/toastStore'
import type { RecipeImage } from '@/types/recipe'
import { getErrorMessage } from '@/utils/apiError'

const MAX_IMAGE_MB = 5

interface RecipeImagesProps {
  recipeId: string
  initialImages: RecipeImage[]
}

export function RecipeImages({ recipeId, initialImages }: RecipeImagesProps) {
  const showToast = useToastStore((state) => state.showToast)
  const [images, setImages] = useState(initialImages)
  const [imageToDelete, setImageToDelete] = useState<RecipeImage | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState('')

  async function uploadFiles(files: File[]) {
    if (files.length === 0 || isUploading) return

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
    let didUpload = false
    try {
      for (const file of files) await addRecipeImage(recipeId, file)
      didUpload = true
    } catch (uploadError) {
      setError(getErrorMessage(uploadError, 'Görsel yüklenemedi'))
    }

    // Yükleme yarıda kesilse bile eklenebilen görseller listede görünür.
    try {
      setImages((await getRecipe(recipeId)).images)
      if (didUpload) showToast('Görsel eklendi')
    } catch (loadError) {
      setError(getErrorMessage(loadError, 'Görseller yenilenemedi'))
    } finally {
      setIsUploading(false)
    }
  }

  function handleFilesChange(event: ChangeEvent<HTMLInputElement>) {
    const files = [...(event.target.files ?? [])]
    event.target.value = ''
    void uploadFiles(files)
  }

  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault()
    setIsDragging(false)
    void uploadFiles([...event.dataTransfer.files])
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
      showToast('Görsel silindi')
    } catch (deleteError) {
      setError(getErrorMessage(deleteError, 'Görsel silinemedi'))
    } finally {
      setIsDeleting(false)
      setImageToDelete(null)
    }
  }

  return (
    <section className="space-y-4 rounded-3xl bg-white p-5 shadow-card sm:p-7">
      <div>
        <h2 className="font-display text-xl font-semibold text-ink">
          Görseller
        </h2>
        <p className="mt-0.5 text-sm text-ink-soft">
          İlk görsel kapak olarak kullanılır. Değişiklikler hemen kaydedilir.
        </p>
      </div>

      {error && <Alert tone="error">{error}</Alert>}

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((image, index) => (
          <li key={image.id} className="group relative">
            <img
              src={image.url}
              alt={`Tarif görseli ${index + 1}`}
              className="aspect-4/3 w-full rounded-2xl bg-sand-100 object-cover"
            />
            {index === 0 && (
              <span className="absolute top-2 left-2 rounded-full bg-herb-900 px-2.5 py-0.5 text-xs font-semibold text-paper">
                Kapak
              </span>
            )}
            <button
              type="button"
              onClick={() => setImageToDelete(image)}
              aria-label={`Görsel ${index + 1} sil`}
              className="absolute top-2 right-2 flex h-9 w-9 items-center justify-center rounded-xl bg-white/95 text-red-700 shadow-sm transition-colors hover:bg-red-50"
            >
              <Trash2 aria-hidden="true" className="h-4 w-4" />
            </button>
          </li>
        ))}
        <li className={images.length === 0 ? 'col-span-full' : ''}>
          <label
            onDragOver={(event) => {
              event.preventDefault()
              setIsDragging(true)
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`flex h-full min-h-32 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-2xl border-2 border-dashed p-4 text-center transition-colors focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-brand-600 ${isDragging ? 'border-brand-600 bg-brand-50' : 'border-sand-300 hover:border-brand-600 hover:bg-brand-50/50'}`}
          >
            {isUploading ? (
              <LoaderCircle
                aria-hidden="true"
                className="h-6 w-6 animate-spin text-brand-600"
              />
            ) : (
              <ImagePlus aria-hidden="true" className="h-6 w-6 text-brand-600" />
            )}
            <span className="text-sm font-semibold text-ink">
              {isUploading ? 'Yükleniyor...' : 'Görsel ekle'}
            </span>
            <span className="text-xs text-ink-muted">
              Sürükle bırak veya seç · En fazla {MAX_IMAGE_MB} MB
            </span>
            <input
              type="file"
              accept="image/*"
              multiple
              disabled={isUploading}
              onChange={handleFilesChange}
              className="sr-only"
            />
          </label>
        </li>
      </ul>

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
