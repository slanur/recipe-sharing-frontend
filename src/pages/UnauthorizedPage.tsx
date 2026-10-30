import { Link } from 'react-router-dom'

export function UnauthorizedPage() {
  return (
    <section className="mx-auto max-w-md px-4 py-16 text-center">
      <h1 className="text-2xl font-semibold text-stone-950">Yetkisiz Erişim</h1>
      <p className="mt-2 text-stone-600">
        Bu sayfayı görüntülemek için yetkiniz yok.
      </p>
      <Link to="/" className="mt-6 inline-block font-medium text-orange-700">
        Ana sayfaya dön
      </Link>
    </section>
  )
}
