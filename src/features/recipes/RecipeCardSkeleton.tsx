const SKELETON_COUNT = 6

export function RecipeCardSkeleton() {
  return (
    <ul
      role="status"
      aria-label="Tarifler yükleniyor"
      className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
    >
      {Array.from({ length: SKELETON_COUNT }, (_, index) => (
        <li
          key={index}
          className="animate-pulse overflow-hidden rounded-3xl bg-white shadow-card"
        >
          <div className="aspect-4/3 bg-sand-200" />
          <div className="space-y-2.5 p-5">
            <div className="h-3 w-16 rounded-full bg-sand-200" />
            <div className="h-5 w-3/4 rounded-full bg-sand-200" />
            <div className="h-3 w-full rounded-full bg-sand-100" />
          </div>
        </li>
      ))}
    </ul>
  )
}
