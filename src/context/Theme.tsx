import { Theme, ThemeProvider as EmotionThemeProvider } from '@emotion/react'
import { createContext, useContext, useState } from 'react'

type ThemeName = 'light' | 'dark'

type Colors =
  | 'primary'
  | 'background'
  | 'border'
  | 'givenDigit'
  | 'placedDigit'
  | 'text'
  | 'selected'
  | 'marked'
  | 'divider'
  | 'thermo'
  | 'arrow'
  | 'switchOff'
  | 'switchOffHover'
  | 'switchOn'
  | 'switchOnHover'
  | 'switchKnob'

declare module '@emotion/react' {
  export interface Theme {
    name: ThemeName
    colors: Record<Colors, string>
  }
}

const themes: Record<ThemeName, Theme> = {
  dark: {
    name: 'dark',
    colors: {
      primary: '#55c2f0',
      background: '#0d151d',
      border: '#325868',
      givenDigit: '#9ab8d3',
      placedDigit: '#55c2f0',
      text: '#9ab8d3',
      selected: '#2c4358',
      marked: '#172d3f',
      divider: '#55c2f0',
      thermo: '#2c4358',
      arrow: '#325868',
      switchOff: '#172d3f',
      switchOffHover: '#3b5368',
      switchOn: '#3a6a7f',
      switchOnHover: '#75a2c0',
      switchKnob: '#fafafa',
    },
  },
  light: {
    name: 'light',
    colors: {
      primary: '#55c2f0',
      background: '#fafafa',
      border: '#494949',
      givenDigit: '#171718',
      placedDigit: '#0d6cac',
      text: '#171718',
      selected: '#96cae0',
      marked: '#caebff',
      divider: '#000000',
      thermo: '#cccccc',
      arrow: '#a0a0a0',
      switchOff: '#b7ccdb',
      switchOffHover: '#70ade2',
      switchOn: '#5290aa',
      switchOnHover: '#66c0fc',
      switchKnob: '#fafafa',
    },
  },
}

type Context = [Theme, (theme: ThemeName) => void]

export const themesContext = createContext<Context>([themes.dark, () => {}])

export const ThemeProvider: React.FC<React.PropsWithChildren> = props => {
  const [theme, setTheme] = useState(() => {
    const themeName = localStorage.getItem('theme_preference')
    return themeName! in themes ? themes[themeName as ThemeName] : themes.dark
  })

  const changeTheme = (theme: ThemeName) => {
    setTheme(themes[theme])
    localStorage.setItem('theme_preference', theme)
  }

  return (
    <EmotionThemeProvider theme={theme}>
      <themesContext.Provider value={[theme, changeTheme]}>{props.children}</themesContext.Provider>
    </EmotionThemeProvider>
  )
}

export const useTheme = () => useContext(themesContext)
