import styled from '@emotion/styled'
import { CellProps } from './Cell'

export const Cell = styled.div<Omit<CellProps, 'value'>>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  background-color: #0d151d;
  color: ${props => (props.cell.isEditable ? '#5DADCF' : '#7F95A9')};
  font-size: 2rem;
  font-weight: ${props => (props.cell.isEditable ? 'normal' : 'bold')};
  user-select: none;
  cursor: pointer;
  transition: background-color 0.05s ease-in-out, color 0.05s ease-in-out;
  ${props =>
    props.cell.isHighlighted &&
    `
    background-color: #3A6A7F;
    color: #ffffff;
  `}
  ${props =>
    props.isSelected &&
    `
    background-color: #55C2F0;
    color: #ffffff;
  `}
  &:hover {
    background-color: #96c2dd;
    color: #ffffff;
  }
`

export default Cell
