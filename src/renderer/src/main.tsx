import './assets/main.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { Routes } from './routes'
import { queryClient } from './lib/queryClient'
import { QueryClientProvider } from '@tanstack/react-query'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Routes />
    </QueryClientProvider>
  </React.StrictMode>
)
