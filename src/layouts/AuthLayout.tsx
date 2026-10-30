import { Link, Outlet } from 'react-router-dom'
import { Logo } from '@/components/ui/Logo'
import { PHOTOS, photoUrl } from '@/utils/photos'

export function AuthLayout() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col px-5 py-6 sm:px-10 lg:px-16">
        <Link to="/" aria-label="Sofra ana sayfa" className="self-start">
          <Logo />
        </Link>
        <main className="flex flex-1 items-center py-10">
          <div className="mx-auto w-full max-w-md animate-rise">
            <Outlet />
          </div>
        </main>
      </div>
      <aside className="relative hidden overflow-hidden bg-ink lg:block">
        <img
          src={photoUrl(PHOTOS.plate, 1400)}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink/85 via-ink/10 to-transparent" />
        <p className="absolute inset-x-14 bottom-14 max-w-md font-display text-4xl leading-tight font-medium text-white">
          Her tarifin bir hikâyesi var.{' '}
          <em className="text-brand-100">Seninki de bu sofrada.</em>
        </p>
      </aside>
    </div>
  )
}
