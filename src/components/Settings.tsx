import { useGame } from '@/context/Game'
import { useTheme } from '@/context/Theme'
import styled from '@emotion/styled'
import { useCallback } from 'react'
import { Container, StyledSwitch, SwitchContainer } from './Settings.styles'

const Settings: React.FC = () => {
  const [{ mode /* , debug */ }, dispatch] = useGame()
  const [{ name }, setTheme] = useTheme()

  // const toggleDebug = useCallback(() => dispatch(['TOGGLE_DEBUG']), [dispatch])
  const setDigit = useCallback(() => dispatch(['SET_MODE', 'DIGIT']), [dispatch])

  const setCenter = useCallback(() => dispatch(['SET_MODE', 'CENTER']), [dispatch])

  const setCorner = useCallback(() => dispatch(['SET_MODE', 'CORNER']), [dispatch])

  const setDarkMode = useCallback(() => setTheme(name === 'dark' ? 'light' : 'dark'), [name])

  return (
    <Container>
      <Switches>
        {/* <Switch label="Debug (D)" active={debug} onClick={toggleDebug} /> */}
        <Switch label="Digit (Z)" active={mode === 'DIGIT'} onClick={setDigit} />
        <Switch label="Corner (X)" active={mode === 'CORNER'} onClick={setCorner} />
        <Switch label="Center (C)" active={mode === 'CENTER'} onClick={setCenter} />
        <Switch label="Dark Mode" active={name === 'dark'} onClick={setDarkMode} />
      </Switches>
    </Container>
  )
}

const Switches = styled.div`
  display: flex;
  flex-direction: column;
`

interface SwitchProps {
  active: boolean
  onClick: () => void
  label: string
  children?: never
}

const Switch: React.FC<SwitchProps> = ({ active, onClick, label }) => {
  return (
    <SwitchContainer active={active}>
      {label}
      <StyledSwitch active={active} onClick={onClick} />
    </SwitchContainer>
  )
}

export default Settings
