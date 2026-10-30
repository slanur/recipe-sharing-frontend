import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { register, registerOrganization } from '@/api/auth.api'
import { getOrganizations } from '@/api/organizations.api'
import { Alert } from '@/components/ui/Alert'
import { Button } from '@/components/ui/Button'
import { SelectField } from '@/components/ui/SelectField'
import { TextField } from '@/components/ui/TextField'
import { validateEmail, validatePassword } from '@/features/auth/validation'
import type { ApiOrganization } from '@/types/api'
import type { Role } from '@/types/auth'
import { getErrorMessage } from '@/utils/apiError'

const ROLE_OPTIONS: { value: Role; label: string }[] = [
  { value: 'User', label: 'Kullanıcı' },
  { value: 'Organization', label: 'Organization' },
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
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {formError && <Alert tone="error">{formError}</Alert>}
      <fieldset>
        <legend className="text-sm font-medium text-stone-800">
          Hesap türü
        </legend>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {ROLE_OPTIONS.map((option) => (
            <label
              key={option.value}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-800 has-checked:border-orange-700 has-checked:bg-orange-50"
            >
              <input
                type="radio"
                name="role"
                value={option.value}
                checked={role === option.value}
                onChange={() => setRole(option.value)}
                className="accent-orange-700"
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>
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
      <Button type="submit" isLoading={isSubmitting} className="w-full">
        Kayıt Ol
      </Button>
    </form>
  )
}
