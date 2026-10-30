import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { TextField } from '@/components/ui/TextField'

interface TagFormProps {
  label: string
  placeholder?: string
  submitLabel: string
  initialName?: string
  existingNames: string[]
  onSubmit: (name: string) => Promise<void>
  onCancel?: () => void
}

export function TagForm({
  label,
  placeholder,
  submitLabel,
  initialName = '',
  existingNames,
  onSubmit,
  onCancel,
}: TagFormProps) {
  const [name, setName] = useState(initialName)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedName = name.trim()
    if (!trimmedName) {
      setError('Tag adı zorunludur')
      return
    }
    const normalizedName = trimmedName.toLocaleLowerCase('tr')
    if (
      existingNames.some(
        (existing) => existing.toLocaleLowerCase('tr') === normalizedName,
      )
    ) {
      setError('Bu tag zaten var')
      return
    }

    setError('')
    setIsSubmitting(true)
    try {
      await onSubmit(trimmedName)
      setName('')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-2.5 sm:flex-row sm:items-start"
    >
      <div className="flex-1">
        <TextField
          label={label}
          hideLabel
          placeholder={placeholder}
          value={name}
          onChange={(event) => setName(event.target.value)}
          error={error}
        />
      </div>
      <div className="flex gap-2">
        <Button type="submit" isLoading={isSubmitting} className="h-12">
          {submitLabel}
        </Button>
        {onCancel && (
          <Button variant="ghost" onClick={onCancel} className="h-12">
            Vazgeç
          </Button>
        )}
      </div>
    </form>
  )
}
