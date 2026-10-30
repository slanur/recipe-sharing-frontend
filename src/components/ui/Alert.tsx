import type { ReactNode } from 'react'

interface AlertProps {
  tone: 'error' | 'success'
  children: ReactNode
}

const TONE_CLASSES = {
  error: 'border-red-200 bg-red-50 text-red-800',
  success: 'border-green-200 bg-green-50 text-green-800',
}

export function Alert({ tone, children }: AlertProps) {
  return (
    <p
      role={tone === 'error' ? 'alert' : 'status'}
      className={`rounded-lg border px-3 py-2 text-sm ${TONE_CLASSES[tone]}`}
    >
      {children}
    </p>
  )
}
