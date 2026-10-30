import { isAxiosError, type InternalAxiosRequestConfig } from 'axios'
import { refreshTokens } from '@/api/auth.api'
import { apiClient } from '@/api/client'
import { useAuthStore } from '@/stores/authStore'

interface RetriableRequest extends InternalAxiosRequestConfig {
  retried?: boolean
}

const isAuthRequest = (config: InternalAxiosRequestConfig) =>
  config.url?.startsWith('/auth/') ?? false

let pendingRefresh: Promise<string> | null = null

async function requestNewAccessToken() {
  const { refreshToken, setTokens } = useAuthStore.getState()
  if (!refreshToken) throw new Error('Refresh token yok')

  const tokens = await refreshTokens(refreshToken)
  setTokens({
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken ?? refreshToken,
  })
  return tokens.accessToken
}

// Aynı anda 401 alan istekler tek bir refresh isteğini bekler.
function refreshAccessToken() {
  pendingRefresh ??= requestNewAccessToken().finally(() => {
    pendingRefresh = null
  })
  return pendingRefresh
}

export function setupInterceptors() {
  apiClient.interceptors.request.use((config) => {
    const { accessToken } = useAuthStore.getState()
    if (accessToken && !isAuthRequest(config)) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  })

  apiClient.interceptors.response.use(undefined, async (error) => {
    const request: RetriableRequest | undefined = error.config
    const shouldRefresh =
      error.response?.status === 401 &&
      request &&
      !request.retried &&
      !isAuthRequest(request)

    if (!shouldRefresh) throw error

    request.retried = true
    try {
      await refreshAccessToken()
    } catch (refreshError) {
      // Bağlantı hatasında oturum kapatılmaz; refresh token hâlâ geçerli olabilir.
      const isNetworkError = isAxiosError(refreshError) && !refreshError.response
      if (!isNetworkError) useAuthStore.getState().logout()
      throw error
    }
    return apiClient(request)
  })
}
