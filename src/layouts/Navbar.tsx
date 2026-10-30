import { Link } from 'react-router-dom'
import { HOME_BY_ROLE } from '@/routes/paths'
import {
  selectIsAuthenticated,
  selectRole,
  useAuthStore,
} from '@/stores/authStore'

const linkClass =
  'whitespace-nowrap text-sm font-medium text-stone-700 hover:text-stone-950'
const primaryClass =
  'whitespace-nowrap rounded-lg bg-orange-700 px-3 py-2 text-sm font-medium text-white hover:bg-orange-800'

export function Navbar() {
  const isAuthenticated = useAuthStore(selectIsAuthenticated)
  const role = useAuthStore(selectRole)
  const logout = useAuthStore((state) => state.logout)

  return (
    <header className="border-b border-stone-200 bg-white">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-3 gap-y-2 px-4 py-3">
        <Link to="/" className="whitespace-nowrap font-semibold text-stone-950">
          Recipe Sharing
        </Link>
        <div className="flex items-center gap-3 sm:gap-5">
          <Link to="/about" className={linkClass}>
            Hakkında
          </Link>
          {isAuthenticated ? (
            <>
              {role && (
                <Link to={HOME_BY_ROLE[role]} className={linkClass}>
                  Panelim
                </Link>
              )}
              <button type="button" onClick={logout} className={linkClass}>
                Çıkış Yap
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={linkClass}>
                Giriş Yap
              </Link>
              <Link to="/register" className={primaryClass}>
                Kayıt Ol
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}
