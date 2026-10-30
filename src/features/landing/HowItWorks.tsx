const STEPS = [
  {
    title: 'Hesabını oluştur',
    text: 'Birkaç saniyede kaydol, tarif defterin hazır olsun.',
  },
  {
    title: 'Tarifini ekle',
    text: 'Malzemeleri, yapılışını ve en güzel fotoğraflarını paylaş.',
  },
  {
    title: 'Keşfet ve pişir',
    text: 'Kategoriye göre gez, aradığını bul, bu akşamın menüsünü seç.',
  },
]

export function HowItWorks() {
  return (
    <section id="nasil-calisir" className="border-y border-sand-200 bg-sand-100">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="max-w-xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Üç adımda mutfağından sofraya
        </h2>
        <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {STEPS.map((step, index) => (
            <li key={step.title} className="border-t-2 border-ink pt-5">
              <span className="font-display text-5xl font-medium text-brand-600 italic">
                {index + 1}
              </span>
              <h3 className="mt-3 font-display text-xl font-semibold text-ink">
                {step.title}
              </h3>
              <p className="mt-2 leading-relaxed text-ink-soft">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
