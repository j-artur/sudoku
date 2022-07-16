import Box from '@/components/Box'
import Cell from '@/components/Cell'
import { Container, Grid } from '@/components/Sudoku.styles'
import {
  Cell as CellType,
  cellIsInBox,
  cellIsInPos,
  Pos,
  toString,
} from '@/utils'
import { useCallback, useEffect, useMemo, useState } from 'react'

interface SudokuProps {
  initialCells: CellType[]
}

const Sudoku: React.FC<SudokuProps> = ({ initialCells }) => {
  const [sudoku, setSudoku] = useState(initialCells)
  const [selectedPos, setSelectedPos] = useState<Pos | null>(null)

  useEffect(() => {
    console.log(toString(selectedPos))
  }, [selectedPos])

  const boxes = useMemo(
    () =>
      sudoku.reduce(
        (bs, c) => bs.map((box, b) => (cellIsInBox(c, b) ? [...box, c] : box)),
        Array.from({ length: 9 }).map(() => []) as CellType[][]
      ),
    [sudoku, selectedPos]
  )

  // handle double click on cell highlighting all cells with its value
  const handleCellDoubleClick = (r: number, c: number) => {
    const clickedCell = sudoku.find(cell => cell.r === r && cell.c === c)!

    if (clickedCell.value) {
      // if cell has value, highlight all cells with the same value
      const newSudoku = sudoku.map(cell => {
        if (cell.value === clickedCell.value) {
          return { ...cell, isHighlighted: true }
        } else return { ...cell, isHighlighted: false }
      })
      setSudoku(newSudoku)
    } else {
      // if the cell is empty, remove the highlight from all cells
      const newSudoku = sudoku.map(cell => ({ ...cell, isHighlighted: false }))
      setSudoku(newSudoku)
    }
  }

  // handle click outside the grid, deselecting and removing the highlight from all cells
  const handleClickOutside: React.MouseEventHandler = e => {
    if (e.currentTarget === e.target) {
      setSelectedPos(null)
      const newSudoku = sudoku.map(cell => ({ ...cell, isHighlighted: false }))
      setSudoku(newSudoku)
    }
  }

  // listen for keyboard events to change the value of the selected cell
  // and move the cursor around the grid (arrow keys)
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!selectedPos) return
      const [r, c] = selectedPos
      if (!sudoku.find(cell => cell.r === r && cell.c === c)) return

      switch (e.key) {
        case 'ArrowUp':
          return setSelectedPos([(r - 1) % 9, c])
        case 'ArrowDown':
          return setSelectedPos([(r + 1) % 9, c])
        case 'ArrowLeft':
          return setSelectedPos([r, (c - 1) % 9])
        case 'ArrowRight':
          return setSelectedPos([r, (c + 1) % 9])
        case 'Backspace':
        case 'Delete':
          return setSudoku(sudoku =>
            sudoku.map(cell =>
              cell.isEditable && cell.r === r && cell.c === c
                ? { ...cell, value: 0 }
                : cell
            )
          )
        default:
          if (e.key.match(/^[1-9]$/)) {
            setSudoku(
              sudoku.map(cell =>
                cell.isEditable && cellIsInPos(cell, selectedPos)
                  ? { ...cell, value: Number(e.key) }
                  : cell
              )
            )
          }
      }
    },
    [selectedPos, sudoku]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <Container onClick={handleClickOutside}>
      <Grid>
        {boxes.map((box, b) => (
          <Box key={`b${b + 1}`} b={b}>
            {box.map(cell => (
              <Cell
                key={toString(cell)}
                cell={cell}
                isSelected={
                  !!selectedPos &&
                  selectedPos[0] === cell.r &&
                  selectedPos[1] === cell.c
                }
                onClick={() => setSelectedPos([cell.r, cell.c])}
                onDoubleClick={() => handleCellDoubleClick(cell.r, cell.c)}
              />
            ))}
          </Box>
        ))}
      </Grid>
    </Container>
  )
}

export default Sudoku
