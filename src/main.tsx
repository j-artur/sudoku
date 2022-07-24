import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import { GameProvider } from './context/Game'
import { ThemeProvider } from './context/Theme'
import GlobalStyles from './styles'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GameProvider>
      <ThemeProvider>
        {GlobalStyles}
        <App />
      </ThemeProvider>
    </GameProvider>
  </React.StrictMode>
)
