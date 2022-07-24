import { useGame } from '@/context/Game'
import { useTheme } from '@/context/Theme'
import { colFromIndex, pos, rowFromIndex } from '@/utils'
import { Fragment, useCallback, useMemo, useState } from 'react'
import Cell /* , { Debug } */ from './Cell'
// import { StyledCellOverlay } from './Cell.styles'
import {
  ArrowCircle,
  ArrowCircleConnector,
  ArrowLine,
  ArrowTip,
  CageBorders,
  CageTotal,
  Divider,
  OverlaySurface,
  StyledGrid,
  StyledGridOverlay,
  ThermoBulb,
  ThermoLine,
} from './Grid.styles'

const Grid: React.FC = () => {
  const [{ grid, marked, focus }] = useGame()

  return (
    <StyledGrid>
      {grid.cells.map((cell, i) => (
        <Cell
          key={pos(i)}
          cell={cell}
          index={i}
          isSelected={focus.includes(i)}
          isMarked={marked.includes(i)}
        />
      ))}
      <GridOverlay />
    </StyledGrid>
  )
}

const GridOverlay: React.FC = () => {
  const [state, dispatch] = useGame()
  const [theme] = useTheme()

  const [lastIndex, setLastIndex] = useState<number | null>(null)

  const getIndex = useCallback((e: React.MouseEvent) => {
    return {
      then: (cb: (i: number) => void) => {
        const { top, left, width, height } = e.currentTarget.getBoundingClientRect()

        const { clientX: x, clientY: y } = e

        if (x < left || x > left + width || y < top || y > top + height) return

        const r = Math.floor((y - top) / (height / 9))
        const c = Math.floor((x - left) / (width / 9))
        const i = r * 9 + c

        cb(i)
      },
    }
  }, [])

  const handleMouseDown: React.MouseEventHandler = useCallback(
    e => getIndex(e).then(i => dispatch(['SELECT_CELL', i])),
    []
  )

  const handleMouseMove: React.MouseEventHandler = useCallback(
    e => {
      getIndex(e).then(i => {
        if (i !== lastIndex) {
          dispatch(['MOUSE_ENTER', i])
          setLastIndex(i)
        }
      })
    },
    [lastIndex]
  )

  const handleMouseLeave: React.MouseEventHandler = useCallback(() => setLastIndex(null), [])

  const handleDoubleClick: React.MouseEventHandler = useCallback(
    e => getIndex(e).then(i => dispatch(['MARK_CELL', i])),
    []
  )

  const boundaries = useMemo(() => {
    return state.grid.cells.map((_, i) => {
      const region = state.grid.regions.find(r => r.includes(i))
      return region ? (
        <Dividers
          key={i}
          i={i}
          top={!region.includes(i - 9)}
          right={!region.includes(i + 1)}
          bottom={!region.includes(i + 9)}
          left={!region.includes(i - 1)}
        />
      ) : (
        <Dividers i={i} top={true} right={true} bottom={true} left={true} />
      )
    })
  }, [state.grid.regions])

  const cages = useMemo(() => {
    return (
      <>
        {state.grid.cages.map((c, i) => {
          const topLeft = c.cells.reduce((a, b) => Math.min(a, b), Infinity)
          return (
            <CageTotal key={i} row={rowFromIndex(topLeft)} col={colFromIndex(topLeft)}>
              {c.total}
            </CageTotal>
          )
        })}
        {state.grid.cells
          .map((_, i) => {
            const cage = state.grid.cages.find(c => c.cells.includes(i))
            return cage ? (
              <CageBorders
                key={i}
                row={rowFromIndex(i)}
                col={colFromIndex(i)}
                top={!cage.cells.includes(i - 9)}
                right={!cage.cells.includes(i + 1)}
                bottom={!cage.cells.includes(i + 9)}
                left={!cage.cells.includes(i - 1)}
              />
            ) : null
          })
          .filter(Boolean)}
      </>
    )
  }, [state.grid.cages])

  const thermos = useMemo(() => {
    return state.grid.thermos.map((t, i) => {
      return (
        <Fragment key={i}>
          {t.bulb !== null && (
            <ThermoBulb row={rowFromIndex(t.bulb!)} col={colFromIndex(t.bulb!)} />
          )}
          {t.lines.map((ci, i) => (
            <ThermoLine key={i} {...ci} />
          ))}
        </Fragment>
      )
    })
  }, [state.grid.thermos])

  const arrows = useMemo(() => {
    return state.grid.arrows.map((a, i) => {
      return (
        <Fragment key={i}>
          {typeof a.circle === 'number' ? (
            <ArrowCircle row={rowFromIndex(a.circle)} col={colFromIndex(a.circle)} />
          ) : typeof a.circle.left === 'number' && typeof a.circle.top === 'object' ? (
            <>
              <ArrowCircle row={a.circle.top[0]} col={a.circle.left} />
              <ArrowCircle row={a.circle.top[1]} col={a.circle.left} />
              <ArrowCircleConnector top={a.circle.top[0]} left={a.circle.left} angle={-90} />
            </>
          ) : typeof a.circle.left === 'object' && typeof a.circle.top === 'number' ? (
            <>
              <ArrowCircle row={a.circle.top} col={a.circle.left[0]} />
              <ArrowCircle row={a.circle.top} col={a.circle.left[1]} />
              <ArrowCircleConnector top={a.circle.top} left={a.circle.left[0]} angle={0} />
            </>
          ) : null}
          {a.lines.map((al, i) => {
            return <ArrowLine key={i} {...al} />
          })}
          <ArrowTip {...a.tip} />
        </Fragment>
      )
    })
  }, [state.grid.arrows])

  return (
    <StyledGridOverlay>
      <OverlaySurface
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onDoubleClick={handleDoubleClick}
      />
      {/* <Divider row={0} from={0} to={9} />
      <Divider row={9} from={0} to={9} />
      <Divider col={0} from={0} to={9} />
      <Divider col={9} from={0} to={9} /> */}

      {boundaries}
      {cages}
      {thermos}
      {arrows}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,

          width: `${100 * Math.SQRT2}%`,
          height: '1px',
          backgroundColor: `${theme.colors.divider}`,

          transformOrigin: '0.5px 0.5px',
          transform: 'rotate(45deg)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,

          width: `${100 * Math.SQRT2}%`,
          height: '1px',
          backgroundColor: `${theme.colors.divider}`,

          transformOrigin: '0.5px 0.5px',
          transform: 'rotate(-45deg)',
        }}
      />

      {/* {state.grid.cells.map((cell, i) => (
        <StyledCellOverlay key={i} i={i}>
          {state.debug && <Debug>{cell.debug}</Debug>}
        </StyledCellOverlay>
      ))} */}
    </StyledGridOverlay>
  )
}

interface DividerProps {
  i: number
  top?: boolean
  right?: boolean
  bottom?: boolean
  left?: boolean
}

const Dividers: React.FC<DividerProps> = ({ i, top, right, bottom, left }) => {
  return (
    <>
      {left && <Divider col={colFromIndex(i)} from={rowFromIndex(i)} to={rowFromIndex(i) + 1} />}
      {top && <Divider row={rowFromIndex(i)} from={colFromIndex(i)} to={colFromIndex(i) + 1} />}
      {right && (
        <Divider col={colFromIndex(i) + 1} from={rowFromIndex(i)} to={rowFromIndex(i) + 1} />
      )}
      {bottom && (
        <Divider row={rowFromIndex(i) + 1} from={colFromIndex(i)} to={colFromIndex(i) + 1} />
      )}
    </>
  )
}

export default Grid
