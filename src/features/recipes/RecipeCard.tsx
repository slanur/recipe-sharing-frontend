import { Clock, ImageOff } from 'lucide-react'
import { Link } from 'react-router-dom'
import { selectUserId, useAuthStore } from '@/stores/authStore'
import type { Recipe } from '@/types/recipe'

interface RecipeCardProps {
  recipe: Recipe
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const userId = useAuthStore(selectUserId)
  const image = recipe.images[0]
  const category = recipe.tags[0]?.name
  const isOwn = recipe.ownerId !== null && recipe.ownerId === userId

  return (
    <Link
      to={`/recipe/${recipe.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-card transition-shadow duration-300 hover:shadow-lift"
    >
      <div className="relative aspect-4/3 overflow-hidden bg-sand-100">
        {image ? (
          <img
            src={image.url}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-ink-muted">
            <ImageOff aria-hidden="true" className="h-7 w-7" />
          </div>
        )}
        <span className="absolute right-3 bottom-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-ink shadow-sm">
          <Clock aria-hidden="true" className="h-3.5 w-3.5 text-brand-600" />
          {recipe.prepTimeMinutes} dk
        </span>
        {isOwn && (
          <span className="absolute top-3 left-3 rounded-full bg-herb-900 px-2.5 py-1 text-xs font-semibold text-paper">
            Senin tarifin
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        {category && (
          <p className="text-xs font-bold tracking-wider text-brand-600 uppercase">
            {category}
          </p>
        )}
        <h2 className="mt-1.5 font-display text-xl leading-snug font-semibold text-ink transition-colors group-hover:text-brand-700">
          {recipe.title}
        </h2>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-soft">
          {recipe.description}
        </p>
      </div>
    </Link>
  )
}
