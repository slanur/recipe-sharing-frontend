import type {
  ApiItem,
  ApiItemPage,
  ApiItemPayload,
  ApiItemQuery,
} from '@/types/api'
import type {
  Recipe,
  RecipeInput,
  RecipePage,
  RecipeQuery,
  RecipeSort,
} from '@/types/recipe'

// Postman'de yalnızca `a-z` belgeli. Bu değerler ve `tagId` filtresi varsayımdır.
const SORT_VALUES: Record<RecipeSort, string> = {
  newest: 'newest',
  oldest: 'oldest',
}

export function toRecipe(item: ApiItem): Recipe {
  return {
    id: item.id,
    title: item.name,
    description: item.description,
    prepTimeMinutes: item.value,
    tags: item.tags,
    images: item.photos ?? [],
    ownerId: item.ownerId ?? null,
  }
}

export function toRecipePage(page: ApiItemPage): RecipePage {
  return {
    recipes: page.items.map(toRecipe),
    page: page.page,
    totalPages: page.totalPages,
  }
}

export function toItemPayload(input: RecipeInput): ApiItemPayload {
  return {
    name: input.title,
    description: input.description,
    value: input.prepTimeMinutes,
    tags: input.tagIds,
  }
}

export function toItemQuery(query: RecipeQuery): ApiItemQuery {
  return {
    sort: query.sort && SORT_VALUES[query.sort],
    searchTerm: query.search || undefined,
    tagId: query.tagId || undefined,
    page: query.page,
    limit: query.limit,
  }
}
