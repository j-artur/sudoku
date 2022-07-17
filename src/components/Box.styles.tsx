import styled from '@emotion/styled'
import { BoxProps } from './Box'

const BOX_BORDER_COLOR = '#55c2f0'

export const Box = styled.div<BoxProps>`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  border: 1px solid ${BOX_BORDER_COLOR};
`
