import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { setupInterceptors } from '@/api/interceptors'
import '@/index.css'
import App from '@/App.tsx'

async function enableMocks() {
  if (import.meta.env.DEV && import.meta.env.VITE_USE_MOCKS === 'true') {
    const { worker } = await import('@/mocks/browser')
    await worker.start({ onUnhandledFrame: 'bypass', quiet: true })
  }
}

setupInterceptors()

enableMocks().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})
