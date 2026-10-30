import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { setupInterceptors } from '@/api/interceptors'
import '@/index.css'
import App from '@/App.tsx'

setupInterceptors()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
