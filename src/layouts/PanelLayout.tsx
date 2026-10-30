import {
  BookOpen,
  Building2,
  ChefHat,
  Compass,
  LogOut,
  PlusCircle,
  Tags,
  type LucideIcon,
} from 'lucide-react'
import { Link, NavLink, Outlet, ScrollRestoration } from 'react-router-dom'
import { Logo } from '@/components/ui/Logo'
import { HOME_BY_ROLE } from '@/routes/paths'
import { selectRole, useAuthStore } from '@/stores/authStore'
import type { Role } from '@/types/auth'

interface NavItem {
  to: string
  label: string
  icon: LucideIcon
}

const NAV_ITEMS: Record<Role, NavItem[]> = {
  User: [
    { to: '/user/recipes', label: 'Keşfet', icon: Compass },
    { to: '/user/recipes/new', label: 'Yeni Tarif', icon: PlusCircle },
  ],
  Organization: [
    { to: '/org/recipes', label: 'Tarifler', icon: BookOpen },
    { to: '/org/tags', label: "Tag'ler", icon: Tags },
  ],
}

const ROLE_DETAILS: Record<Role, { label: string; icon: LucideIcon }> = {
  User: { label: 'Kullanıcı', icon: ChefHat },
  Organization: { label: 'Organization', icon: Building2 },
}

const sidebarLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors ${isActive ? 'bg-brand-50 text-brand-700' : 'text-ink-soft hover:bg-sand-100 hover:text-ink'}`

const tabLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex flex-1 flex-col items-center gap-0.5 py-2 text-xs font-semibold ${isActive ? 'text-brand-600' : 'text-ink-muted'}`

export function PanelLayout() {
  const role = useAuthStore(selectRole)
  const logout = useAuthStore((state) => state.logout)

  const items = role ? NAV_ITEMS[role] : []
  const homePath = role ? HOME_BY_ROLE[role] : '/'
  const account = role ? ROLE_DETAILS[role] : null

  return (
    <div className="min-h-screen lg:pl-64">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r border-sand-200 bg-white lg:flex">
        <Link to={homePath} aria-label="Panel ana sayfası" className="px-6 pt-6">
          <Logo />
        </Link>
        <nav aria-label="Panel" className="mt-8 flex-1 space-y-1 px-3">
          {items.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} end className={sidebarLinkClass}>
              <Icon aria-hidden="true" className="h-4.5 w-4.5" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3 border-t border-sand-200 p-4">
          {account && (
            <>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sand-100 text-brand-600">
                <account.icon aria-hidden="true" className="h-4.5 w-4.5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-ink">
                  {account.label}
                </p>
                <p className="text-xs text-ink-muted">Hesabın</p>
              </div>
            </>
          )}
          <button
            type="button"
            onClick={logout}
            aria-label="Çıkış Yap"
            title="Çıkış Yap"
            className="ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-muted transition-colors hover:bg-sand-100 hover:text-ink"
          >
            <LogOut aria-hidden="true" className="h-4.5 w-4.5" />
          </button>
        </div>
      </aside>

      <header className="sticky top-0 z-20 flex h-15 items-center justify-between border-b border-sand-200 bg-paper/90 px-4 backdrop-blur-md lg:hidden">
        <Link to={homePath} aria-label="Panel ana sayfası">
          <Logo />
        </Link>
        <button
          type="button"
          onClick={logout}
          aria-label="Çıkış Yap"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-ink-soft hover:bg-sand-100"
        >
          <LogOut aria-hidden="true" className="h-5 w-5" />
        </button>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 pt-6 pb-28 sm:px-6 lg:px-10 lg:py-10">
        <Outlet />
      </main>

      <nav
        aria-label="Panel"
        className="fixed inset-x-0 bottom-0 z-20 flex border-t border-sand-200 bg-white pb-[env(safe-area-inset-bottom)] lg:hidden"
      >
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} end className={tabLinkClass}>
            <Icon aria-hidden="true" className="h-5 w-5" />
            {label}
          </NavLink>
        ))}
      </nav>
      <ScrollRestoration />
    </div>
  )
}
