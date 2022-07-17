import App from '@/components/App'
import React from 'react'
import ReactDOM from 'react-dom/client'
import GlobalStyles from './styles'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {GlobalStyles}
    <App />
  </React.StrictMode>
)
