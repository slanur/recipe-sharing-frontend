import { Building2, ChefHat, Heart, type LucideIcon } from 'lucide-react'
import { FinalCta } from '@/features/landing/FinalCta'
import { PHOTOS, photoUrl } from '@/utils/photos'

interface Audience {
  title: string
  text: string
  icon: LucideIcon
}

const AUDIENCES: Audience[] = [
  {
    title: 'Ev aşçıları için',
    text: 'Tarifleri arayıp keşfedebilir, kendi tariflerini fotoğraflarıyla ekleyip dilediğin zaman düzenleyebilirsin.',
    icon: ChefHat,
  },
  {
    title: 'Organization hesapları için',
    text: 'Tüm tarifleri tek panelden görebilir, kategorileri düzenli tutan etiketleri kolayca yönetebilirsin.',
    icon: Building2,
  },
  {
    title: 'Paylaşmayı sevenler için',
    text: 'Bir tarif, paylaşıldığında yaşar. Sofra bunun için sade ve sıcak bir yer sunar.',
    icon: Heart,
  },
]

export function AboutPage() {
  return (
    <>
      <title>Hakkında · Sofra</title>
      <section className="mx-auto max-w-4xl animate-rise px-4 pt-14 pb-12 text-center sm:px-6">
        <p className="text-sm font-semibold tracking-wide text-brand-600 uppercase">
          Hakkımızda
        </p>
        <h1 className="mt-4 font-display text-4xl leading-tight font-semibold tracking-tight text-ink sm:text-6xl">
          Her tarifin bir hikâyesi var.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
          Sofra, ev yemeklerinin kuşaktan kuşağa aktarılan sıcaklığını dijital
          bir tarif defterinde bir araya getirir. Paylaşmak, keşfetmek ve
          saklamak için tasarlandı.
        </p>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <img
          src={photoUrl(PHOTOS.feast, 1500)}
          alt="Farklı yemeklerle dolu bir sofra"
          className="aspect-video w-full rounded-[2rem] bg-sand-200 object-cover sm:aspect-21/9"
        />
      </div>

      <section className="mx-auto max-w-6xl px-4 pt-16 sm:px-6">
        <ul className="grid gap-4 md:grid-cols-3">
          {AUDIENCES.map(({ title, text, icon: Icon }) => (
            <li key={title} className="rounded-3xl bg-white p-6 shadow-card">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <h2 className="mt-4 font-display text-xl font-semibold text-ink">
                {title}
              </h2>
              <p className="mt-2 leading-relaxed text-ink-soft">{text}</p>
            </li>
          ))}
        </ul>
      </section>

      <FinalCta />
    </>
  )
}
