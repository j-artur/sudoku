import { Box as StyledBox } from './Box.styles'

export interface BoxProps {
  children: React.ReactNode
  b: number
}

const Box: React.FC<BoxProps> = ({ children, b }) => {
  return <StyledBox b={b}>{children}</StyledBox>
}

export default Box
