import { Link, useLocation } from 'react-router-dom'
import { Alert } from '@/components/ui/Alert'
import { AuthCard } from '@/features/auth/AuthCard'
import { LoginForm } from '@/features/auth/LoginForm'

export function LoginPage() {
  const location = useLocation()

  return (
    <AuthCard
      title="Tekrar hoş geldin"
      description="Tarif defterine kaldığın yerden devam et."
    >
      {location.state?.registered && (
        <div className="mb-5">
          <Alert tone="success">Kaydınız tamamlandı. Giriş yapabilirsiniz.</Alert>
        </div>
      )}
      <LoginForm />
      <p className="mt-6 text-center text-sm text-ink-soft">
        Hesabınız yok mu?{' '}
        <Link
          to="/register"
          className="font-semibold text-brand-600 hover:text-brand-700"
        >
          Ücretsiz kayıt olun
        </Link>
      </p>
    </AuthCard>
  )
}
