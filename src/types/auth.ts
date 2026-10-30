export type Role = 'User' | 'Organization'

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}
