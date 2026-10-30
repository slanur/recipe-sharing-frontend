import { Link } from 'react-router-dom'
import { Logo } from '@/components/ui/Logo'

const CURRENT_YEAR = new Date().getFullYear()

const LINK_GROUPS = [
  {
    title: 'Sofra',
    links: [
      { to: '/', label: 'Ana Sayfa' },
      { to: '/#nasil-calisir', label: 'Nasıl Çalışır' },
      { to: '/about', label: 'Hakkında' },
    ],
  },
  {
    title: 'Hesap',
    links: [
      { to: '/login', label: 'Giriş Yap' },
      { to: '/register', label: 'Kayıt Ol' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[2fr_1fr_1fr] lg:px-8">
        <div>
          <Logo tone="light" />
          <p className="mt-4 max-w-xs leading-relaxed text-paper/70">
            Ev yemeklerini paylaşmanın ve keşfetmenin sıcak yolu.
          </p>
        </div>
        {LINK_GROUPS.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <h2 className="text-sm font-semibold text-paper">{group.title}</h2>
            <ul className="mt-3 space-y-2">
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-paper/70 transition-colors hover:text-paper"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-paper/10">
        <p className="mx-auto max-w-7xl px-4 py-5 text-sm text-paper/60 sm:px-6 lg:px-8">
          © {CURRENT_YEAR} Sofra · Fotoğraflar: Unsplash
        </p>
      </div>
    </footer>
  )
}
