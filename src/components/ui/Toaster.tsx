import { CircleCheck, X } from 'lucide-react'
import { useToastStore } from '@/stores/toastStore'

export function Toaster() {
  const toasts = useToastStore((state) => state.toasts)
  const dismissToast = useToastStore((state) => state.dismissToast)

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-4 bottom-24 z-50 flex flex-col items-center gap-2 lg:inset-x-auto lg:right-6 lg:bottom-6 lg:items-end"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex animate-rise items-center gap-2.5 rounded-2xl bg-herb-900 py-2.5 pr-2.5 pl-4 text-sm font-medium text-paper shadow-lift"
        >
          <CircleCheck aria-hidden="true" className="h-4 w-4 text-saffron" />
          {toast.message}
          <button
            type="button"
            onClick={() => dismissToast(toast.id)}
            aria-label="Bildirimi kapat"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-paper/70 hover:bg-white/10 hover:text-paper"
          >
            <X aria-hidden="true" className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
    </div>
  )
}
