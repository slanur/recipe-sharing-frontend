import { Button } from '@/components/ui/Button'

interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  return (
    <nav
      aria-label="Sayfalama"
      className="flex items-center justify-center gap-3"
    >
      <Button
        variant="secondary"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        Önceki
      </Button>
      <span className="text-sm text-stone-700">
        Sayfa {page} / {totalPages}
      </span>
      <Button
        variant="secondary"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Sonraki
      </Button>
    </nav>
  )
}
