import { Box, Cell, Pos } from './types'

// generator function from index to index
export function range(start: number, end: number): number[] {
  const arr: number[] = []
  for (let i = start; i < end; i++) {
    arr.push(i)
  }
  return arr
}

export function toString(pos: Pos | null): string
export function toString(cell: Cell): string
export function toString(box: Box): string
export function toString(arg: Box | Cell | Pos | null): string {
  if (arg === null) return 'null'
  else if (Array.isArray(arg)) return `r${arg[0] + 1}c${arg[1] + 1}`
  else if ('b' in arg) return `b${arg.b + 1}`
  else return `r${arg.r + 1}c${arg.c + 1}`
}

export const boxPosToPos = (b: number, pos: Pos): Pos => {
  const [r, c] = pos
  return [r + Math.floor(b / 3), c + (b % 3)]
}

export const posToBox = (pos: Pos): number => {
  const [r, c] = pos
  return Math.floor(r / 3) * 3 + Math.floor(c / 3)
}

export const posToBoxPos = (pos: Pos): Pos => {
  const [r, c] = pos
  return [r % 3, c % 3]
}

export const cellToBoxPos = (cell: Cell): Pos => posToBoxPos([cell.r, cell.c])

export const cellIsInBox = (cell: Cell, b: number): boolean =>
  posToBox([cell.r, cell.c]) === b

export const cellIsInPos = (cell: Cell, pos: Pos): boolean =>
  cell.r === pos[0] && cell.c === pos[1]

export * from './types'
