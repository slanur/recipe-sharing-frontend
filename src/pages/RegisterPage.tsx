import { Link } from 'react-router-dom'
import { AuthCard } from '@/features/auth/AuthCard'
import { RegisterForm } from '@/features/auth/RegisterForm'

export function RegisterPage() {
  return (
    <AuthCard title="Kayıt Ol" description="Yeni bir hesap oluşturun.">
      <RegisterForm />
      <p className="mt-4 text-center text-sm text-stone-600">
        Zaten hesabınız var mı?{' '}
        <Link to="/login" className="font-medium text-orange-700">
          Giriş yapın
        </Link>
      </p>
    </AuthCard>
  )
}
