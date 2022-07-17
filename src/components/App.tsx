import { GameProvider } from '@/context/Game'
import Sudoku from './Sudoku'

const App: React.FC = () => {
  return (
    <GameProvider>
      <Sudoku />
    </GameProvider>
  )
}

export default App
