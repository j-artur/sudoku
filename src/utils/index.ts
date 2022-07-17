import { colFromIndex, indexFromPos, rowFromIndex } from './cell'
import { Cell, Dir, Mode, Pos, PosString } from './types'

export function str(cell: Cell): PosString
export function str(post: Pos): PosString
export function str(arg: Cell | Pos): PosString {
  if ('pos' in arg) return `r${arg.pos.r}c${arg.pos.c}`
  else return `r${arg.r}c${arg.c}`
}

export const dir = (str: string): Dir | null => {
  switch (str) {
    case 'ArrowUp':
      return 'UP'
    case 'ArrowDown':
      return 'DOWN'
    case 'ArrowLeft':
      return 'LEFT'
    case 'ArrowRight':
      return 'RIGHT'
    default:
      return null
  }
}

export const mode = (str: string): Mode | null => {
  switch (str) {
    case 'z':
    case 'Z':
      return 'DIGIT'
    case 'x':
    case 'X':
      return 'CORNER'
    case 'c':
    case 'C':
      return 'CENTER'
    default:
      return null
  }
}

export const move = (i: number, dir: Dir): number => {
  const r = rowFromIndex(i)
  const c = colFromIndex(i)

  switch (dir) {
    case 'UP':
      return indexFromPos({ r: (r + 8) % 9, c })
    case 'DOWN':
      return indexFromPos({ r: (r + 10) % 9, c })
    case 'LEFT':
      return indexFromPos({ r, c: (c + 8) % 9 })
    case 'RIGHT':
      return indexFromPos({ r, c: (c + 10) % 9 })
  }
}

export const merge = <T>(...lists: (T | T[])[]): T[] =>
  [...new Set(lists.flatMap(e => e))].sort()
