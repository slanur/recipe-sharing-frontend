import { Link, NavLink, Outlet } from 'react-router-dom'
import { HOME_BY_ROLE } from '@/routes/paths'
import { selectRole, useAuthStore } from '@/stores/authStore'
import type { Role } from '@/types/auth'

const NAV_ITEMS: Record<Role, { to: string; label: string }[]> = {
  User: [
    { to: '/user/recipes', label: 'Tarifler' },
    { to: '/user/recipes/new', label: 'Yeni Tarif' },
  ],
  Organization: [
    { to: '/org/recipes', label: 'Tarifler' },
    { to: '/org/tags', label: "Tag'ler" },
  ],
}

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `whitespace-nowrap text-sm font-medium ${isActive ? 'text-orange-700' : 'text-stone-700 hover:text-stone-950'}`

export function PanelLayout() {
  const role = useAuthStore(selectRole)
  const logout = useAuthStore((state) => state.logout)

  return (
    <div className="flex min-h-screen flex-col bg-stone-50">
      <header className="border-b border-stone-200 bg-white">
        <nav className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-5 gap-y-2 px-4 py-3">
          <Link
            to={role ? HOME_BY_ROLE[role] : '/'}
            className="whitespace-nowrap font-semibold text-stone-950"
          >
            Recipe Sharing
          </Link>
          {role &&
            NAV_ITEMS[role].map((item) => (
              <NavLink key={item.to} to={item.to} end className={navLinkClass}>
                {item.label}
              </NavLink>
            ))}
          <button
            type="button"
            onClick={logout}
            className="ml-auto whitespace-nowrap text-sm font-medium text-stone-700 hover:text-stone-950"
          >
            Çıkış Yap
          </button>
        </nav>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}
