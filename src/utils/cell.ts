import { Cell, Pos } from './types'

export const pencilmark = (n: number[]): string => {
  switch (n.length) {
    case 0:
      return ''
    case 1:
      return n[0]!.toString()
    case 2:
      return `${n[0]}${n[1]}`
    case 3:
      return `${n[0]}\n${n[1]}${n[2]}`
    case 4:
      return `${n[0]}${n[1]}\n${n[2]}${n[3]}`
    case 5:
      return `${n[0]}${n[1]}\n${n[2]}\n${n[3]}${n[4]}`
    case 6:
      return `${n[0]}${n[1]}\n${n[2]}${n[3]}\n${n[4]}${n[5]}`
    case 7:
      return `${n[0]}${n[1]}\n${n[2]}${n[3]}${n[4]}\n${n[5]}${n[6]}`
    case 8:
      return `${n[0]}${n[1]}${n[2]}\n${n[3]}${n[4]}\n${n[5]}${n[6]}${n[7]}`
    case 9:
      return `${n[0]}${n[1]}${n[2]}\n${n[3]}${n[4]}${n[5]}\n${n[6]}${n[7]}${n[8]}`
    default:
      return n.join('')
  }
}

export const rowFromIndex = (i: number): number => Math.floor(i / 9)
export const colFromIndex = (i: number): number => i % 9
export const boxFromIndex = (i: number): number =>
  Math.floor(i / 27) * 3 + Math.floor((i % 9) / 3)

export const sameRow = (i: number, j: number): boolean =>
  rowFromIndex(i) === rowFromIndex(j)
export const sameCol = (i: number, j: number): boolean =>
  colFromIndex(i) === colFromIndex(j)
export const sameBox = (i: number, j: number): boolean =>
  boxFromIndex(i) === boxFromIndex(j)

export const posFromIndex = (i: number): Pos => ({
  r: rowFromIndex(i),
  c: colFromIndex(i),
  b: boxFromIndex(i),
})

export const indexFromPos = (pos: Omit<Pos, 'b'>): number => pos.r * 9 + pos.c

export const cell = (pos: Pos): Cell => ({
  pos,
  debug: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  center: [],
  corner: [],
  value: null,
  isFixed: false,
})

export const blankCells = () =>
  Array.from({ length: 81 }).map((_, i) => cell(posFromIndex(i)))
