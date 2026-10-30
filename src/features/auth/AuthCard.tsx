import type { ReactNode } from 'react'

interface AuthCardProps {
  title: string
  description: string
  children: ReactNode
}

export function AuthCard({ title, description, children }: AuthCardProps) {
  return (
    <section>
      <title>{`${title} · Sofra`}</title>
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">
        {title}
      </h1>
      <p className="mt-2 text-ink-soft">{description}</p>
      <div className="mt-8">{children}</div>
    </section>
  )
}
