import { Outlet, ScrollRestoration } from 'react-router-dom'
import { Footer } from '@/layouts/Footer'
import { Navbar } from '@/layouts/Navbar'

export function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  )
}
