# Sofra

Ev yemeği tariflerini paylaşmak ve keşfetmek için geliştirilmiş, Organization ve User olmak üzere iki ayrı paneli olan React uygulaması (Recipe Sharing App).

## Özellikler

- Access token ve refresh token ile oturum yönetimi, süresi dolan token'ın otomatik yenilenmesi
- JWT içindeki role göre yönlendirme (`PrivateRoute`, `RoleRoute`, `GuestRoute`)
- Landing, About, Login ve Register sayfaları
- **User paneli:** arama, kategori filtresi, sıralama ve sayfalamalı tarif listesi; tarif ekleme, güncelleme, silme; görsel ekleme ve silme
- **Organization paneli:** tarif listesi ve tag yönetimi
- Tüm ekranlarda responsive tasarım, mobilde alt sekme gezintisi
- Kendine ait tasarım sistemi: marka kimliği, tipografi, renk paleti, bildirimler ve yükleme iskeletleri

## Kullanılan Teknolojiler

- React ve TypeScript
- Vite
- React Router
- Tailwind CSS
- Axios
- Zustand
- Lucide (ikonlar)
- Fraunces ve DM Sans (yazı tipleri)
- Mock Service Worker (geliştirme ortamı için sahte API)
- oxlint

## Kurulum

Node.js 20.19+ veya 22.12+ gerekir.

```bash
git clone https://github.com/slanur/recipe-sharing-frontend.git
cd recipe-sharing-frontend
npm install
cp .env.example .env
npm run dev
```

Uygulama varsayılan olarak `http://localhost:5173` adresinde açılır.

## Demo Hesapları

Bu hesaplar yalnızca sahte API'de (`VITE_USE_MOCKS=true`) çalışır. Geliştirme ortamında giriş ekranındaki demo butonlarıyla tek tıkla doldurulabilir.

| Rol          | E-posta            | Şifre      |
| ------------ | ------------------ | ---------- |
| User         | `user@example.com` | `demo1234` |
| Organization | `org@example.com`  | `demo1234` |

Sahte API verileri tarayıcıda saklanır. Başlangıç verilerine dönmek için tarayıcıdaki `mock-db-v2` kaydını silin.

Yemek fotoğrafları [Unsplash](https://unsplash.com/license) üzerinden yüklenir, bu nedenle görseller için internet bağlantısı gerekir.

## Ortam Değişkenleri

| Değişken            | Açıklama                                                |
| ------------------- | ------------------------------------------------------- |
| `VITE_API_BASE_URL` | Backend API adresi                                      |
| `VITE_USE_MOCKS`    | `true` ise geliştirme ortamında sahte API kullanılır    |

## Komutlar

| Komut             | Açıklama                       |
| ----------------- | ------------------------------ |
| `npm run dev`     | Geliştirme sunucusunu başlatır |
| `npm run build`   | Tip kontrolü yapar ve derler   |
| `npm run lint`    | Kod kurallarını kontrol eder   |
| `npm run preview` | Derlenmiş sürümü yerelde açar  |

## Klasör Yapısı

```text
src/
├── adapters/       API modeli ile uygulama modeli arasındaki dönüşüm
├── api/            Axios istemcisi, interceptor'lar ve endpoint fonksiyonları
├── components/ui/  Tekrar kullanılan arayüz bileşenleri
├── features/       auth, landing, recipes ve tags özellikleri
├── layouts/        Sayfa düzenleri
├── mocks/          Geliştirme ortamı için sahte API
├── pages/          Route başına sayfalar
├── routes/         Router ve route guard'ları
├── stores/         Zustand store'ları
├── types/          Ortak tipler
└── utils/          Yardımcı fonksiyonlar
```

## Gerçek API Durumu

Uygulama şu anda sahte API ile geliştirilmiş ve test edilmiştir. Gerçek API ile doğrulanamadı, çünkü sunucunun TLS sertifikası alan adıyla eşleşmiyor ve tarayıcı bağlantıyı reddediyor.

Gerçek API'ye geçerken şu varsayımlar kontrol edilmelidir:

- Yanıt alanları `src/types/api.ts` dosyasındaki tiplerle uyumlu mu?
- `sort` değerleri (`newest`, `oldest`) ve `tagId` filtresi destekleniyor mu? Bunlar `src/adapters/recipe.adapter.ts` dosyasındadır.
- Rol değerleri ve `sub` alanı `src/utils/jwt.ts` dosyasındaki varsayımlarla uyumlu mu?
- Görsel silme endpoint'i API dokümanında yok. `src/api/items.api.ts` içindeki yol varsayımdır ve gerçek API'de çalışmayabilir.
- Kategori alanı API'de bulunmadığı için tag'ler kategori olarak kullanılır.
