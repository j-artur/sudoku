export interface Cell {
  r: number
  c: number
  value: number
  isEditable: boolean
  isHighlighted: boolean
}

export interface Box {
  b: number
  cells: Cell[]
}

export type Pos = [r: number, c: number]
