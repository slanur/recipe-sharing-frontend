import { Check, Clock, Pencil, Search, Trash2 } from 'lucide-react'
import { PHOTOS, photoUrl } from '@/utils/photos'

const SEARCH_POINTS = [
  'Başlığa göre anında arama',
  'Kategoriye göre filtreleme',
  'Yeni veya eski tariflere göre sıralama',
]

const NOTEBOOK_POINTS = [
  'Tarif başına birden fazla fotoğraf',
  'Dilediğin zaman düzenleme',
  'Her ekranda rahat kullanım',
]

const PREVIEW_CHIPS = ['Tümü', 'Çorba', 'Ana Yemek', 'Tatlı']

const PREVIEW_RECIPES = [
  { title: 'Fırın Sütlaç', meta: 'Tatlı', time: 60, photo: PHOTOS.pudding },
  { title: 'Karnıyarık', meta: 'Ana Yemek', time: 70, photo: PHOTOS.eggplant },
]

const PREVIEW_TAGS = ['Çorba', 'Ana Yemek', 'Tatlı']

function PointList({ points }: { points: string[] }) {
  return (
    <ul className="mt-6 space-y-3">
      {points.map((point) => (
        <li key={point} className="flex items-center gap-3 text-ink-soft">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-herb-100 text-herb-700">
            <Check aria-hidden="true" className="h-3.5 w-3.5" />
          </span>
          {point}
        </li>
      ))}
    </ul>
  )
}

function SearchPreview() {
  return (
    <div
      aria-hidden="true"
      className="rounded-[2rem] bg-sand-100 p-4 sm:p-8"
    >
      <div className="rounded-2xl bg-white p-4 shadow-card sm:p-5">
        <div className="flex h-11 items-center gap-2.5 rounded-xl border border-sand-300 px-3.5 text-sm text-ink-muted">
          <Search className="h-4 w-4" />
          Tarif ara
        </div>
        <div className="mt-3 flex gap-1.5 overflow-hidden">
          {PREVIEW_CHIPS.map((chip, index) => (
            <span
              key={chip}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold whitespace-nowrap ${index === 0 ? 'bg-ink text-paper' : 'bg-sand-100 text-ink-soft'}`}
            >
              {chip}
            </span>
          ))}
        </div>
        <ul className="mt-4 space-y-2.5">
          {PREVIEW_RECIPES.map((recipe) => (
            <li
              key={recipe.title}
              className="flex items-center gap-3 rounded-xl border border-sand-200 p-2"
            >
              <img
                src={photoUrl(recipe.photo, 160)}
                alt=""
                loading="lazy"
                className="h-14 w-16 rounded-lg bg-sand-200 object-cover"
              />
              <div className="min-w-0">
                <p className="truncate font-display font-semibold text-ink">
                  {recipe.title}
                </p>
                <p className="mt-0.5 flex items-center gap-1 text-xs text-ink-soft">
                  {recipe.meta} ·
                  <Clock className="h-3 w-3" />
                  {recipe.time} dk
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function ProductTour() {
  return (
    <>
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <p className="text-sm font-semibold tracking-wide text-brand-600 uppercase">
            Keşfet
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Aradığın lezzet birkaç dokunuş ötede
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            Akşam yemeği kararını zorlaştıran uzun aramalara son. Filtreleri
            seç, sana uygun tarifleri hemen gör.
          </p>
          <PointList points={SEARCH_POINTS} />
        </div>
        <SearchPreview />
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-20 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <img
          src={photoUrl(PHOTOS.table, 1000)}
          alt="Ahşap masada ev yemekleri"
          loading="lazy"
          className="aspect-4/3 w-full rounded-[2rem] bg-sand-200 object-cover lg:order-first"
        />
        <div>
          <p className="text-sm font-semibold tracking-wide text-brand-600 uppercase">
            Tarif defterin
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Tarifler kâğıtlarda kaybolmasın
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            Aileden kalan defterler, not kâğıtları, ekran görüntüleri… Hepsini
            fotoğraflarıyla birlikte tek bir yerde sakla.
          </p>
          <PointList points={NOTEBOOK_POINTS} />
        </div>
      </section>

      <section className="bg-herb-900 text-paper">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div>
            <p className="text-sm font-semibold tracking-wide text-saffron uppercase">
              Organization hesapları
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Mutfaklar ve topluluklar için düzenli bir vitrin
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-paper/75">
              Tüm tarifleri tek panelden gör, kategorileri yönet, içeriğini
              düzenli tut.
            </p>
          </div>
          <div
            aria-hidden="true"
            className="rounded-2xl bg-white p-4 text-ink shadow-lift sm:p-5"
          >
            <p className="font-display text-lg font-semibold">Tag Yönetimi</p>
            <ul className="mt-3 divide-y divide-sand-200">
              {PREVIEW_TAGS.map((tag) => (
                <li
                  key={tag}
                  className="flex items-center justify-between py-3 text-sm font-medium"
                >
                  {tag}
                  <span className="flex gap-3 text-ink-muted">
                    <Pencil className="h-4 w-4" />
                    <Trash2 className="h-4 w-4" />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
