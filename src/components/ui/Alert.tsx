import { CircleAlert, CircleCheck } from 'lucide-react'
import type { ReactNode } from 'react'

interface AlertProps {
  tone: 'error' | 'success'
  children: ReactNode
}

const TONE_CLASSES = {
  error: 'border-red-200 bg-red-50 text-red-800',
  success: 'border-herb-100 bg-herb-100 text-herb-900',
}

export function Alert({ tone, children }: AlertProps) {
  const Icon = tone === 'error' ? CircleAlert : CircleCheck

  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className={`flex items-start gap-2.5 rounded-xl border px-3.5 py-3 text-sm font-medium ${TONE_CLASSES[tone]}`}
    >
      <Icon aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
      <p>{children}</p>
    </div>
  )
}
