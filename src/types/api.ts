// İstek gövdeleri Postman'den alındı. Postman'de örnek yanıt olmadığı için
// yanıt tipleri (ApiTag, ApiItem, ApiItemPage, ApiAuthTokens, ApiOrganization)
// tahmindir; gerçek API açıldığında bu dosyadan doğrulanmalı.

export interface ApiAuthTokens {
  accessToken: string
  refreshToken: string
}

export interface ApiOrganization {
  id: string
  name: string
}

export interface ApiTag {
  id: string
  name: string
}

export interface ApiItem {
  id: string
  name: string
  description: string
  value: number
  tags: ApiTag[]
  photos?: string[]
}

export interface ApiItemPage {
  items: ApiItem[]
  page: number
  totalPages: number
}

export interface ApiItemPayload {
  name: string
  description: string
  value: number
  tags: string[]
}

export interface ApiItemQuery {
  sort?: string
  searchTerm?: string
  page?: number
  limit?: number
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload extends LoginPayload {
  organizationId: string
}
