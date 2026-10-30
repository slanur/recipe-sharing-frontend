import type { ReactNode } from 'react'

interface AuthCardProps {
  title: string
  description: string
  children: ReactNode
}

export function AuthCard({ title, description, children }: AuthCardProps) {
  return (
    <section className="mx-auto w-full max-w-md px-4 py-10 sm:py-16">
      <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
        <h1 className="text-2xl font-semibold text-stone-950">{title}</h1>
        <p className="mt-1 text-sm text-stone-600">{description}</p>
        <div className="mt-6">{children}</div>
      </div>
    </section>
  )
}
