import { useGame } from '@/context/Game'
import { useCallback } from 'react'
import { Container, StyledSwitch, SwitchContainer } from './Settings.styles'

const Settings: React.FC = () => {
  const [{ mode, debug }, dispatch] = useGame()

  const toggleDebug = useCallback(() => dispatch(['TOGGLE_DEBUG']), [dispatch])
  const setDigit = useCallback(
    () => dispatch(['SET_MODE', 'DIGIT']),
    [dispatch]
  )
  const setCenter = useCallback(
    () => dispatch(['SET_MODE', 'CENTER']),
    [dispatch]
  )
  const setCorner = useCallback(
    () => dispatch(['SET_MODE', 'CORNER']),
    [dispatch]
  )

  return (
    <Container>
      <Switch on={debug} onClick={toggleDebug} label="Debug (D)" />
      <Switch on={mode === 'DIGIT'} onClick={setDigit} label="Digit (Z)" />
      <Switch on={mode === 'CORNER'} onClick={setCorner} label="Corner (X)" />
      <Switch on={mode === 'CENTER'} onClick={setCenter} label="Center (C)" />
    </Container>
  )
}

interface SwitchProps {
  on: boolean
  onClick: () => void
  label: string
  children?: never
}

const Switch: React.FC<SwitchProps> = ({ on, onClick, label }) => {
  return (
    <SwitchContainer isOn={on}>
      {label}
      <StyledSwitch isOn={on} onClick={onClick} />
    </SwitchContainer>
  )
}

export default Settings
