import { Link } from 'react-router-dom'
import { HOME_BY_ROLE } from '@/routes/paths'
import {
  selectIsAuthenticated,
  selectRole,
  useAuthStore,
} from '@/stores/authStore'

const FEATURES = [
  {
    title: 'Tarifini Paylaş',
    description: 'Tariflerini birkaç adımda ekle, dilediğin zaman güncelle.',
    icon: 'M12 5v14M5 12h14',
  },
  {
    title: 'Kolayca Keşfet',
    description: 'Başlığa göre ara, kategoriye göre filtrele, yeni tatlar bul.',
    icon: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm10 2-4.3-4.3',
  },
  {
    title: 'Görsellerle Anlat',
    description: 'Tariflerine fotoğraf ekleyerek sunumunu öne çıkar.',
    icon: 'M4 5h16v14H4zM4 16l5-5 4 4 3-3 4 4',
  },
  {
    title: 'Düzenli Kategoriler',
    description: 'Organization paneliyle etiketleri tek yerden yönet.',
    icon: 'M4 7h16M4 12h16M4 17h10',
  },
]

const PREVIEW_RECIPES = [
  { title: 'Mercimek Çorbası', meta: 'Çorba · 35 dk', color: 'bg-amber-600' },
  { title: 'Fırın Sütlaç', meta: 'Tatlı · 60 dk', color: 'bg-rose-700' },
  { title: 'Kısır', meta: 'Salata · 25 dk', color: 'bg-lime-700' },
]

const primaryLinkClass =
  'rounded-lg bg-orange-700 px-5 py-3 text-center font-medium text-white hover:bg-orange-800'

export function LandingPage() {
  const isAuthenticated = useAuthStore(selectIsAuthenticated)
  const role = useAuthStore(selectRole)

  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-24">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-stone-950 sm:text-5xl">
            Sevdiğin tarifleri paylaş, yenilerini keşfet.
          </h1>
          <p className="mt-4 text-lg text-stone-600">
            Mutfağındaki en iyi tarifleri tek bir yerde topla, başkalarının
            denediklerinden ilham al.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {isAuthenticated && role ? (
              <Link to={HOME_BY_ROLE[role]} className={primaryLinkClass}>
                Panelime Git
              </Link>
            ) : (
              <Link to="/register" className={primaryLinkClass}>
                Hemen Başla
              </Link>
            )}
            <Link
              to="/about"
              className="rounded-lg border border-stone-300 bg-white px-5 py-3 text-center font-medium text-stone-800 hover:bg-stone-100"
            >
              Daha Fazla Bilgi
            </Link>
          </div>
        </div>
        <ul aria-hidden="true" className="space-y-3">
          {PREVIEW_RECIPES.map((recipe) => (
            <li
              key={recipe.title}
              className="flex items-center gap-4 rounded-2xl border border-stone-200 bg-white p-3"
            >
              <div className={`h-16 w-20 shrink-0 rounded-xl ${recipe.color}`} />
              <div>
                <p className="font-medium text-stone-950">{recipe.title}</p>
                <p className="text-sm text-stone-600">{recipe.meta}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-stone-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-semibold text-stone-950">
            Neler Yapabilirsin?
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((feature) => (
              <li
                key={feature.title}
                className="rounded-2xl border border-stone-200 p-5"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="h-6 w-6 text-orange-700"
                >
                  <path d={feature.icon} />
                </svg>
                <h3 className="mt-3 font-semibold text-stone-950">
                  {feature.title}
                </h3>
                <p className="mt-1 text-sm text-stone-600">
                  {feature.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
