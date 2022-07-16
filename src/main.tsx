import App from '@/components/App'
import { Global } from '@emotion/react'
import React from 'react'
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Global
      styles={{
        'html, body, #root': {
          height: '100%',
          margin: 0,
          padding: 0,
          fontFamily: 'sans-serif',
          fontSize: '1rem',
          fontWeight: 'normal',
          lineHeight: '1.5',
          color: '#96c2dd',
          backgroundColor: '#0D151D',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
        body: {
          margin: 0,
          padding: 0,
        },
        '*': {
          boxSizing: 'border-box',
        },
      }}
    />
    <App />
  </React.StrictMode>
)
