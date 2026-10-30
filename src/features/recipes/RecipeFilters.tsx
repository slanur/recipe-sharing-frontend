import { Search } from 'lucide-react'
import { useEffect, useRef, useState, type ChangeEvent } from 'react'
import { SelectField } from '@/components/ui/SelectField'
import { TextField } from '@/components/ui/TextField'
import type { RecipeSort, Tag } from '@/types/recipe'

const SEARCH_DELAY_MS = 300

interface RecipeFiltersProps {
  search: string
  tagId: string
  sort: RecipeSort
  tags: Tag[]
  onSearchChange: (value: string) => void
  onTagChange: (value: string) => void
  onSortChange: (value: RecipeSort) => void
}

export function RecipeFilters({
  search,
  tagId,
  sort,
  tags,
  onSearchChange,
  onTagChange,
  onSortChange,
}: RecipeFiltersProps) {
  const [searchInput, setSearchInput] = useState(search)
  const [syncedSearch, setSyncedSearch] = useState(search)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  // Geri tuşuyla URL değişirse arama kutusu da güncellenir.
  if (search !== syncedSearch) {
    setSyncedSearch(search)
    setSearchInput(search)
  }

  useEffect(() => () => clearTimeout(timerRef.current), [])

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target
    setSearchInput(value)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(
      () => onSearchChange(value.trim()),
      SEARCH_DELAY_MS,
    )
  }

  const categories = [{ id: '', name: 'Tümü' }, ...tags]

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-[1fr_13rem]">
        <TextField
          label="Tarif ara"
          hideLabel
          type="search"
          icon={Search}
          placeholder="Tarif başlığında ara"
          value={searchInput}
          onChange={handleSearchChange}
        />
        <SelectField
          label="Sıralama"
          hideLabel
          value={sort}
          onChange={(event) => onSortChange(event.target.value as RecipeSort)}
        >
          <option value="newest">En yeniler</option>
          <option value="oldest">En eskiler</option>
        </SelectField>
      </div>
      <div
        role="group"
        aria-label="Kategori"
        className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {categories.map((category) => {
          const isActive = category.id === tagId

          return (
            <button
              key={category.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => onTagChange(category.id)}
              className={`h-9 shrink-0 rounded-full px-4 text-sm font-semibold transition-colors ${isActive ? 'bg-ink text-paper' : 'bg-white text-ink-soft shadow-sm hover:text-ink'}`}
            >
              {category.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}
