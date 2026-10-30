import { ArrowRight, Check, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { buttonClass } from '@/components/ui/buttonStyles'
import { useAccountCta } from '@/features/landing/useAccountCta'
import { PHOTOS, photoUrl } from '@/utils/photos'

const HIGHLIGHTS = ['Ücretsiz hesap', 'Kurulum yok', 'Telefonda da rahat']

export function Hero() {
  const cta = useAccountCta()

  return (
    <section className="mx-auto grid max-w-7xl items-center gap-14 px-4 pt-10 pb-16 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:px-8 lg:pt-14 lg:pb-24">
      <div className="animate-rise">
        <p className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-600" />
          Ev yemeklerinin yeni adresi
        </p>
        <h1 className="mt-5 font-display text-5xl leading-[1.04] font-semibold tracking-tight text-ink sm:text-6xl xl:text-7xl">
          Evdeki en güzel tarifler,{' '}
          <em className="font-medium text-brand-600">aynı sofrada.</em>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
          Sofra, ev yemeği tariflerini paylaşmanı, yeni lezzetler keşfetmeni ve
          kendi tarif defterini tek bir yerde tutmanı sağlar.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to={cta.to} className={buttonClass('primary', 'lg')}>
            {cta.label}
            <ArrowRight aria-hidden="true" className="h-4.5 w-4.5" />
          </Link>
          <Link to="/#nasil-calisir" className={buttonClass('secondary', 'lg')}>
            Nasıl Çalışır?
          </Link>
        </div>
        <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-ink-soft">
          {HIGHLIGHTS.map((highlight) => (
            <li key={highlight} className="flex items-center gap-1.5">
              <Check aria-hidden="true" className="h-4 w-4 text-herb-700" />
              {highlight}
            </li>
          ))}
        </ul>
      </div>

      <div
        className="relative animate-rise pb-10 [animation-delay:120ms] sm:pr-10"
        aria-hidden="true"
      >
        <img
          src={photoUrl(PHOTOS.feast, 1100)}
          alt=""
          className="aspect-5/4 w-full rounded-[2rem] bg-sand-200 object-cover shadow-lift"
        />
        <img
          src={photoUrl(PHOTOS.baklava, 420)}
          alt=""
          className="absolute -top-5 right-0 hidden h-36 w-36 rotate-3 rounded-3xl border-4 border-paper bg-sand-200 object-cover shadow-lift sm:block"
        />
        <div className="absolute bottom-0 left-4 flex w-64 items-center gap-3 rounded-2xl bg-white p-2.5 shadow-lift sm:left-8">
          <img
            src={photoUrl(PHOTOS.soup, 180)}
            alt=""
            className="h-16 w-16 rounded-xl bg-sand-200 object-cover"
          />
          <div className="min-w-0">
            <p className="text-xs font-semibold tracking-wide text-brand-600 uppercase">
              Çorba
            </p>
            <p className="truncate font-display font-semibold text-ink">
              Mercimek Çorbası
            </p>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-ink-soft">
              <Clock className="h-3 w-3" />
              35 dakika
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
