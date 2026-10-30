export interface Tag {
  id: string
  name: string
}

export interface RecipeImage {
  id: string
  url: string
}

export interface Recipe {
  id: string
  title: string
  description: string
  prepTimeMinutes: number
  tags: Tag[]
  images: RecipeImage[]
  ownerId: string | null
}

export interface RecipeInput {
  title: string
  description: string
  prepTimeMinutes: number
  tagIds: string[]
}

export interface RecipePage {
  recipes: Recipe[]
  page: number
  totalPages: number
}

export type RecipeSort = 'newest' | 'oldest'

export interface RecipeQuery {
  sort?: RecipeSort
  search?: string
  tagId?: string
  page?: number
  limit?: number
}
