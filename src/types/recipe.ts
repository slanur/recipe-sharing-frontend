export interface Tag {
  id: string
  name: string
}

export interface Recipe {
  id: string
  title: string
  description: string
  prepTimeMinutes: number
  tags: Tag[]
  images: string[]
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
  page?: number
  limit?: number
}
