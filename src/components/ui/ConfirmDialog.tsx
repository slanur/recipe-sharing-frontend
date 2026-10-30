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
      className="m-auto w-[calc(100%-2rem)] max-w-sm rounded-2xl p-6 backdrop:bg-stone-950/50"
    >
      <h2 className="text-lg font-semibold text-stone-950">{title}</h2>
      <p className="mt-2 text-sm text-stone-600">{description}</p>
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
