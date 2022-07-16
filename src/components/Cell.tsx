import { Cell as CellType } from '../utils'
import { Cell as StyledCell } from './Cell.styles'

export interface CellProps {
  cell: CellType
  onClick: () => void
  isSelected: boolean
  onDoubleClick: () => void
}

const Cell: React.FC<CellProps> = ({
  cell,
  isSelected,
  onClick,
  onDoubleClick,
}) => {
  return (
    <StyledCell
      cell={cell}
      isSelected={isSelected}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      {cell.value ? cell.value : ''}
    </StyledCell>
  )
}

export default Cell
