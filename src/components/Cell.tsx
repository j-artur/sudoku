import { indexFromPos, pencilmark } from '@/utils/cell'
import { memo } from 'react'
import { Cell as CellType } from '../utils/types'
import {
  CenterContainer,
  Collapsed,
  CornerContainer,
  CornerItem,
  DebugContainer,
  StyledCell,
} from './Cell.styles'

export interface CellProps {
  cell: CellType
  isSelected: boolean
  isMarked: boolean
  debug?: boolean
  onMouseDown: (cell: CellType) => React.MouseEventHandler
  onDoubleClick: (cell: CellType) => React.MouseEventHandler
  onMouseEnter: (cell: CellType) => React.MouseEventHandler
}

const Cell: React.FC<CellProps> = memo(
  ({
    cell,
    isSelected,
    isMarked,
    debug = false,
    onMouseDown,
    onDoubleClick,
    onMouseEnter,
  }) => {
    return (
      <StyledCell
        isEditable={!cell.isFixed}
        isSelected={isSelected}
        isMarked={isMarked}
        onMouseDown={onMouseDown(cell)}
        onDoubleClick={onDoubleClick(cell)}
        onMouseEnter={onMouseEnter(cell)}
        i={indexFromPos(cell.pos)}
      >
        {cell.value !== null ? (
          <Collapsed>{cell.value}</Collapsed>
        ) : (
          <>
            <Center>{cell.center}</Center>
            <Corner>{cell.corner}</Corner>
            {debug && <Debug>{cell.debug}</Debug>}
          </>
        )}
      </StyledCell>
    )
  }
)

interface Children {
  children: number[]
}

const Center = ({ children }: Children) => (
  <CenterContainer length={children.length}>{children}</CenterContainer>
)

const Corner = ({ children }: Children) => (
  <CornerContainer>
    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(v => (
      <CornerItem key={v} v={String.fromCharCode(v + 97)}>
        {children[v]}
      </CornerItem>
    ))}
  </CornerContainer>
)

const Debug = ({ children }: Children) => (
  <DebugContainer>{pencilmark(children)}</DebugContainer>
)

export default Cell
