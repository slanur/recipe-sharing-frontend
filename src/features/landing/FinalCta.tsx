import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { buttonClass } from '@/components/ui/buttonStyles'
import { useAccountCta } from '@/features/landing/useAccountCta'
import { PHOTOS, photoUrl } from '@/utils/photos'

export function FinalCta() {
  const cta = useAccountCta()

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[2rem] bg-ink">
        <img
          src={photoUrl(PHOTOS.breakfast, 1500)}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-ink/90 via-ink/70 to-ink/30" />
        <div className="relative max-w-xl px-6 py-16 sm:px-12 sm:py-20">
          <h2 className="font-display text-4xl leading-tight font-semibold tracking-tight text-white sm:text-5xl">
            Bir sonraki favori tarifin seni bekliyor.
          </h2>
          <p className="mt-4 text-lg text-white/80">
            Sofra'ya katıl, tariflerini paylaşmaya bugün başla.
          </p>
          <Link to={cta.to} className={`${buttonClass('primary', 'lg')} mt-8`}>
            {cta.label}
            <ArrowRight aria-hidden="true" className="h-4.5 w-4.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
