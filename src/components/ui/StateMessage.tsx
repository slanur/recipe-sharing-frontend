import { SearchX, type LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

interface StateMessageProps {
  title: string
  description?: string
  action?: ReactNode
  icon?: LucideIcon
}

export function StateMessage({
  title,
  description,
  action,
  icon: Icon = SearchX,
}: StateMessageProps) {
  return (
    <div className="flex flex-col items-center rounded-3xl border border-dashed border-sand-300 bg-white/60 px-6 py-16 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sand-100 text-brand-600">
        <Icon aria-hidden="true" className="h-6 w-6" />
      </span>
      <p className="mt-4 font-display text-xl font-semibold text-ink">{title}</p>
      {description && (
        <p className="mt-1 max-w-sm text-sm text-ink-soft">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
