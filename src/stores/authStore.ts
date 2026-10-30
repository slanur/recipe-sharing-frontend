import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AuthTokens } from '@/types/auth'
import { getRole } from '@/utils/jwt'

interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  setTokens: (tokens: AuthTokens) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      setTokens: ({ accessToken, refreshToken }) =>
        set({ accessToken, refreshToken }),
      logout: () => set({ accessToken: null, refreshToken: null }),
    }),
    { name: 'auth' },
  ),
)

export const selectIsAuthenticated = (state: AuthState) =>
  state.refreshToken !== null

export const selectRole = (state: AuthState) =>
  state.accessToken ? getRole(state.accessToken) : null
