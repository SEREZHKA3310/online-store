import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import { StrictMode } from 'react'
import CartProvider from './context/CartContext'

const root = document.getElementById('root')

if (!root) {
  throw new Error('Root element not found')
}

const queryClient = new QueryClient();

ReactDOM.createRoot(root).render(
  <StrictMode>
    <CartProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    </CartProvider>
  </StrictMode>
)

window.__TANSTACK_QUERY_CLIENT__ = queryClient