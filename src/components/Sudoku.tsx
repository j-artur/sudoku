import { Container } from '@/components/Sudoku.styles'
import { useGame } from '@/context/Game'
import { useCallback } from 'react'
import Grid from './Grid'
import Settings from './Settings'

const Sudoku: React.FC = () => {
  const [_, dispatch] = useGame()

  const handleMouseDown: React.MouseEventHandler = useCallback(e => {
    if (e.target === e.currentTarget) dispatch(['BLUR'])
  }, [])

  const handleDoubleClick: React.MouseEventHandler = useCallback(e => {
    if (e.target === e.currentTarget) dispatch(['MARK_VALUE', null])
  }, [])

  return (
    <Container onMouseDown={handleMouseDown} onDoubleClick={handleDoubleClick}>
      <Grid />
      <Settings />
    </Container>
  )
}

export default Sudoku
