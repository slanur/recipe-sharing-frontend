import { TriangleAlert } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/Button'

interface ConfirmDialogProps {
  isOpen: boolean
  title: string
  description: string
  confirmLabel: string
  isLoading?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({
  isOpen,
  title,
  description,
  confirmLabel,
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (isOpen && !dialog?.open) dialog?.showModal()
    if (!isOpen && dialog?.open) dialog.close()
  }, [isOpen])

  return (
    <dialog
      ref={dialogRef}
      onCancel={(event) => {
        event.preventDefault()
        onCancel()
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-3xl p-6 shadow-lift backdrop:bg-ink/50 backdrop:backdrop-blur-sm sm:p-7"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-700">
        <TriangleAlert aria-hidden="true" className="h-5 w-5" />
      </span>
      <h2 className="mt-4 font-display text-xl font-semibold text-ink">
        {title}
      </h2>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
        {description}
      </p>
      <div className="mt-6 flex justify-end gap-2">
        <Button variant="secondary" onClick={onCancel} disabled={isLoading}>
          Vazgeç
        </Button>
        <Button variant="danger" onClick={onConfirm} isLoading={isLoading}>
          {confirmLabel}
        </Button>
      </div>
    </dialog>
  )
}
