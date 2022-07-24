import { Cell as CellType } from '@/context/Game'
// import { pencilmark } from '@/utils/cell'
import { memo } from 'react'
import {
  CenterContainer,
  CornerContainer,
  CornerItem,
  // DebugContainer,
  Single,
  StyledCell,
} from './Cell.styles'

export interface CellProps {
  index: number
  cell: CellType
  isSelected: boolean
  isMarked: boolean
}

const Cell: React.FC<CellProps> = memo(({ index, cell, isSelected, isMarked }) => {
  return (
    <StyledCell isFixed={cell.isFixed} isSelected={isSelected} isMarked={isMarked} i={index}>
      {cell.value !== null ? (
        <Single>{cell.value}</Single>
      ) : (
        <>
          <Center>{cell.center}</Center>
          <Corner>{cell.corner}</Corner>
        </>
      )}
    </StyledCell>
  )
})

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

// export const Debug = ({ children }: Children) => (
//   <DebugContainer>{pencilmark(children)}</DebugContainer>
// )

export default Cell
