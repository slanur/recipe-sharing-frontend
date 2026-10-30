import { apiClient } from '@/api/client'
import type {
  ApiAuthTokens,
  ApiRefreshResponse,
  LoginPayload,
  RegisterPayload,
} from '@/types/api'

export async function login(payload: LoginPayload) {
  const { data } = await apiClient.post<ApiAuthTokens>('/auth/login', payload)
  return data
}

export async function register(payload: RegisterPayload) {
  await apiClient.post('/auth/register', payload)
}

export async function registerOrganization(payload: RegisterPayload) {
  await apiClient.post('/auth/register-organization', payload)
}

export async function refreshTokens(refreshToken: string) {
  const { data } = await apiClient.post<ApiRefreshResponse>('/auth/refresh', {
    refreshToken,
  })
  return data
}
