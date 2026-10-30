import { CloudOff, Pencil, Tags, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Alert } from '@/components/ui/Alert'
import { Button } from '@/components/ui/Button'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { PageHeader } from '@/components/ui/PageHeader'
import { Spinner } from '@/components/ui/Spinner'
import { StateMessage } from '@/components/ui/StateMessage'
import { TagForm } from '@/features/tags/TagForm'
import { useTags } from '@/features/tags/useTags'
import { useToastStore } from '@/stores/toastStore'
import type { Tag } from '@/types/recipe'
import { getErrorMessage } from '@/utils/apiError'

const iconButtonClass =
  'flex h-9 w-9 items-center justify-center rounded-lg text-ink-muted transition-colors'

export function TagsPage() {
  const { tags, isLoading, error, reload, addTag, renameTag, removeTag } =
    useTags()
  const showToast = useToastStore((state) => state.showToast)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [tagToDelete, setTagToDelete] = useState<Tag | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [actionError, setActionError] = useState('')

  async function runAction(
    action: () => Promise<void>,
    successMessage: string,
    fallback: string,
  ) {
    setActionError('')
    try {
      await action()
      showToast(successMessage)
    } catch (failure) {
      setActionError(getErrorMessage(failure, fallback))
    }
  }

  async function handleDelete() {
    if (!tagToDelete) return
    setIsDeleting(true)
    await runAction(
      () => removeTag(tagToDelete.id),
      'Tag silindi',
      'Tag silinemedi',
    )
    setIsDeleting(false)
    setTagToDelete(null)
  }

  const namesExcept = (id?: string) =>
    tags.filter((tag) => tag.id !== id).map((tag) => tag.name)

  return (
    <section className="mx-auto max-w-3xl space-y-7">
      <PageHeader
        title="Tag Yönetimi"
        description="Tarifleri düzenli tutan kategorileri buradan yönet."
      />

      <div className="rounded-3xl bg-white p-4 shadow-card sm:p-5">
        <TagForm
          label="Yeni tag"
          placeholder="Yeni tag adı, örn. Kahvaltı"
          submitLabel="Tag Ekle"
          existingNames={namesExcept()}
          onSubmit={(name) =>
            runAction(() => addTag(name), 'Tag eklendi', 'Tag eklenemedi')
          }
        />
      </div>

      {actionError && <Alert tone="error">{actionError}</Alert>}

      {isLoading && <Spinner />}

      {!isLoading && error && (
        <StateMessage
          icon={CloudOff}
          title={error}
          action={
            <Button variant="secondary" onClick={reload}>
              Tekrar Dene
            </Button>
          }
        />
      )}

      {!isLoading && !error && tags.length === 0 && (
        <StateMessage
          icon={Tags}
          title="Henüz tag yok"
          description="İlk tag'i yukarıdaki formdan ekleyebilirsin."
        />
      )}

      {!isLoading && !error && tags.length > 0 && (
        <ul className="divide-y divide-sand-200 overflow-hidden rounded-3xl bg-white shadow-card">
          {tags.map((tag) => (
            <li key={tag.id} className="px-4 py-3 sm:px-5">
              {editingId === tag.id ? (
                <TagForm
                  label="Tag adı"
                  submitLabel="Kaydet"
                  initialName={tag.name}
                  existingNames={namesExcept(tag.id)}
                  onCancel={() => setEditingId(null)}
                  onSubmit={(name) =>
                    runAction(
                      async () => {
                        await renameTag(tag.id, name)
                        setEditingId(null)
                      },
                      'Tag güncellendi',
                      'Tag güncellenemedi',
                    )
                  }
                />
              ) : (
                <div className="flex items-center justify-between gap-3">
                  <span className="flex min-w-0 items-center gap-3 font-semibold text-ink">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                      <Tags aria-hidden="true" className="h-4 w-4" />
                    </span>
                    <span className="truncate">{tag.name}</span>
                  </span>
                  <div className="flex shrink-0 gap-1">
                    <button
                      type="button"
                      onClick={() => setEditingId(tag.id)}
                      aria-label={`${tag.name} tag'ini düzenle`}
                      className={`${iconButtonClass} hover:bg-sand-100 hover:text-ink`}
                    >
                      <Pencil aria-hidden="true" className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setTagToDelete(tag)}
                      aria-label={`${tag.name} tag'ini sil`}
                      className={`${iconButtonClass} hover:bg-red-50 hover:text-red-700`}
                    >
                      <Trash2 aria-hidden="true" className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      <ConfirmDialog
        isOpen={tagToDelete !== null}
        title="Tag silinsin mi?"
        description={`"${tagToDelete?.name}" tag'i kalıcı olarak silinecek ve tariflerden kaldırılacak.`}
        confirmLabel="Sil"
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setTagToDelete(null)}
      />
    </section>
  )
}
