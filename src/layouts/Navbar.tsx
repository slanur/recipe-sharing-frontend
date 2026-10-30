import { Link } from 'react-router-dom'
import { buttonClass } from '@/components/ui/buttonStyles'
import { Logo } from '@/components/ui/Logo'
import { useAccountCta } from '@/features/landing/useAccountCta'
import { selectIsAuthenticated, useAuthStore } from '@/stores/authStore'

const linkClass =
  'whitespace-nowrap text-sm font-semibold text-ink-soft transition-colors hover:text-ink'

export function Navbar() {
  const isAuthenticated = useAuthStore(selectIsAuthenticated)
  const logout = useAuthStore((state) => state.logout)
  const cta = useAccountCta()

  return (
    <header className="sticky top-0 z-30 border-b border-sand-200/70 bg-paper/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" aria-label="Sofra ana sayfa">
          <Logo />
        </Link>
        <div className="flex items-center gap-4 sm:gap-6">
          <Link to="/#nasil-calisir" className={`${linkClass} hidden md:block`}>
            Nasıl Çalışır
          </Link>
          <Link to="/about" className={`${linkClass} hidden md:block`}>
            Hakkında
          </Link>
          {isAuthenticated ? (
            <button type="button" onClick={logout} className={linkClass}>
              Çıkış Yap
            </button>
          ) : (
            <Link to="/login" className={linkClass}>
              Giriş Yap
            </Link>
          )}
          <Link to={cta.to} className={buttonClass('primary', 'sm')}>
            {cta.label}
          </Link>
        </div>
      </nav>
    </header>
  )
}
