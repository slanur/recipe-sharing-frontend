import { useId, type TextareaHTMLAttributes } from 'react'
import { fieldInputClass, fieldLabelClass } from '@/components/ui/fieldStyles'

interface TextAreaFieldProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
}

export function TextAreaField({ label, error, ...props }: TextAreaFieldProps) {
  const id = useId()
  const errorId = `${id}-error`

  return (
    <div>
      <label htmlFor={id} className={`${fieldLabelClass} mb-1.5 block`}>
        {label}
      </label>
      <textarea
        id={id}
        rows={6}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`${fieldInputClass} py-3 leading-relaxed`}
        {...props}
      />
      {error && (
        <p id={errorId} className="mt-1.5 text-sm font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}
