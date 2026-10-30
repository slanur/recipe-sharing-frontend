import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

const SIBLING_PAGES = 1

function getVisiblePages(page: number, totalPages: number) {
  const pages: (number | 'gap')[] = []

  for (let current = 1; current <= totalPages; current += 1) {
    const isEdge = current === 1 || current === totalPages
    const isNearby = Math.abs(current - page) <= SIBLING_PAGES
    if (isEdge || isNearby) pages.push(current)
    else if (pages.at(-1) !== 'gap') pages.push('gap')
  }
  return pages
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  return (
    <nav
      aria-label="Sayfalama"
      className="flex items-center justify-center gap-1.5"
    >
      <Button
        variant="secondary"
        size="sm"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        aria-label="Önceki sayfa"
        className="w-9 px-0!"
      >
        <ChevronLeft aria-hidden="true" className="h-4 w-4" />
      </Button>
      {getVisiblePages(page, totalPages).map((item, index) =>
        item === 'gap' ? (
          <span key={`gap-${index}`} className="w-6 text-center text-ink-muted">
            …
          </span>
        ) : (
          <Button
            key={item}
            variant={item === page ? 'primary' : 'ghost'}
            size="sm"
            aria-current={item === page ? 'page' : undefined}
            onClick={() => onPageChange(item)}
            className="w-9 px-0!"
          >
            {item}
          </Button>
        ),
      )}
      <Button
        variant="secondary"
        size="sm"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        aria-label="Sonraki sayfa"
        className="w-9 px-0!"
      >
        <ChevronRight aria-hidden="true" className="h-4 w-4" />
      </Button>
    </nav>
  )
}
