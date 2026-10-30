interface PlaceholderPageProps {
  title: string
}

export function PlaceholderPage({ title }: PlaceholderPageProps) {
  return <h1 className="text-2xl font-semibold text-stone-950">{title}</h1>
}
