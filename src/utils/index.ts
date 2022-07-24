export type Dir = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'

export type Mode = 'DIGIT' | 'CENTER' | 'CORNER'

export type Pos = `r${number}c${number}`

export const pos = (i: number): Pos => `r${rowFromIndex(i) + 1}c${colFromIndex(i) + 1}`

export const rowFromIndex = (i: number): number => Math.floor(i / 9)
export const colFromIndex = (i: number): number => i % 9
export const boxFromIndex = (i: number): number => Math.floor(i / 27) * 3 + Math.floor((i % 9) / 3)

export const sameRow = (i: number, j: number): boolean => rowFromIndex(i) === rowFromIndex(j)
export const sameCol = (i: number, j: number): boolean => colFromIndex(i) === colFromIndex(j)
export const sameBox = (i: number, j: number): boolean => boxFromIndex(i) === boxFromIndex(j)

export const indexFromBox = (b: number, i: number): number =>
  (3 * Math.floor(b / 3) + Math.floor(i / 3)) * 9 + ((b % 3) * 3 + (i % 3))
export const ip = (r: number, c: number): number => r * 9 + c

export const move = (i: number, dir: Dir): number => {
  const r = rowFromIndex(i)
  const c = colFromIndex(i)

  switch (dir) {
    case 'UP':
      return ((r + 8) % 9) * 9 + c
    case 'DOWN':
      return ((r + 10) % 9) * 9 + c
    case 'LEFT':
      return r * 9 + ((c + 8) % 9)
    case 'RIGHT':
      return r * 9 + ((c + 10) % 9)
  }
}

export const merge = <T>(...args: (T | T[])[]) => [...new Set<T>(args.flatMap(v => v))].sort()
