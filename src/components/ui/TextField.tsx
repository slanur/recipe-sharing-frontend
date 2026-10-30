import type { LucideIcon } from 'lucide-react'
import { useId, type InputHTMLAttributes, type ReactNode } from 'react'
import { fieldInputClass, fieldLabelClass } from '@/components/ui/fieldStyles'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  hideLabel?: boolean
  icon?: LucideIcon
  trailing?: ReactNode
}

export function TextField({
  label,
  error,
  hideLabel = false,
  icon: Icon,
  trailing,
  ...props
}: TextFieldProps) {
  const id = useId()
  const errorId = `${id}-error`

  return (
    <div>
      <label
        htmlFor={id}
        className={hideLabel ? 'sr-only' : `${fieldLabelClass} mb-1.5 block`}
      >
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-4 h-4.5 w-4.5 -translate-y-1/2 text-ink-muted"
          />
        )}
        <input
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={`${fieldInputClass} h-12 ${Icon ? 'pl-11' : ''} ${trailing ? 'pr-12' : ''}`}
          {...props}
        />
        {trailing && (
          <div className="absolute top-1/2 right-1.5 -translate-y-1/2">
            {trailing}
          </div>
        )}
      </div>
      {error && (
        <p id={errorId} className="mt-1.5 text-sm font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}
