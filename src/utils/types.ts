export interface Cell {
  pos: Pos
  debug: number[]
  center: number[]
  corner: number[]
  value: number | null
  isFixed: boolean
}

export type Row = number
export type Col = number
export type Box = number

export interface Pos {
  r: Row
  c: Col
  b: Box
}

export type PosString = `r${number}c${number}`

export type Dir = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'

export type Mode = 'DIGIT' | 'CENTER' | 'CORNER'
