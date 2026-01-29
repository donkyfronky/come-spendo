import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router"
import './index.css'
import { router } from './pages/routes.tsx'
import { ThemeProvider } from './providers/ThemeContext.tsx'
import { Provider } from "react-redux";
import store from './store/index.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </StrictMode>,
)
