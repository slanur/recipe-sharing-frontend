# Recipe Sharing App

Kullanıcıların tarif paylaşıp keşfettiği, Organization ve User olmak üzere iki ayrı paneli olan React uygulaması.

## Kullanılan Teknolojiler

- React ve TypeScript
- Vite
- Tailwind CSS
- oxlint

## Kurulum

Node.js 20.19+ veya 22.12+ gerekir.

```bash
git clone <repo-adresi>
cd recipe-sharing-app
npm install
cp .env.example .env
npm run dev
```

Uygulama varsayılan olarak `http://localhost:5173` adresinde açılır.

## Komutlar

| Komut             | Açıklama                          |
| ----------------- | --------------------------------- |
| `npm run dev`     | Geliştirme sunucusunu başlatır    |
| `npm run build`   | Tip kontrolü yapar ve derler      |
| `npm run lint`    | Kod kurallarını kontrol eder      |
| `npm run preview` | Derlenmiş sürümü yerelde açar     |

## Klasör Yapısı

```text
src/
├── adapters/       API modeli ile uygulama modeli arasındaki dönüşüm
├── api/            Axios istemcisi ve endpoint fonksiyonları
├── components/ui/  Tekrar kullanılan arayüz bileşenleri
├── features/       auth, recipes ve tags özellikleri
├── hooks/          Ortak hook'lar
├── layouts/        Sayfa düzenleri
├── pages/          Route başına sayfalar
├── routes/         Router ve route guard'ları
├── stores/         Zustand store'ları
├── types/          Ortak tipler
└── utils/          Yardımcı fonksiyonlar
```
