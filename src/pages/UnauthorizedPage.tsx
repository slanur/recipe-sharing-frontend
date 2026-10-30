import { Lock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { buttonClass } from '@/components/ui/buttonStyles'
import { StateMessage } from '@/components/ui/StateMessage'

export function UnauthorizedPage() {
  return (
    <section className="mx-auto max-w-lg px-4 py-20">
      <title>Yetkisiz Erişim · Sofra</title>
      <h1 className="sr-only">Yetkisiz Erişim</h1>
      <StateMessage
        icon={Lock}
        title="Bu sayfa sana kapalı"
        description="Bu sayfayı görüntülemek için yetkiniz yok."
        action={
          <Link to="/" className={buttonClass('secondary')}>
            Ana Sayfaya Dön
          </Link>
        }
      />
    </section>
  )
}
