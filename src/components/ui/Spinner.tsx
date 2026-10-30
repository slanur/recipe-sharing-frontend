export function Spinner() {
  return (
    <div role="status" className="flex justify-center py-12">
      <span className="h-8 w-8 animate-spin rounded-full border-4 border-stone-200 border-t-orange-700" />
      <span className="sr-only">Yükleniyor</span>
    </div>
  )
}
