import { Link } from 'react-router-dom'
import type { Recipe } from '@/types/recipe'

interface RecipeCardProps {
  recipe: Recipe
  showDescription?: boolean
}

export function RecipeCard({ recipe, showDescription = true }: RecipeCardProps) {
  const image = recipe.images[0]
  const category = recipe.tags[0]?.name

  return (
    <Link
      to={`/recipe/${recipe.id}`}
      className="group block overflow-hidden rounded-2xl border border-stone-200 bg-white transition-shadow hover:shadow-md"
    >
      {image ? (
        <img
          src={image.url}
          alt=""
          loading="lazy"
          className="aspect-4/3 w-full object-cover"
        />
      ) : (
        <div className="flex aspect-4/3 items-center justify-center bg-stone-100 text-sm text-stone-500">
          Görsel yok
        </div>
      )}
      <div className="p-4">
        {category && (
          <span className="rounded-full bg-orange-50 px-2 py-0.5 text-xs font-medium text-orange-800">
            {category}
          </span>
        )}
        <h2 className="mt-2 font-semibold text-stone-950 group-hover:text-orange-700">
          {recipe.title}
        </h2>
        {showDescription && (
          <p className="mt-1 line-clamp-2 text-sm text-stone-600">
            {recipe.description}
          </p>
        )}
      </div>
    </Link>
  )
}
