import { Link, useLocation } from 'react-router-dom'
import { Alert } from '@/components/ui/Alert'
import { AuthCard } from '@/features/auth/AuthCard'
import { LoginForm } from '@/features/auth/LoginForm'

export function LoginPage() {
  const location = useLocation()

  return (
    <AuthCard title="Giriş Yap" description="Hesabınıza giriş yapın.">
      {location.state?.registered && (
        <div className="mb-4">
          <Alert tone="success">Kaydınız tamamlandı. Giriş yapabilirsiniz.</Alert>
        </div>
      )}
      <LoginForm />
      <p className="mt-4 text-center text-sm text-stone-600">
        Hesabınız yok mu?{' '}
        <Link to="/register" className="font-medium text-orange-700">
          Kayıt olun
        </Link>
      </p>
    </AuthCard>
  )
}
