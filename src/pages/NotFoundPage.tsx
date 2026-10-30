import { UtensilsCrossed } from 'lucide-react'
import { Link } from 'react-router-dom'
import { buttonClass } from '@/components/ui/buttonStyles'
import { StateMessage } from '@/components/ui/StateMessage'

export function NotFoundPage() {
  return (
    <section className="mx-auto max-w-lg px-4 py-20">
      <title>Sayfa Bulunamadı · Sofra</title>
      <h1 className="sr-only">Sayfa Bulunamadı</h1>
      <StateMessage
        icon={UtensilsCrossed}
        title="Bu sofra boş görünüyor"
        description="Aradığınız sayfa mevcut değil."
        action={
          <Link to="/" className={buttonClass('secondary')}>
            Ana Sayfaya Dön
          </Link>
        }
      />
    </section>
  )
}
