import type { ReactNode } from 'react'

interface StateMessageProps {
  title: string
  description?: string
  action?: ReactNode
}

export function StateMessage({ title, description, action }: StateMessageProps) {
  return (
    <div className="rounded-2xl border border-dashed border-stone-300 bg-white px-4 py-12 text-center">
      <p className="font-medium text-stone-950">{title}</p>
      {description && (
        <p className="mt-1 text-sm text-stone-600">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
