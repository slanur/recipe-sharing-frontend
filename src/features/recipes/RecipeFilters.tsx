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

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <TextField
        label="Ara"
        type="search"
        placeholder="Tarif başlığı"
        value={searchInput}
        onChange={handleSearchChange}
      />
      <SelectField
        label="Kategori"
        value={tagId}
        onChange={(event) => onTagChange(event.target.value)}
      >
        <option value="">Tüm kategoriler</option>
        {tags.map((tag) => (
          <option key={tag.id} value={tag.id}>
            {tag.name}
          </option>
        ))}
      </SelectField>
      <SelectField
        label="Sıralama"
        value={sort}
        onChange={(event) => onSortChange(event.target.value as RecipeSort)}
      >
        <option value="newest">Yeniden eskiye</option>
        <option value="oldest">Eskiden yeniye</option>
      </SelectField>
    </div>
  )
}
