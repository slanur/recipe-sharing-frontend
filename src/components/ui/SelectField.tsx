import { ChevronDown } from 'lucide-react'
import { useId, type SelectHTMLAttributes } from 'react'
import { fieldInputClass, fieldLabelClass } from '@/components/ui/fieldStyles'

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  error?: string
  hideLabel?: boolean
}

export function SelectField({
  label,
  error,
  hideLabel = false,
  children,
  ...props
}: SelectFieldProps) {
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
        <select
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={`${fieldInputClass} h-12 appearance-none pr-10`}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-3.5 h-4.5 w-4.5 -translate-y-1/2 text-ink-muted"
        />
      </div>
      {error && (
        <p id={errorId} className="mt-1.5 text-sm font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}
