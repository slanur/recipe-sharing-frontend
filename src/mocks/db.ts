import type { ApiItem, ApiOrganization, ApiTag } from '@/types/api'

export interface MockUser {
  id: string
  email: string
  password: string
  role: 'User' | 'Organization User'
  organizationId: string
}

export interface MockItem extends ApiItem {
  createdAt: string
  organizationId: string
}

interface MockDb {
  organizations: ApiOrganization[]
  users: MockUser[]
  tags: (ApiTag & { organizationId: string })[]
  items: MockItem[]
  refreshTokens: Record<string, string>
}

const STORAGE_KEY = 'mock-db'
const ORGANIZATION_ID = 'org-lezzet'
const DEMO_PASSWORD = 'demo1234'

const COLORS = ['#b45309', '#be123c', '#4d7c0f', '#0f766e', '#7c2d12', '#a16207']

function createImage(label: string, color: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="${color}"/><text x="200" y="160" text-anchor="middle" font-size="26" font-family="sans-serif" fill="#fff">${label}</text></svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

const SEED_RECIPES: [string, string, number, string][] = [
  ['Mercimek Çorbası', 'Limon ve kırmızı biberle servis edilen klasik çorba.', 35, 'tag-corba'],
  ['Ezogelin Çorbası', 'Bulgur ve pirinçle hazırlanan doyurucu bir çorba.', 40, 'tag-corba'],
  ['Domates Çorbası', 'Kaşar peyniriyle servis edilen kremalı çorba.', 30, 'tag-corba'],
  ['Karnıyarık', 'Kıymalı harçla doldurulmuş fırında patlıcan.', 70, 'tag-ana-yemek'],
  ['Mantı', 'Yoğurt ve tereyağlı sosla servis edilen ev mantısı.', 120, 'tag-ana-yemek'],
  ['Tavuk Sote', 'Sebzelerle sotelenmiş yumuşak tavuk parçaları.', 35, 'tag-ana-yemek'],
  ['Zeytinyağlı Yaprak Sarma', 'Limonlu ve baharatlı pirinç iç harcıyla.', 90, 'tag-ana-yemek'],
  ['Fırın Sütlaç', 'Üzeri fırınlanmış geleneksel sütlü tatlı.', 60, 'tag-tatli'],
  ['Revani', 'Şerbetli, irmikli yumuşak kek.', 55, 'tag-tatli'],
  ['Kazandibi', 'Tabanı karamelize edilmiş muhallebi.', 80, 'tag-tatli'],
  ['Çoban Salata', 'Domates, salatalık ve biberle hafif bir salata.', 15, 'tag-salata'],
  ['Gavurdağı Salatası', 'Cevizli ve nar ekşili bol malzemeli salata.', 20, 'tag-salata'],
  ['Kısır', 'İnce bulgur ve taze yeşilliklerle hazırlanır.', 25, 'tag-salata'],
  ['Kuru Fasulye', 'Pilavla servis edilen geleneksel ana yemek.', 100, 'tag-ana-yemek'],
]

function seed(): MockDb {
  const tags = [
    { id: 'tag-corba', name: 'Çorba', organizationId: ORGANIZATION_ID },
    { id: 'tag-ana-yemek', name: 'Ana Yemek', organizationId: ORGANIZATION_ID },
    { id: 'tag-tatli', name: 'Tatlı', organizationId: ORGANIZATION_ID },
    { id: 'tag-salata', name: 'Salata', organizationId: ORGANIZATION_ID },
  ]

  return {
    organizations: [{ id: ORGANIZATION_ID, name: 'Lezzet Mutfağı' }],
    users: [
      {
        id: 'user-demo',
        email: 'user@example.com',
        password: DEMO_PASSWORD,
        role: 'User',
        organizationId: ORGANIZATION_ID,
      },
      {
        id: 'user-other',
        email: 'other@example.com',
        password: DEMO_PASSWORD,
        role: 'User',
        organizationId: ORGANIZATION_ID,
      },
      {
        id: 'org-demo',
        email: 'org@example.com',
        password: DEMO_PASSWORD,
        role: 'Organization User',
        organizationId: ORGANIZATION_ID,
      },
    ],
    tags,
    items: SEED_RECIPES.map(([name, description, value, tagId], index) => ({
      id: `recipe-${index + 1}`,
      name,
      description,
      value,
      tags: tags
        .filter((tag) => tag.id === tagId)
        .map(({ id, name }) => ({ id, name })),
      photos: [
        {
          id: `photo-${index + 1}`,
          url: createImage(name, COLORS[index % COLORS.length]),
        },
      ],
      ownerId: index % 2 === 0 ? 'user-demo' : 'user-other',
      organizationId: ORGANIZATION_ID,
      createdAt: new Date(Date.UTC(2026, 0, index + 1)).toISOString(),
    })),
    refreshTokens: {},
  }
}

function load(): MockDb {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : seed()
  } catch {
    return seed()
  }
}

export const db = load()

export function saveDb() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db))
  } catch {
    // Depolama dolarsa değişiklikler sayfa yenilenene kadar bellekte kalır.
  }
}
