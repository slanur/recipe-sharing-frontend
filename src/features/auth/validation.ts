const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_PASSWORD_LENGTH = 8

export function validateEmail(email: string) {
  if (!email.trim()) return 'E-posta zorunludur'
  return EMAIL_PATTERN.test(email.trim())
    ? undefined
    : 'Geçerli bir e-posta girin'
}

export function validatePassword(password: string) {
  if (!password) return 'Şifre zorunludur'
  return password.length >= MIN_PASSWORD_LENGTH
    ? undefined
    : `Şifre en az ${MIN_PASSWORD_LENGTH} karakter olmalıdır`
}
