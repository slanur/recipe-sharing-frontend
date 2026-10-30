import { Link } from 'react-router-dom'
import { AuthCard } from '@/features/auth/AuthCard'
import { RegisterForm } from '@/features/auth/RegisterForm'

export function RegisterPage() {
  return (
    <AuthCard
      title="Sofraya katıl"
      description="Tariflerini paylaşmaya birkaç saniyede başla."
    >
      <RegisterForm />
      <p className="mt-6 text-center text-sm text-ink-soft">
        Zaten hesabınız var mı?{' '}
        <Link
          to="/login"
          className="font-semibold text-brand-600 hover:text-brand-700"
        >
          Giriş yapın
        </Link>
      </p>
    </AuthCard>
  )
}
