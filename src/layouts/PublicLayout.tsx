import { Outlet } from 'react-router-dom'
import { Footer } from '@/layouts/Footer'
import { Navbar } from '@/layouts/Navbar'

export function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-stone-50">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
