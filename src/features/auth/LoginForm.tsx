import { useState, type FormEvent } from 'react'
import { login } from '@/api/auth.api'
import { Alert } from '@/components/ui/Alert'
import { Button } from '@/components/ui/Button'
import { TextField } from '@/components/ui/TextField'
import { validateEmail } from '@/features/auth/validation'
import { useAuthStore } from '@/stores/authStore'
import { getErrorMessage } from '@/utils/apiError'

export function LoginForm() {
  const setTokens = useAuthStore((state) => state.setTokens)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string
    password?: string
  }>({})
  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const errors = {
      email: validateEmail(email),
      password: password ? undefined : 'Şifre zorunludur',
    }
    setFieldErrors(errors)
    setFormError('')
    if (errors.email || errors.password) return

    setIsSubmitting(true)
    try {
      setTokens(await login({ email: email.trim(), password }))
    } catch (error) {
      setFormError(getErrorMessage(error, 'Giriş yapılamadı'))
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {formError && <Alert tone="error">{formError}</Alert>}
      <TextField
        label="E-posta"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        error={fieldErrors.email}
      />
      <TextField
        label="Şifre"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        error={fieldErrors.password}
      />
      <Button type="submit" isLoading={isSubmitting} className="w-full">
        Giriş Yap
      </Button>
    </form>
  )
}
