import styled from '@emotion/styled'
import { BoxProps } from './Box'

export const Box = styled.div<BoxProps>`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  border: 1px solid #55c2f0;
  background-color: #172f3d;
  gap: 1px;
`
