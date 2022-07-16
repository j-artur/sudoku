import { useState } from 'react'
import { Cell } from '../utils'
import Sudoku from './Sudoku'

const App: React.FC = () => {
  const [cells, setCells] = useState<Cell[]>(() => {
    const numbers: number[] = Array(81).fill(0)
    for (let i = 0; i < 81; i++) {
      numbers[i] = Math.floor(Math.random() * 30) + 1
    }

    return numbers.map((value, index) => ({
      r: Math.floor(index / 9),
      c: index % 9,
      value: value > 9 ? 0 : value,
      isEditable: value > 9,
      isSelected: false,
      isHighlighted: false,
    }))
  })

  return (
    <>
      <Sudoku initialCells={cells} />
    </>
  )
}

export default App
