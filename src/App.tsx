import { RouterProvider } from 'react-router-dom'
import { Toaster } from '@/components/ui/Toaster'
import { router } from '@/routes/router'

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  )
}

export default App
