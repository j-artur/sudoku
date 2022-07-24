import styled from '@emotion/styled'

interface CellProps {
  isFixed: boolean
  isMarked: boolean
  isSelected: boolean
  i: number
}

export const StyledCell = styled.div<CellProps>`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 4rem;
  height: 4rem;

  background-color: ${props =>
    props.isSelected
      ? props.theme.colors.selected
      : props.isMarked
      ? props.theme.colors.marked
      : props.theme.colors.background};
  color: ${props =>
    props.isFixed ? props.theme.colors.givenDigit : props.theme.colors.placedDigit};
  font-family: 'JetBrains Mono';
  font-weight: ${props => (props.isFixed ? 'bold' : 'normal')};
  text-align: center;

  user-select: none;
  cursor: pointer;

  &:hover {
    backdrop-filter: brightness(20%);
  }
`
interface StyledOverlayProps {
  i: number
}

const ONE_NINTH_PERCENT = (1 / 9) * 100

export const StyledCellOverlay = styled.div<StyledOverlayProps>`
  position: absolute;
  top: ${({ i }) => (Math.floor(i / 9) / 9) * 100}%;
  left: ${({ i }) => (Math.floor(i % 9) / 9) * 100}%;

  width: ${ONE_NINTH_PERCENT}%;
  height: ${ONE_NINTH_PERCENT}%;

  display: flex;
  align-items: center;
  justify-content: center;
`

export const Single = styled.div`
  font-size: 2rem;
  z-index: 100;
`

export const CenterContainer = styled.div<{ length: number }>`
  position: absolute;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  font-size: ${props =>
    props.length < 8 ? '0.875rem' : props.length < 9 ? '0.75rem' : '0.6875rem'};

  z-index: 100;
`

export const CornerContainer = styled.div`
  position: absolute;

  padding: 0.75rem;

  width: 100%;
  height: 100%;

  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0.125rem;
  grid-template-areas:
    'a e b'
    'g i h'
    'c f d';

  font-size: 0.75rem;
  line-height: 1;
`

export const CornerItem = styled.div<{ v: string }>`
  grid-area: ${props => props.v};

  z-index: 100;
`

// export const DebugContainer = styled.pre`
//   position: absolute;
//   color: ${props => props.theme.colors.primary.main}80;
//   font-size: 0.75rem;
//   letter-spacing: 0.5rem;
//   margin-left: 0.5rem;
//   line-height: 1rem;
// `
