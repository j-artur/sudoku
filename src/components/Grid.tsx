import { useGame } from '@/context/Game'
import { str } from '@/utils'
import { indexFromPos } from '@/utils/cell'
import { Cell as CellType } from '@/utils/types'
import { useCallback, useMemo } from 'react'
import Box from './Box'
import Cell from './Cell'
import { StyledGrid } from './Grid.styles'

const Grid: React.FC = () => {
  const [state, dispatch] = useGame()

  const boxes = useMemo(
    () =>
      state.grid.reduce(
        (bs, c) => bs.map((box, b) => (c.pos.b === b ? [...box, c] : box)),
        Array.from({ length: 9 }).map(() => [] as CellType[])
      ),
    [state.grid]
  )

  const handleMouseDown = useCallback(
    (cell: CellType) => () => dispatch(['SELECT_CELL', indexFromPos(cell.pos)]),
    []
  )

  const handleDoubleClick = useCallback(
    (cell: CellType) => () => dispatch(['MARK_VALUE', cell.value]),
    []
  )

  const handleMouseEnter = useCallback(
    (cell: CellType) => () => dispatch(['MOUSE_ENTER', indexFromPos(cell.pos)]),
    []
  )

  return (
    <StyledGrid>
      {boxes.map((box, b) => (
        <Box key={b} b={b}>
          {box.map(cell => (
            <Cell
              key={str(cell)}
              cell={cell}
              isSelected={state.focus.includes(indexFromPos(cell.pos))}
              isMarked={
                state.marked !== null &&
                (cell.value !== null
                  ? state.marked === cell.value
                  : cell.corner.includes(state.marked) ||
                    cell.center.includes(state.marked))
              }
              debug={state.debug}
              onMouseDown={handleMouseDown}
              onMouseEnter={handleMouseEnter}
              onDoubleClick={handleDoubleClick}
            />
          ))}
        </Box>
      ))}
    </StyledGrid>
  )
}

export default Grid
