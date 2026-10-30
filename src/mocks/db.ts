import type { ApiItem, ApiOrganization, ApiTag } from '@/types/api'
import { photoUrl } from '@/utils/photos'

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

const STORAGE_KEY = 'mock-db-v2'
const ORGANIZATION_ID = 'org-lezzet'
const DEMO_PASSWORD = 'demo1234'

interface SeedRecipe {
  name: string
  description: string
  minutes: number
  tagId: string
  photos: string[]
}

const SEED_RECIPES: SeedRecipe[] = [
  {
    name: 'Mercimek Çorbası',
    description:
      'Limon ve pul biberle servis edilen, her sofranın klasiği.\n\nSoğanı ve havucu tereyağında kavurun. Yıkanmış kırmızı mercimeği ve sıcak suyu ekleyip mercimekler yumuşayana kadar pişirin.\n\nBlenderdan geçirin, tuzunu ayarlayın. Üzerine kızdırılmış pul biberli tereyağı gezdirip limonla servis edin.',
    minutes: 35,
    tagId: 'tag-corba',
    photos: ['photo-1530734575165-ce39d996fbaa', 'photo-1781332152758-8cb1d61f2192'],
  },
  {
    name: 'Ezogelin Çorbası',
    description:
      'Bulgur ve pirinçle hazırlanan, nane kokulu doyurucu bir çorba.\n\nSoğanı salçayla kavurun. Mercimek, bulgur ve pirinci ekleyip sıcak suyla kaynatın.\n\nTaneler yumuşayınca kuru nane ve pul biberle tatlandırın, sıcak servis edin.',
    minutes: 40,
    tagId: 'tag-corba',
    photos: ['photo-1781332152758-8cb1d61f2192'],
  },
  {
    name: 'Zencefilli Havuç Çorbası',
    description:
      'Kadifemsi dokusu ve hafif acısıyla kış günlerinin favorisi.\n\nHavuç ve soğanı zeytinyağında çevirin, rendelenmiş zencefil ekleyin.\n\nSebze suyuyla pişirip blenderdan geçirin. Taze maydanozla servis edin.',
    minutes: 30,
    tagId: 'tag-corba',
    photos: ['photo-1642497394078-4794e837019c'],
  },
  {
    name: 'Karnıyarık',
    description:
      'Kıymalı harçla doldurulmuş, fırında kızarmış patlıcanlar.\n\nPatlıcanları alacalı soyup kızartın. Kıymayı soğan, biber ve domatesle kavurun.\n\nPatlıcanların ortasını açıp harcı doldurun, üzerine domates dilimi koyup fırında pişirin.',
    minutes: 70,
    tagId: 'tag-ana-yemek',
    photos: ['photo-1782878906030-a1c4b89aefab'],
  },
  {
    name: 'Ev Mantısı',
    description:
      'Sarımsaklı yoğurt ve tereyağlı sosla servis edilen ince hamurlu mantı.\n\nHamuru açıp küçük kareler kesin, kıymalı iç harcı koyup kapatın.\n\nTuzlu suda haşlayın. Üzerine sarımsaklı yoğurt ve pul biberli tereyağı dökün.',
    minutes: 120,
    tagId: 'tag-ana-yemek',
    photos: ['photo-1719454260936-caa0a804f154'],
  },
  {
    name: 'Fırında Tavuk ve Patates',
    description:
      'Baharatlı tavuk ve altın renkli patateslerle pratik bir akşam yemeği.\n\nTavukları yoğurt, salça ve baharatlarla marine edin.\n\nPatateslerle birlikte tepsiye dizip önceden ısıtılmış fırında kızarana kadar pişirin.',
    minutes: 55,
    tagId: 'tag-ana-yemek',
    photos: ['photo-1705088295364-6e98d62a3146'],
  },
  {
    name: 'Fırında Patlıcan Dilimleri',
    description:
      'Domates ve otlarla fırınlanmış hafif bir sebze yemeği.\n\nPatlıcanları dilimleyip tuzlayın, zeytinyağı sürün.\n\nDomates ve sarımsakla birlikte fırınlayın, taze otlarla servis edin.',
    minutes: 45,
    tagId: 'tag-ana-yemek',
    photos: ['photo-1740077975984-f2670ed698d9'],
  },
  {
    name: 'Fırın Sütlaç',
    description:
      'Üzeri nar gibi kızarmış, geleneksel sütlü tatlı.\n\nPirinci haşlayın, süt ve şekeri ekleyip kaynatın. Nişastayla kıvam verin.\n\nKaselere paylaştırıp ızgarada üzeri kızarana kadar fırınlayın.',
    minutes: 60,
    tagId: 'tag-tatli',
    photos: ['photo-1606728099646-68d5a0a4d423'],
  },
  {
    name: 'Fıstıklı Baklava',
    description:
      'İncecik yufka katları ve bol Antep fıstığıyla bayram sofralarının yıldızı.\n\nYufkaları tereyağıyla katlayıp araya fıstık serpin.\n\nFırında kızartın, ılık şerbeti dökün ve dinlendirip servis edin.',
    minutes: 90,
    tagId: 'tag-tatli',
    photos: ['photo-1617806501553-d3a6a3a7b227'],
  },
  {
    name: 'Şöbiyet',
    description:
      'Kaymak ve fıstıkla doldurulmuş, şerbetli hamur tatlısı.\n\nYufkaları üçgen şeklinde katlayıp iç harcı yerleştirin.\n\nFırınlayın, şerbetini dökün ve üzerine fıstık serpin.',
    minutes: 80,
    tagId: 'tag-tatli',
    photos: ['photo-1598110750624-207050c4f28c'],
  },
  {
    name: 'Fıstıklı Tel Kadayıf',
    description:
      'Çıtır kadayıf, altın renkli tereyağı ve bol fıstık.\n\nKadayıfı tereyağıyla harmanlayıp tepsiye bastırın.\n\nKızarana kadar fırınlayın, şerbetini gezdirip fıstıkla süsleyin.',
    minutes: 50,
    tagId: 'tag-tatli',
    photos: ['photo-1778448563279-e7b39093933c'],
  },
  {
    name: 'Çoban Salata',
    description:
      'Domates, salatalık ve biberle hazırlanan ferah bir eşlikçi.\n\nSebzeleri küçük küpler halinde doğrayın.\n\nZeytinyağı, limon ve tuzla harmanlayıp hemen servis edin.',
    minutes: 15,
    tagId: 'tag-salata',
    photos: ['photo-1654216548994-eefcba14db5c'],
  },
  {
    name: 'Gavurdağı Salatası',
    description:
      'Cevizli ve nar ekşili, bol malzemeli Antep lezzeti.\n\nDomates, soğan ve maydanozu ince ince doğrayın.\n\nCeviz, sumak, nar ekşisi ve zeytinyağıyla karıştırın.',
    minutes: 20,
    tagId: 'tag-salata',
    photos: ['photo-1641898378768-9b40ddcf2815'],
  },
  {
    name: 'Domatesli Yaz Salatası',
    description:
      'Mevsim domatesleri ve taze otlarla sade bir başlangıç.\n\nDomatesleri iri doğrayıp tuzlayın.\n\nZeytinyağı, sirke ve taze otlarla harmanlayıp servis edin.',
    minutes: 10,
    tagId: 'tag-salata',
    photos: ['photo-1719196339826-c66c13ad5b86'],
  },
  {
    name: 'Sebzeli Et Güveci',
    description:
      'Ağır ateşte pişen, kokusu mutfağı saran doyurucu bir tencere yemeği.\n\nEti mühürleyin, soğan ve salçayla kavurun.\n\nSebzeleri ekleyip kısık ateşte et yumuşayana kadar pişirin.',
    minutes: 100,
    tagId: 'tag-ana-yemek',
    photos: ['photo-1591386767153-987783380885'],
  },
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
    items: SEED_RECIPES.map((recipe, index) => ({
      id: `recipe-${index + 1}`,
      name: recipe.name,
      description: recipe.description,
      value: recipe.minutes,
      tags: tags
        .filter((tag) => tag.id === recipe.tagId)
        .map(({ id, name }) => ({ id, name })),
      photos: recipe.photos.map((photo, photoIndex) => ({
        id: `photo-${index + 1}-${photoIndex + 1}`,
        url: photoUrl(photo, 1000),
      })),
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
