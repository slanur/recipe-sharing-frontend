import { LoaderCircle } from 'lucide-react'

export function Spinner() {
  return (
    <div role="status" className="flex justify-center py-16">
      <LoaderCircle
        aria-hidden="true"
        className="h-7 w-7 animate-spin text-brand-600"
      />
      <span className="sr-only">Yükleniyor</span>
    </div>
  )
}
