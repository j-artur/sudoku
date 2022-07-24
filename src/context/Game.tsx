import { Dir, ip, merge, Mode, move } from '@/utils'
import { blankCells } from '@/utils/cell'
import React, { createContext, useCallback, useContext, useEffect, useReducer } from 'react'

type Value = number
type Index = number
type Row = number
type Col = number

export interface Cell {
  value: Value | null
  corner: Value[]
  center: Value[]
  isFixed: boolean
  debug: Value[]
}

export interface Line {
  left: Col
  top: Row
  angle: number
}

export interface Cage {
  total: number | null
  cells: Index[]
}

export interface Pos {
  row: Row
  col: Col
}

const p = (row: Row, col: Col): Pos => ({ row, col })

export interface Thermo {
  bulb: Index | null
  lines: Line[]
}

export interface Arrow {
  circle: Index | { top: Row; left: [Col, Col] } | { left: Col; top: [Row, Row] }
  lines: Line[]
  tip: Line
}

export interface Grid {
  cells: Cell[]
  prev: Grid | null
  next: Grid | null
  regions: Index[][]
  cages: Cage[]
  thermos: Thermo[]
  arrows: Arrow[]
}

export interface State {
  grid: Grid
  focus: Index[]
  marked: Index[]
  key: boolean
  mouse: boolean
  mode: Mode
}

const l = (top: number, left: number, angle: number): Line => ({ top, left, angle })

const initialState: State = {
  grid: {
    cells: blankCells,
    regions: [
      [0, 1, 2, 9, 10, 11, 18, 19, 20],
      [3, 4, 5, 12, 13, 14, 21, 22, 23],
      [6, 7, 8, 15, 16, 17, 24, 25, 26],
      [27, 28, 29, 36, 37, 38, 45, 46, 47],
      [30, 31, 32, 39, 40, 41, 48, 49, 50],
      [33, 34, 35, 42, 43, 44, 51, 52, 53],
      [54, 55, 56, 63, 64, 65, 72, 73, 74],
      [57, 58, 59, 66, 67, 68, 75, 76, 77],
      [60, 61, 62, 69, 70, 71, 78, 79, 80],
    ],
    cages: [
      // { total: 30, cells: [0, 1, 10, 11, 12, 13, 4] },
      // { total: 13, cells: [6, 7, 8, 17] },
    ],
    thermos: [
      // {
      //   bulb: 1,
      //   lines: [
      //     { top: 0, left: 1, angle: 0 },
      //     { top: 0, left: 2, angle: -45 },
      //     { top: 1, left: 3, angle: -90 },
      //     { top: 2, left: 3, angle: 180 },
      //     { top: 2, left: 2, angle: 90 },
      //     { top: 1, left: 2, angle: 225 },
      //     { top: 2, left: 1, angle: 90 },
      //     { top: 1, left: 1, angle: 180 },
      //     { top: 1, left: 0, angle: 90 },
      //   ],
      // },
    ],
    arrows: [
      {
        circle: ip(0, 1),
        lines: [l(0, 1, -45), l(1, 2, -45), l(2, 3, -135), l(3, 2, 135), l(2, 1, 135)],
        tip: l(1, 0, 135),
      },
      {
        circle: ip(0, 4),
        lines: [l(0, 4, 0), l(0, 5, -90), l(1, 5, -45)],
        tip: l(2, 6, -45),
      },
      {
        circle: ip(3, 4),
        lines: [l(3, 4, -135), l(4, 3, -135), l(5, 2, -135)],
        tip: l(6, 1, -135),
      },
      {
        circle: ip(4, 2),
        lines: [l(4, 2, 135), l(3, 1, 135)],
        tip: l(2, 0, 135),
      },
      {
        circle: ip(3, 6),
        lines: [l(3, 6, -90), l(4, 6, 180)],
        tip: l(4, 5, 180),
      },
      {
        circle: ip(8, 7),
        lines: [l(8, 7, 135), l(7, 6, 135), l(6, 5, 90), l(5, 5, -45), l(6, 6, -45)],
        tip: l(7, 7, -45),
      },
    ],
    prev: null,
    next: null,
  },
  focus: [],
  marked: [],
  mode: 'DIGIT',
  key: false,
  mouse: false,
}

export type Action =
  | ['INPUT_VALUE', Value | null]
  | ['MARK_CELL', Index | null]
  | ['SELECT_CELL', Index | null]
  | ['SELECT_ALL']
  | ['MOVE_SELECTION', Dir]
  | ['SET_MODE', Mode]
  | ['BLUR']
  | ['PRESS_KEY']
  | ['RELEASE_KEY']
  | ['PRESS_MOUSE']
  | ['RELEASE_MOUSE']
  | ['MOUSE_ENTER', Index]
  | ['UNDO']
  | ['REDO']

const reducer = (state: State, [type, payload]: Action): State => {
  console.log(type, payload)

  switch (type) {
    case 'UNDO':
      return state.grid.prev ? { ...state, grid: { ...state.grid.prev, next: state.grid } } : state
    case 'REDO':
      return state.grid.next ? { ...state, grid: { ...state.grid.next, prev: state.grid } } : state
    case 'PRESS_KEY':
      return { ...state, key: true }
    case 'RELEASE_KEY':
      return { ...state, key: false }
    case 'PRESS_MOUSE':
      return { ...state, mouse: true }
    case 'RELEASE_MOUSE':
      return { ...state, mouse: false }
    case 'SET_MODE':
      return { ...state, mode: payload }
    case 'MOUSE_ENTER':
      return state.mouse ? { ...state, focus: [payload, ...state.focus] } : state
    case 'BLUR':
      return { ...state, focus: state.key ? state.focus : [] }
    case 'SELECT_ALL':
      return { ...state, focus: state.grid.cells.map((_, i) => i) }
    case 'SELECT_CELL': {
      return payload !== null
        ? { ...state, focus: [payload, ...(state.key ? state.focus : [])] }
        : { ...state, focus: [] }
    }
    case 'MOVE_SELECTION': {
      return state.focus.length
        ? { ...state, focus: [move(state.focus[0]!, payload), ...(state.key ? state.focus : [])] }
        : state
    }
    case 'MARK_CELL':
      return {
        ...state,
        marked: merge(
          payload !== null
            ? (state.grid.cells
                .map(c =>
                  state.mode === 'DIGIT'
                    ? state.grid.cells[payload]?.value !== null &&
                      c.value === state.grid.cells[payload]?.value
                    : state.mode === 'CENTER'
                    ? state.grid.cells[payload]!.center.length &&
                      state.grid.cells[payload]!.center.every(v => c.center.includes(v))
                    : state.mode === 'CORNER'
                    ? state.grid.cells[payload]!.corner.length &&
                      state.grid.cells[payload]!.corner.every(v => c.corner.includes(v))
                    : false
                )
                .map((b, i) => (b ? i : null))
                .filter(v => v !== null) as number[])
            : [],
          state.key ? state.marked : []
        ),
      }
    case 'INPUT_VALUE': {
      if (state.focus.length === 0) return state

      const cells = state.grid.cells
      const { focus } = state

      return {
        ...state,
        grid: {
          ...state.grid,
          prev: state.grid,
          cells: cells.map((c, i) => {
            if (!focus.includes(i)) return c
            if (payload !== null) {
              switch (state.mode) {
                case 'DIGIT':
                  return focus.some(i => cells[i]!.value !== payload)
                    ? { ...c, value: payload }
                    : { ...c, value: null }
                case 'CENTER':
                  return focus.some(i => !cells[i]!.center.includes(payload))
                    ? { ...c, center: merge(c.center, payload) }
                    : { ...c, center: c.center.filter(v => v !== payload) }
                case 'CORNER':
                  return focus.some(i => !cells[i]!.corner.includes(payload))
                    ? { ...c, corner: merge(c.corner, payload) }
                    : { ...c, corner: c.corner.filter(v => v !== payload) }
              }
            } else {
              const empty = { ...c, value: null, center: [], corner: [] }
              switch (state.mode) {
                case 'DIGIT':
                  return focus.some(i => cells[i]!.value !== null) ? { ...c, value: null } : empty
                case 'CENTER':
                  return focus.some(i => cells[i]!.center.length) ? { ...c, center: [] } : empty
                case 'CORNER':
                  return focus.some(i => cells[i]!.corner.length) ? { ...c, corner: [] } : empty
              }
            }
          }),
          next: null,
        },
      }
    }
  }
}

const parseUrl = (state: State): State => {
  try {
    const str = Object.fromEntries(new URLSearchParams(location.search))['grid']!

    return str
      ? {
          ...state,
          grid: {
            ...state.grid,
            cells: state.grid.cells.map((cell, i) => {
              const value = Number(str[i])
              return isNaN(value) ? cell : { ...cell, value, isFixed: true }
            }),
          },
        }
      : state
  } catch (error) {
    return state
  }
}

type Context = [State, React.Dispatch<Action>]

export const gameContext = createContext({} as Context)

export const useGame = () => useContext(gameContext)

export const GameProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, parseUrl)

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Input digits
    if (e.key.match(/^[0-9]$/)) {
      return dispatch(['INPUT_VALUE', parseInt(e.key)])
    }

    // Movements
    switch (e.key) {
      case 'ArrowUp':
        return dispatch(['MOVE_SELECTION', 'UP'])
      case 'ArrowDown':
        return dispatch(['MOVE_SELECTION', 'DOWN'])
      case 'ArrowLeft':
        return dispatch(['MOVE_SELECTION', 'LEFT'])
      case 'ArrowRight':
        return dispatch(['MOVE_SELECTION', 'RIGHT'])
    }

    // Other
    switch (e.key) {
      case 'Control':
        return dispatch(['PRESS_KEY'])
      case 'Backspace':
      case 'Delete':
        return dispatch(['INPUT_VALUE', null])
      case 'Escape':
        return dispatch(['BLUR'])
    }

    // Control commands
    if (e.ctrlKey) {
      switch (e.key.toUpperCase()) {
        case 'Z':
          return dispatch(['UNDO'])
        case 'Y':
          return dispatch(['REDO'])
        case 'A':
          e.preventDefault()
          return dispatch(['SELECT_ALL'])
      }
    } else {
      // Switch modes
      switch (e.key.toUpperCase()) {
        case 'Z':
          return dispatch(['SET_MODE', 'DIGIT'])
        case 'X':
          return dispatch(['SET_MODE', 'CORNER'])
        case 'C':
          return dispatch(['SET_MODE', 'CENTER'])
      }
    }
  }, [])

  // listen for mouse clicks and treat holding button
  const handleMouseDown = useCallback((e: MouseEvent) => {
    if (e.button === 0) dispatch(['PRESS_MOUSE'])
  }, [])

  // listen for mouse up and treat releasing button
  const handleMouseUp = useCallback((e: MouseEvent) => {
    if (e.button === 0) dispatch(['RELEASE_MOUSE'])
  }, [])

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Control') dispatch(['RELEASE_KEY'])
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [handleKeyDown, handleKeyUp, handleMouseDown, handleMouseUp])

  return <gameContext.Provider value={[state, dispatch]}>{children}</gameContext.Provider>
}
