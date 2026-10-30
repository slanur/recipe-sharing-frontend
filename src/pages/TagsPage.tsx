import { useState } from 'react'
import { Alert } from '@/components/ui/Alert'
import { Button } from '@/components/ui/Button'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { Spinner } from '@/components/ui/Spinner'
import { StateMessage } from '@/components/ui/StateMessage'
import { TagForm } from '@/features/tags/TagForm'
import { useTags } from '@/features/tags/useTags'
import type { Tag } from '@/types/recipe'
import { getErrorMessage } from '@/utils/apiError'

export function TagsPage() {
  const { tags, isLoading, error, reload, addTag, renameTag, removeTag } =
    useTags()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [tagToDelete, setTagToDelete] = useState<Tag | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [actionError, setActionError] = useState('')

  async function runAction(action: () => Promise<void>, fallback: string) {
    setActionError('')
    try {
      await action()
    } catch (failure) {
      setActionError(getErrorMessage(failure, fallback))
    }
  }

  async function handleDelete() {
    if (!tagToDelete) return
    setIsDeleting(true)
    await runAction(() => removeTag(tagToDelete.id), 'Tag silinemedi')
    setIsDeleting(false)
    setTagToDelete(null)
  }

  const namesExcept = (id?: string) =>
    tags.filter((tag) => tag.id !== id).map((tag) => tag.name)

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold text-stone-950">Tag Yönetimi</h1>

      <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5">
        <TagForm
          label="Yeni tag"
          submitLabel="Ekle"
          existingNames={namesExcept()}
          onSubmit={(name) => runAction(() => addTag(name), 'Tag eklenemedi')}
        />
      </div>

      {actionError && <Alert tone="error">{actionError}</Alert>}

      {isLoading && <Spinner />}

      {!isLoading && error && (
        <StateMessage
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
          title="Henüz tag yok"
          description="İlk tag'i yukarıdaki formdan ekleyebilirsiniz."
        />
      )}

      {!isLoading && !error && tags.length > 0 && (
        <ul className="divide-y divide-stone-200 rounded-2xl border border-stone-200 bg-white">
          {tags.map((tag) => (
            <li key={tag.id} className="p-4">
              {editingId === tag.id ? (
                <TagForm
                  label="Tag adı"
                  submitLabel="Kaydet"
                  initialName={tag.name}
                  existingNames={namesExcept(tag.id)}
                  onCancel={() => setEditingId(null)}
                  onSubmit={(name) =>
                    runAction(async () => {
                      await renameTag(tag.id, name)
                      setEditingId(null)
                    }, 'Tag güncellenemedi')
                  }
                />
              ) : (
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-medium text-stone-950">{tag.name}</span>
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      onClick={() => setEditingId(tag.id)}
                    >
                      Düzenle
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => setTagToDelete(tag)}
                    >
                      Sil
                    </Button>
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
