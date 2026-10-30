import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="mx-auto max-w-md px-4 py-16 text-center">
      <h1 className="text-2xl font-semibold text-stone-950">Sayfa Bulunamadı</h1>
      <p className="mt-2 text-stone-600">Aradığınız sayfa mevcut değil.</p>
      <Link to="/" className="mt-6 inline-block font-medium text-orange-700">
        Ana sayfaya dön
      </Link>
    </section>
  )
}
