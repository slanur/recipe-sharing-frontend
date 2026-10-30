import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Alert } from '@/components/ui/Alert'
import { Button } from '@/components/ui/Button'
import { buttonClass } from '@/components/ui/buttonStyles'
import { Spinner } from '@/components/ui/Spinner'
import { TextAreaField } from '@/components/ui/TextAreaField'
import { TextField } from '@/components/ui/TextField'
import { useTags } from '@/features/tags/useTags'
import type { Recipe, RecipeInput } from '@/types/recipe'
import { getErrorMessage } from '@/utils/apiError'

interface RecipeFormProps {
  recipe?: Recipe
  submitLabel: string
  cancelTo: string
  onSubmit: (input: RecipeInput) => Promise<void>
}

interface FieldErrors {
  title?: string
  description?: string
  prepTime?: string
  tags?: string
}

export function RecipeForm({
  recipe,
  submitLabel,
  cancelTo,
  onSubmit,
}: RecipeFormProps) {
  const { tags, isLoading, error: tagsError } = useTags()
  const [title, setTitle] = useState(recipe?.title ?? '')
  const [description, setDescription] = useState(recipe?.description ?? '')
  const [prepTime, setPrepTime] = useState(
    recipe ? String(recipe.prepTimeMinutes) : '',
  )
  const [tagIds, setTagIds] = useState(
    recipe?.tags.map((tag) => tag.id) ?? [],
  )
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  function toggleTag(id: string) {
    setTagIds((current) =>
      current.includes(id)
        ? current.filter((tagId) => tagId !== id)
        : [...current, id],
    )
  }

  function validate() {
    const minutes = Number(prepTime)
    return {
      title: title.trim() ? undefined : 'Tarif başlığı zorunludur',
      description: description.trim() ? undefined : 'Açıklama zorunludur',
      prepTime:
        Number.isInteger(minutes) && minutes > 0
          ? undefined
          : 'Geçerli bir süre girin',
      tags:
        tags.length > 0 && tagIds.length === 0
          ? 'En az bir kategori seçin'
          : undefined,
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const errors = validate()
    setFieldErrors(errors)
    setFormError('')
    if (Object.values(errors).some(Boolean)) return

    setIsSubmitting(true)
    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        prepTimeMinutes: Number(prepTime),
        tagIds,
      })
    } catch (error) {
      setFormError(getErrorMessage(error, 'Tarif kaydedilemedi'))
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {formError && <Alert tone="error">{formError}</Alert>}
      <div className="space-y-5 rounded-3xl bg-white p-5 shadow-card sm:p-7">
        <TextField
          label="Tarif başlığı"
          placeholder="Örn. Annemin mercimek çorbası"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          error={fieldErrors.title}
        />
        <TextAreaField
          label="Açıklama ve yapılışı"
          placeholder={
            'İlk paragraf kısa tanıtım olarak görünür.\n\nSonraki her paragraf bir adım olur.'
          }
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          error={fieldErrors.description}
        />
        <div className="max-w-xs">
          <TextField
            label="Hazırlama süresi (dakika)"
            type="number"
            min={1}
            inputMode="numeric"
            placeholder="30"
            value={prepTime}
            onChange={(event) => setPrepTime(event.target.value)}
            error={fieldErrors.prepTime}
          />
        </div>
        <fieldset>
          <legend className="text-sm font-semibold text-ink">Kategori</legend>
          {isLoading && <Spinner />}
          {tagsError && <Alert tone="error">{tagsError}</Alert>}
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <label
                key={tag.id}
                className="cursor-pointer rounded-full border border-sand-300 bg-white px-4 py-2 text-sm font-semibold text-ink-soft transition-colors hover:border-ink-muted has-checked:border-brand-600 has-checked:bg-brand-50 has-checked:text-brand-700 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-brand-600"
              >
                <input
                  type="checkbox"
                  checked={tagIds.includes(tag.id)}
                  onChange={() => toggleTag(tag.id)}
                  className="sr-only"
                />
                {tag.name}
              </label>
            ))}
          </div>
          {fieldErrors.tags && (
            <p className="mt-1.5 text-sm font-medium text-red-700">
              {fieldErrors.tags}
            </p>
          )}
        </fieldset>
      </div>
      <div className="flex gap-2.5">
        <Button type="submit" size="lg" isLoading={isSubmitting}>
          {submitLabel}
        </Button>
        <Link to={cancelTo} className={buttonClass('ghost', 'lg')}>
          Vazgeç
        </Link>
      </div>
    </form>
  )
}
