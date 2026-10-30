const SECTIONS = [
  {
    title: 'Kullanıcılar için',
    text: 'Tarifleri listeleyebilir, başlığa göre arayabilir ve kategoriye göre filtreleyebilirsin. Kendi tariflerini ekleyebilir, görsellerini yönetebilir, düzenleyebilir ve silebilirsin.',
  },
  {
    title: 'Organization hesapları için',
    text: 'Organization panelinden tüm tarifleri görebilir ve tarifleri düzenli tutan etiketleri tek bir sayfadan yönetebilirsin.',
  },
]

export function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="text-3xl font-bold tracking-tight text-stone-950">
        Hakkında
      </h1>
      <p className="mt-4 text-lg text-stone-600">
        Recipe Sharing, tarif paylaşmayı ve yeni tarifler keşfetmeyi kolaylaştıran
        bir web uygulamasıdır.
      </p>
      <div className="mt-8 space-y-4">
        {SECTIONS.map((section) => (
          <article
            key={section.title}
            className="rounded-2xl border border-stone-200 bg-white p-6"
          >
            <h2 className="font-semibold text-stone-950">{section.title}</h2>
            <p className="mt-2 text-stone-600">{section.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
