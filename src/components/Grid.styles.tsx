import { Line } from '@/context/Game'
import styled from '@emotion/styled'

export const StyledGrid = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-template-rows: repeat(9, 1fr);
  background-color: ${props => props.theme.colors.border};
  gap: 1px;
`

export const StyledGridOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  cursor: pointer;
`

type DividerProps = ({ col: number } | { row: number }) & {
  from: number
  to: number
}

export const Divider = styled.div<DividerProps>`
  position: absolute;

  ${({ from, to, ...props }) =>
    'col' in props
      ? `
    top: calc(${(from / 9) * 100}% - 1px);
    left: calc(${(props.col / 9) * 100}% - 1px);
    height: calc(${((to - from) / 9) * 100}% + 2px);
    width: 2px;
  `
      : `
    top: calc(${(props.row / 9) * 100}% - 1px);
    left: calc(${(from / 9) * 100}% - 1px);
    width: calc(${((to - from) / 9) * 100}% + 2px);
    height: 2px;
  `}

  background-color: ${props => props.theme.colors.divider};

  z-index: 50;
`

export const OverlaySurface = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
`

interface CageBordersProps {
  row: number
  col: number
  top: boolean
  right: boolean
  bottom: boolean
  left: boolean
}

const ONE_NINTH_PERCENT = (1 / 9) * 100

export const CageBorders = styled.div<CageBordersProps>`
  position: absolute;
  top: calc(${props => (props.row / 9) * 100}% + 3px);
  left: calc(${props => (props.col / 9) * 100}% + 3px);
  width: calc(${ONE_NINTH_PERCENT}% - 6px);
  height: calc(${ONE_NINTH_PERCENT}% - 6px);

  z-index: 100;
  ${props => props.top && `border-top: 2px dashed ${props.theme.colors.divider};`}
  ${props => props.right && `border-right: 2px dashed ${props.theme.colors.divider};`}
  ${props => props.bottom && `border-bottom: 2px dashed ${props.theme.colors.divider};`}
  ${props => props.left && `border-left: 2px dashed ${props.theme.colors.divider};`}
`

interface CageTotalProps {
  row: number
  col: number
}

export const CageTotal = styled.div<CageTotalProps>`
  position: absolute;
  top: calc(${props => (props.row / 9) * 100}% + 1px);
  left: calc(${props => (props.col / 9) * 100}% + 2px);
  font-size: 0.75rem;
  padding: 2px;
  border-radius: 8px;
  line-height: 1;
  background-color: ${props => props.theme.colors.background}a0;
  color: ${props => props.theme.colors.givenDigit};
  z-index: 1000;
`

interface ThermoBulbProps {
  row: number
  col: number
}

export const ThermoBulb = styled.div<ThermoBulbProps>`
  position: absolute;
  top: calc(${props => (props.row / 9) * 100}% + 9px);
  left: calc(${props => (props.col / 9) * 100}% + 9px);

  width: calc(${ONE_NINTH_PERCENT}% - 18px);
  height: calc(${ONE_NINTH_PERCENT}% - 18px);

  border-radius: 50%;

  background-color: ${props => props.theme.colors.thermo};
  font-size: 0.75rem;

  z-index: 10;
`

export const ThermoLine = styled.div<Line>`
  position: absolute;

  top: calc(${props => (props.top + 0.5) * ONE_NINTH_PERCENT}% - 8px);
  left: calc(${props => (props.left + 0.5) * ONE_NINTH_PERCENT}% - 8px);

  width: calc(${props => ONE_NINTH_PERCENT * (props.angle % 90 ? Math.SQRT2 : 1)}% + 16px);
  height: 16px;
  border-radius: 8px;

  background-color: ${props => props.theme.colors.thermo};

  transform-origin: 8px 8px;
  transform: rotate(${props => -props.angle}deg);
`

interface ArrowCircleProps {
  row: number
  col: number
}

export const ArrowCircle = styled.div<ArrowCircleProps>`
  position: absolute;
  top: calc(${props => (props.row / 9) * 100}% + 8px);
  left: calc(${props => (props.col / 9) * 100}% + 8px);

  width: calc(${ONE_NINTH_PERCENT}% - 16px);
  height: calc(${ONE_NINTH_PERCENT}% - 16px);

  border-radius: 50%;

  border: 2px solid ${props => props.theme.colors.arrow};
  background-color: ${props => props.theme.colors.background};

  z-index: 5;
`

export const ArrowLine = styled.div<Line>`
  position: absolute;

  top: calc(${props => (props.top + 0.5) * ONE_NINTH_PERCENT}% - 2px);
  left: calc(${props => (props.left + 0.5) * ONE_NINTH_PERCENT}% - 2px);

  width: calc(${props => ONE_NINTH_PERCENT * (props.angle % 90 ? Math.SQRT2 : 1)}% + 2px);
  height: 4px;

  background-color: ${props => props.theme.colors.arrow};

  transform-origin: 2px 2px;
  transform: rotate(${props => -props.angle}deg);
`

export const ArrowCircleConnector = styled.div<Line>`
  position: absolute;
  left: ${props => (props.left + (props.angle % 180 ? 0 : 0.5)) * ONE_NINTH_PERCENT}%;
  top: calc(${props => (props.top + (props.angle % 180 ? 0.5 : 0)) * ONE_NINTH_PERCENT}% + 8px);

  width: ${ONE_NINTH_PERCENT}%;
  height: calc(${ONE_NINTH_PERCENT}% - 16px);

  background-color: ${props => props.theme.colors.background};

  border-top: 2px solid ${props => props.theme.colors.arrow};
  border-bottom: 2px solid ${props => props.theme.colors.arrow};

  transform-origin: 50% 50%;
  transform: rotate(${props => props.angle}deg);

  z-index: 6;
`

export const ArrowTip = styled.div<Line>`
  position: absolute;
  top: calc(${props => (props.top + 0.5) * ONE_NINTH_PERCENT}% - 8px);
  left: calc(${props => (props.left + 0.5) * ONE_NINTH_PERCENT}% - 8px);

  width: 16px;
  height: 16px;

  border-top: 4px solid ${props => props.theme.colors.arrow};
  border-right: 4px solid ${props => props.theme.colors.arrow};

  transform-origin: 15px 1px;
  transform: translate(-7px, 7px) rotate(${props => 45 - props.angle}deg);
`
