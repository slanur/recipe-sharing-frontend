import { ChevronRight, Clock, ImageOff } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Recipe } from '@/types/recipe'

interface RecipeTableProps {
  recipes: Recipe[]
}

export function RecipeTable({ recipes }: RecipeTableProps) {
  return (
    <ul className="divide-y divide-sand-200 overflow-hidden rounded-3xl bg-white shadow-card">
      {recipes.map((recipe) => {
        const image = recipe.images[0]
        const category = recipe.tags[0]?.name

        return (
          <li key={recipe.id}>
            <Link
              to={`/recipe/${recipe.id}`}
              className="group flex items-center gap-4 p-3 transition-colors hover:bg-sand-100/60 sm:px-5"
            >
              <div className="h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-sand-100">
                {image ? (
                  <img
                    src={image.url}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-ink-muted">
                    <ImageOff aria-hidden="true" className="h-5 w-5" />
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-lg font-semibold text-ink">
                  {recipe.title}
                </p>
                {category && (
                  <p className="text-sm font-medium text-brand-600 sm:hidden">
                    {category}
                  </p>
                )}
              </div>
              {category && (
                <span className="hidden rounded-full bg-sand-100 px-3 py-1 text-sm font-semibold text-ink-soft sm:block">
                  {category}
                </span>
              )}
              <span className="hidden w-20 items-center justify-end gap-1.5 text-sm text-ink-soft md:flex">
                <Clock aria-hidden="true" className="h-4 w-4" />
                {recipe.prepTimeMinutes} dk
              </span>
              <ChevronRight
                aria-hidden="true"
                className="h-5 w-5 shrink-0 text-ink-muted transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
