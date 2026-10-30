import { isAxiosError } from 'axios'

export function getErrorMessage(error: unknown, fallback: string) {
  if (!isAxiosError<{ message?: string }>(error)) return fallback
  if (!error.response) return 'Sunucuya ulaşılamadı. Lütfen tekrar deneyin.'
  return error.response.data?.message ?? fallback
}
