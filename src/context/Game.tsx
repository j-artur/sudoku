import { dir, mode, move } from '@/utils'
import { blankCells, sameBox, sameCol, sameRow } from '@/utils/cell'
import { Cell, Dir, Mode } from '@/utils/types'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react'

export interface State {
  grid: Cell[]
  old: State | null
  next: State | null
  focus: number[]
  marked: number | null
  // tips: boolean
  debug: boolean
  key: boolean
  mouse: boolean
  mode: Mode
}

const initialState: State = {
  grid: blankCells(),
  old: null,
  next: null,
  focus: [],
  marked: null,
  mode: 'DIGIT',
  // tips: false,
  key: false,
  mouse: false,
  debug: false,
}

type Action =
  | [type: 'INPUT_VALUE', value: number | null]
  | [type: 'MARK_VALUE', value: number | null]
  | [type: 'SELECT_CELL', index: number]
  | [type: 'MOVE_SELECTION', dir: Dir]
  | [type: 'SET_MODE', mode: Mode]
  | [type: 'BLUR']
  | [type: 'PRESS_KEY']
  | [type: 'RELEASE_KEY']
  | [type: 'PRESS_MOUSE']
  | [type: 'RELEASE_MOUSE']
  | [type: 'TOGGLE_DEBUG']
  | [type: 'MOUSE_ENTER', index: number]
  | [type: 'UNDO']
  | [type: 'REDO']

const updateDebug = (state: State): State => {
  if (!state.debug) return state
  return {
    ...state,
    grid: state.grid.map((cell, i) => {
      if (cell.isFixed) return cell

      const debug = state.grid.reduce(
        (vs, c, j) =>
          (sameRow(i, j) || sameCol(i, j) || sameBox(i, j)) && c.value !== null
            ? vs.filter(v => v !== c.value)
            : vs,
        [1, 2, 3, 4, 5, 6, 7, 8, 9]
      )
      return { ...cell, debug }
    }),
  }
}

const setValue =
  (is: number[], value: number | null) =>
  (cell: Cell, i: number): Cell => {
    if (!is.includes(i) || cell.isFixed) return cell

    if (cell.value === value && value === null) return cell
    if (cell.value === value) return { ...cell, value: null }
    return { ...cell, value }
  }

const addCenter =
  (is: number[], value: number | null) =>
  (cell: Cell, i: number): Cell => {
    if (!is.includes(i) || cell.isFixed) return cell
    if (value === null) return { ...cell, center: [] }
    if (cell.center.includes(value))
      return { ...cell, center: cell.center.filter(v => v !== value) }
    return { ...cell, center: [...cell.center, value].sort() }
  }

const addCorner =
  (is: number[], value: number | null) =>
  (cell: Cell, i: number): Cell => {
    if (!is.includes(i) || cell.isFixed) return cell
    if (value === null) return { ...cell, corner: [] }
    if (cell.corner.includes(value))
      return { ...cell, corner: cell.corner.filter(v => v !== value) }
    return { ...cell, corner: [...cell.corner, value].sort() }
  }

const reducer = (state: State, [type, payload]: Action): State => {
  console.log(type, payload)

  switch (type) {
    case 'UNDO':
      return state.old ? { ...state.old, next: state } : state
    case 'REDO':
      return state.next ? state.next : state
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
    case 'MARK_VALUE':
      return { ...state, marked: payload }
    case 'BLUR':
      return { ...state, focus: state.key ? state.focus : [] }
    case 'MOVE_SELECTION': {
      if (state.focus.length === 0) return state
      const i = move(state.focus[0]!, payload)
      return { ...state, focus: state.key ? [i, ...state.focus] : [i] }
    }
    case 'TOGGLE_DEBUG':
      return updateDebug({ ...state, debug: !state.debug })
    case 'SELECT_CELL':
      return {
        ...state,
        focus: state.key ? [payload, ...state.focus] : [payload],
      }
    case 'MOUSE_ENTER':
      return state.mouse
        ? { ...state, focus: [payload, ...state.focus] }
        : state
    case 'INPUT_VALUE': {
      if (state.focus.length === 0) return state

      const grid = (() => {
        switch (state.mode) {
          case 'DIGIT':
            return state.grid.map(setValue(state.focus, payload))
          case 'CENTER':
            return state.grid.map(addCenter(state.focus, payload))
          case 'CORNER':
            return state.grid.map(addCorner(state.focus, payload))
        }
      })()

      return updateDebug({ ...state, grid, old: state, next: null })
    }
  }
}

const parseGrid = (grid: Cell[], str: string): Cell[] => {
  const values = str.replaceAll(',', '')
  return grid.map((cell, i) => {
    const value = Number(values[i])
    if (isNaN(value)) return cell
    return { ...cell, value, isFixed: true, debug: [] }
  })
}

type Context = [State, React.Dispatch<Action>]

export const gameContext = createContext<Context>([initialState, () => {}])

export const useGame = () => useContext(gameContext)

export const GameProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const grid = useMemo(
    () =>
      Object.fromEntries(new URLSearchParams(window.location.search))['grid'],
    []
  )

  const [state, dispatch] = useReducer(reducer, initialState, () => {
    return grid
      ? { ...initialState, grid: parseGrid(initialState.grid, grid) }
      : initialState
  })

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.ctrlKey) {
      switch (e.key) {
        case 'z':
        case 'Z':
          dispatch(['UNDO'])
          break
        case 'y':
        case 'Y':
          dispatch(['REDO'])
          break
      }
    } else {
      if (e.key.match(/^[1-9]$/)) dispatch(['INPUT_VALUE', parseInt(e.key)])
      else if (e.key === 'Backspace' || e.key === 'Delete')
        dispatch(['INPUT_VALUE', null])
      else if (dir(e.key)) dispatch(['MOVE_SELECTION', dir(e.key)!])
      else if (e.key === 'Escape') dispatch(['BLUR'])
      else if (e.key === 'd' || e.key === 'D') dispatch(['TOGGLE_DEBUG'])
      else if (mode(e.key)) dispatch(['SET_MODE', mode(e.key)!])
      else if (e.key === 'Shift') dispatch(['PRESS_KEY'])
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
    if (e.key === 'Shift') dispatch(['RELEASE_KEY'])
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

  return (
    <gameContext.Provider value={[state, dispatch]}>
      {children}
    </gameContext.Provider>
  )
}
