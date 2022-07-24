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

const blankCell = () => ({
  value: null,
  corner: [],
  center: [],
  isFixed: false,
  debug: [],
})

export const blankCells = Array.from({ length: 81 }).map(blankCell)
