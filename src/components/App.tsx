import { useGame } from '@/context/Game'
import { useCallback } from 'react'
import { Container, GameContainer } from './App.styles'
import Grid from './Grid'
import Settings from './Settings'

const App: React.FC = () => {
  const [_, dispatch] = useGame()

  const handleMouseDown: React.MouseEventHandler = useCallback(e => {
    if (e.target === e.currentTarget) dispatch(['BLUR'])
  }, [])

  const handleDoubleClick: React.MouseEventHandler = useCallback(e => {
    if (e.target === e.currentTarget) dispatch(['MARK_CELL', null])
  }, [])

  return (
    <Container>
      <GameContainer onMouseDown={handleMouseDown} onDoubleClick={handleDoubleClick}>
        <Grid />
        <Settings />
      </GameContainer>
    </Container>
  )
}

export default App
