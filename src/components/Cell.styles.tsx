import styled from '@emotion/styled'

interface CellProps {
  isEditable: boolean
  isMarked: boolean
  isSelected: boolean
  i: number
}

const BG_COLOR = '#0D151D'
const TEXT_COLOR = '#55c2f0'
const BORDER_COLOR = '#172f3d'

const FIXED_TEXT_COLOR = '#7F95A9'
const SELECT_TEXT_COLOR = '#e2eaf2'

const SELECT_BG_COLOR = '#3A6A7F'
const SELECT_BORDER_COLOR = '#3B5368'

const MARK_BG_COLOR = '#172f3d'

export const StyledCell = styled.div<CellProps>`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 4rem;
  height: 4rem;

  border: 1px solid
    ${props =>
      props.isSelected || props.isMarked ? SELECT_BORDER_COLOR : BORDER_COLOR};
  background-color: ${props =>
    props.isSelected
      ? SELECT_BG_COLOR
      : props.isMarked
      ? MARK_BG_COLOR
      : BG_COLOR};
  color: ${props =>
    props.isSelected || props.isMarked
      ? SELECT_TEXT_COLOR
      : props.isEditable
      ? TEXT_COLOR
      : FIXED_TEXT_COLOR};
  font-family: 'JetBrains Mono';
  font-weight: ${props => (props.isEditable ? 'normal' : 'bold')};
  text-align: center;

  user-select: none;
  cursor: pointer;

  transition: background-color 0.05s ease, color 0.05s ease;

  &:hover {
    backdrop-filter: brightness(20%);
  }
`

export const Collapsed = styled.div`
  font-size: 2rem;
`

export const CenterContainer = styled.div<{ length: number }>`
  position: absolute;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  font-size: ${props =>
    props.length < 8 ? '0.875rem' : props.length < 9 ? '0.75rem' : '0.6875rem'};
`

export const CornerContainer = styled.div`
  position: absolute;

  padding: 0.125rem;

  width: 100%;

  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0.25rem;
  grid-template-areas:
    'a e b'
    'g i h'
    'c f d';

  font-size: 0.875rem;
  line-height: 1rem;
`

export const CornerItem = styled.div<{ v: string }>`
  grid-area: ${props => props.v};
`

export const DebugContainer = styled.pre`
  position: absolute;
  color: #7f95a966;
  font-size: 0.75rem;
  letter-spacing: 0.5rem;
  margin-left: 0.5rem;
  line-height: 1rem;
`

export default StyledCell
