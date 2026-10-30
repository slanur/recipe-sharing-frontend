import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAccountCta } from '@/features/landing/useAccountCta'
import { PHOTOS, photoUrl } from '@/utils/photos'

const CATEGORIES = [
  { name: 'Çorbalar', photo: PHOTOS.soup },
  { name: 'Ana Yemekler', photo: PHOTOS.eggplant },
  { name: 'Tatlılar', photo: PHOTOS.pudding },
  { name: 'Salatalar', photo: PHOTOS.salad },
]

export function Categories() {
  const cta = useAccountCta()

  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        Bugün canın ne çekiyor?
      </h2>
      <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {CATEGORIES.map((category) => (
          <li key={category.name}>
            <Link
              to={cta.to}
              className="group relative block aspect-4/5 overflow-hidden rounded-3xl bg-sand-200"
            >
              <img
                src={photoUrl(category.photo, 600)}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-linear-to-t from-ink/75 via-ink/5 to-transparent" />
              <span className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-2 font-display text-xl font-semibold text-white sm:text-2xl">
                {category.name}
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
