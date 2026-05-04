import { createRoot} from 'react-dom/client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import { StrictMode } from 'react'
import CartProvider from './context/CartContext'

import './styles.css'

window.addEventListener('DOMContentLoaded', () => {
  const element = document.querySelector('#root')

  if (!element) {
    throw new Error('There should be root element')
  }

  const root = createRoot(element)
  const client = new QueryClient()

  window.__TANSTACK_QUERY_CLIENT__ = client
  
  root.render(<StrictMode><QueryClientProvider client={client}><CartProvider><App /></CartProvider></QueryClientProvider></StrictMode>)
})