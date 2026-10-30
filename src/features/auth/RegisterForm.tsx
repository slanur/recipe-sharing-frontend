import { Building2, ChefHat, Mail, type LucideIcon } from 'lucide-react'
import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { register, registerOrganization } from '@/api/auth.api'
import { getOrganizations } from '@/api/organizations.api'
import { Alert } from '@/components/ui/Alert'
import { Button } from '@/components/ui/Button'
import { PasswordField } from '@/components/ui/PasswordField'
import { SelectField } from '@/components/ui/SelectField'
import { TextField } from '@/components/ui/TextField'
import { validateEmail, validatePassword } from '@/features/auth/validation'
import type { ApiOrganization } from '@/types/api'
import type { Role } from '@/types/auth'
import { getErrorMessage } from '@/utils/apiError'

const ROLE_OPTIONS: {
  value: Role
  label: string
  description: string
  icon: LucideIcon
}[] = [
  {
    value: 'User',
    label: 'Kullanıcı',
    description: 'Tarif paylaş ve keşfet',
    icon: ChefHat,
  },
  {
    value: 'Organization',
    label: 'Organization',
    description: 'Kategorileri yönet',
    icon: Building2,
  },
]

export function RegisterForm() {
  const navigate = useNavigate()
  const [role, setRole] = useState<Role>('User')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [organizationId, setOrganizationId] = useState('')
  const [organizations, setOrganizations] = useState<ApiOrganization[]>([])
  const [isLoadingOrganizations, setIsLoadingOrganizations] = useState(true)
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string
    password?: string
    organizationId?: string
  }>({})
  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    let isActive = true
    getOrganizations()
      .then((data) => {
        if (isActive) setOrganizations(data)
      })
      .catch((error) => {
        if (isActive) {
          setFormError(getErrorMessage(error, 'Organization listesi alınamadı'))
        }
      })
      .finally(() => {
        if (isActive) setIsLoadingOrganizations(false)
      })
    return () => {
      isActive = false
    }
  }, [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const errors = {
      email: validateEmail(email),
      password: validatePassword(password),
      organizationId: organizationId ? undefined : 'Organization seçin',
    }
    setFieldErrors(errors)
    setFormError('')
    if (errors.email || errors.password || errors.organizationId) return

    const payload = { email: email.trim(), password, organizationId }
    setIsSubmitting(true)
    try {
      await (role === 'User' ? register : registerOrganization)(payload)
      navigate('/login', { state: { registered: true } })
    } catch (error) {
      setFormError(getErrorMessage(error, 'Kayıt yapılamadı'))
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {formError && <Alert tone="error">{formError}</Alert>}
      <fieldset>
        <legend className="mb-1.5 text-sm font-semibold text-ink">
          Hesap türü
        </legend>
        <div className="grid grid-cols-2 gap-2.5">
          {ROLE_OPTIONS.map(({ value, label, description, icon: Icon }) => (
            <label
              key={value}
              className="cursor-pointer rounded-2xl border border-sand-300 bg-white p-3.5 transition-colors hover:border-ink-muted has-checked:border-brand-600 has-checked:bg-brand-50 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-brand-600"
            >
              <input
                type="radio"
                name="role"
                value={value}
                checked={role === value}
                onChange={() => setRole(value)}
                className="sr-only"
              />
              <Icon aria-hidden="true" className="h-5 w-5 text-brand-600" />
              <span className="mt-2 block text-sm font-semibold text-ink">
                {label}
              </span>
              <span className="block text-xs text-ink-soft">{description}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <TextField
        label="E-posta"
        type="email"
        icon={Mail}
        placeholder="ornek@eposta.com"
        autoComplete="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        error={fieldErrors.email}
      />
      <PasswordField
        label="Şifre"
        placeholder="En az 8 karakter"
        autoComplete="new-password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        error={fieldErrors.password}
      />
      <SelectField
        label="Organization"
        value={organizationId}
        onChange={(event) => setOrganizationId(event.target.value)}
        disabled={isLoadingOrganizations}
        error={fieldErrors.organizationId}
      >
        <option value="">
          {isLoadingOrganizations ? 'Yükleniyor...' : 'Seçin'}
        </option>
        {organizations.map((organization) => (
          <option key={organization.id} value={organization.id}>
            {organization.name}
          </option>
        ))}
      </SelectField>
      <Button type="submit" size="lg" isLoading={isSubmitting} className="w-full">
        Hesabımı Oluştur
      </Button>
    </form>
  )
}
