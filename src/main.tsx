import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { mainRouter } from '@/routes/route'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from './stores/theme/ThemeProvider'
import { ModeToggle } from './components/ToggleMode'


const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <div className='absolute top-3 left-3'>
          <ModeToggle />
        </div>
        <RouterProvider router={mainRouter} />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
)
