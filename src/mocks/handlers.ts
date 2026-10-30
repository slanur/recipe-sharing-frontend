import { delay, http, HttpResponse } from 'msw'
import { db, saveDb, type MockItem, type MockUser } from '@/mocks/db'
import type {
  ApiItemPayload,
  LoginPayload,
  RegisterPayload,
} from '@/types/api'

const ACCESS_TOKEN_SECONDS = 15 * 60

const url = (path: string) => `${import.meta.env.VITE_API_BASE_URL}${path}`

const errorResponse = (status: number, message: string) =>
  HttpResponse.json({ message }, { status })

function encodeSegment(value: object) {
  return btoa(JSON.stringify(value))
    .replace(/=+$/, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}

function createTokens(user: MockUser) {
  const exp = Math.floor(Date.now() / 1000) + ACCESS_TOKEN_SECONDS
  const accessToken = [
    encodeSegment({ alg: 'none', typ: 'JWT' }),
    encodeSegment({ sub: user.id, role: user.role, exp }),
    'mock',
  ].join('.')
  const refreshToken = crypto.randomUUID()

  db.refreshTokens[refreshToken] = user.id
  saveDb()
  return { accessToken, refreshToken }
}

function requireUser(request: Request) {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '')
  try {
    const encoded = token!.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    const { sub, exp } = JSON.parse(atob(encoded))
    const user = db.users.find(({ id }) => id === sub)
    if (user && exp > Date.now() / 1000) return user
  } catch {
    // Bozuk token aşağıda 401 olarak döner.
  }
  throw errorResponse(401, 'Oturum süresi doldu')
}

function requireOrganization(user: MockUser) {
  if (user.role !== 'Organization User') {
    throw errorResponse(403, 'Bu işlem için yetkiniz yok')
  }
}

function requireItem(user: MockUser, id: unknown) {
  const item = db.items.find(
    (candidate) =>
      candidate.id === id && candidate.organizationId === user.organizationId,
  )
  if (!item) throw errorResponse(404, 'Tarif bulunamadı')
  return item
}

function requireManagedItem(user: MockUser, id: unknown) {
  const item = requireItem(user, id)
  if (user.role !== 'Organization User' && item.ownerId !== user.id) {
    throw errorResponse(403, 'Bu tarif size ait değil')
  }
  return item
}

function toTags(user: MockUser, ids: string[]) {
  return db.tags
    .filter(
      (tag) =>
        ids.includes(tag.id) && tag.organizationId === user.organizationId,
    )
    .map(({ id, name }) => ({ id, name }))
}

function serialize({ organizationId: _organizationId, ...item }: MockItem) {
  return item
}

function readAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

function registerUser(payload: RegisterPayload, role: MockUser['role']) {
  if (db.users.some(({ email }) => email === payload.email)) {
    return errorResponse(409, 'Bu e-posta adresi zaten kayıtlı')
  }
  if (!db.organizations.some(({ id }) => id === payload.organizationId)) {
    return errorResponse(400, 'Organization bulunamadı')
  }
  db.users.push({ id: crypto.randomUUID(), role, ...payload })
  saveDb()
  return new HttpResponse(null, { status: 201 })
}

export const handlers = [
  http.all(url('/*'), async () => {
    await delay(200)
  }),

  http.post(url('/auth/login'), async ({ request }) => {
    const { email, password } = (await request.json()) as LoginPayload
    const user = db.users.find(
      (candidate) =>
        candidate.email === email && candidate.password === password,
    )
    if (!user) return errorResponse(401, 'E-posta veya şifre hatalı')
    return HttpResponse.json(createTokens(user))
  }),

  http.post(url('/auth/register'), async ({ request }) =>
    registerUser((await request.json()) as RegisterPayload, 'User'),
  ),

  http.post(url('/auth/register-organization'), async ({ request }) =>
    registerUser((await request.json()) as RegisterPayload, 'Organization User'),
  ),

  http.post(url('/auth/refresh'), async ({ request }) => {
    const { refreshToken } = (await request.json()) as { refreshToken: string }
    const user = db.users.find(({ id }) => id === db.refreshTokens[refreshToken])
    if (!user) return errorResponse(401, 'Oturum süresi doldu')
    delete db.refreshTokens[refreshToken]
    return HttpResponse.json(createTokens(user))
  }),

  http.get(url('/organizations/get-all-organizations'), () =>
    HttpResponse.json(db.organizations),
  ),

  http.get(url('/tags/get-tags'), ({ request }) => {
    const user = requireUser(request)
    return HttpResponse.json(
      db.tags
        .filter((tag) => tag.organizationId === user.organizationId)
        .map(({ id, name }) => ({ id, name })),
    )
  }),

  http.post(url('/tags/create-tag'), async ({ request }) => {
    const user = requireUser(request)
    requireOrganization(user)
    const { name } = (await request.json()) as { name: string }
    const tag = { id: crypto.randomUUID(), name }
    db.tags.push({ ...tag, organizationId: user.organizationId })
    saveDb()
    return HttpResponse.json(tag, { status: 201 })
  }),

  http.put(url('/tags/update-tag/:id'), async ({ request, params }) => {
    const user = requireUser(request)
    requireOrganization(user)
    const { name } = (await request.json()) as { name: string }
    const tag = db.tags.find(({ id }) => id === params.id)
    if (!tag) return errorResponse(404, 'Tag bulunamadı')
    tag.name = name
    db.items.forEach((item) => {
      item.tags = item.tags.map((itemTag) =>
        itemTag.id === tag.id ? { ...itemTag, name } : itemTag,
      )
    })
    saveDb()
    return HttpResponse.json({ id: tag.id, name })
  }),

  http.delete(url('/tags/delete-tag/:id'), ({ request, params }) => {
    const user = requireUser(request)
    requireOrganization(user)
    db.tags = db.tags.filter(({ id }) => id !== params.id)
    db.items.forEach((item) => {
      item.tags = item.tags.filter(({ id }) => id !== params.id)
    })
    saveDb()
    return new HttpResponse(null, { status: 204 })
  }),

  http.get(url('/items/get-items'), ({ request }) => {
    const user = requireUser(request)
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('searchTerm')?.toLocaleLowerCase('tr')
    const tagId = searchParams.get('tagId')
    const sort = searchParams.get('sort')
    const page = Number(searchParams.get('page') ?? 1)
    const limit = Number(searchParams.get('limit') ?? 20)

    const items = db.items
      .filter(
        (item) =>
          item.organizationId === user.organizationId &&
          (!search || item.name.toLocaleLowerCase('tr').includes(search)) &&
          (!tagId || item.tags.some(({ id }) => id === tagId)),
      )
      .sort((a, b) =>
        sort === 'oldest'
          ? a.createdAt.localeCompare(b.createdAt)
          : b.createdAt.localeCompare(a.createdAt),
      )

    return HttpResponse.json({
      items: items.slice((page - 1) * limit, page * limit).map(serialize),
      page,
      totalPages: Math.max(Math.ceil(items.length / limit), 1),
    })
  }),

  http.get(url('/items/get-item/:id'), ({ request, params }) =>
    HttpResponse.json(serialize(requireItem(requireUser(request), params.id))),
  ),

  http.post(url('/items/add-item'), async ({ request }) => {
    const user = requireUser(request)
    const payload = (await request.json()) as ApiItemPayload
    const item: MockItem = {
      ...payload,
      id: crypto.randomUUID(),
      tags: toTags(user, payload.tags),
      photos: [],
      ownerId: user.id,
      organizationId: user.organizationId,
      createdAt: new Date().toISOString(),
    }
    db.items.push(item)
    saveDb()
    return HttpResponse.json(serialize(item), { status: 201 })
  }),

  http.patch(url('/items/update-item/:id'), async ({ request, params }) => {
    const user = requireUser(request)
    const item = requireManagedItem(user, params.id)
    const payload = (await request.json()) as ApiItemPayload
    Object.assign(item, payload, { tags: toTags(user, payload.tags) })
    saveDb()
    return HttpResponse.json(serialize(item))
  }),

  http.delete(url('/items/delete-item/:id'), ({ request, params }) => {
    const item = requireManagedItem(requireUser(request), params.id)
    db.items = db.items.filter(({ id }) => id !== item.id)
    saveDb()
    return new HttpResponse(null, { status: 204 })
  }),

  http.post(url('/items/add-item-photo'), async ({ request }) => {
    const user = requireUser(request)
    const formData = await request.formData()
    const item = requireManagedItem(user, formData.get('itemId'))
    const photo = {
      id: crypto.randomUUID(),
      url: await readAsDataUrl(formData.get('file') as File),
    }
    item.photos = [...(item.photos ?? []), photo]
    saveDb()
    return HttpResponse.json(photo, { status: 201 })
  }),

  http.delete(
    url('/items/delete-item-photo/:itemId/:photoId'),
    ({ request, params }) => {
      const item = requireManagedItem(requireUser(request), params.itemId)
      item.photos = item.photos?.filter(({ id }) => id !== params.photoId)
      saveDb()
      return new HttpResponse(null, { status: 204 })
    },
  ),
]
