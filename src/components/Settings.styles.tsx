import styled from '@emotion/styled'

const ON_COLOR = '#3a6a7f'
const HOVER_ON_COLOR = '#75a2c0'
const OFF_COLOR = '#172f3d'
const HOVER_OFF_COLOR = '#3b5368'

interface SwitchProps {
  isOn: boolean
  children?: never
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`

export const StyledSwitch = styled.button<SwitchProps>`
  position: relative;

  padding: 0;
  border: 0.25rem solid ${({ isOn }) => (isOn ? ON_COLOR : OFF_COLOR)};
  border-radius: 0.75rem;
  width: 3rem;
  height: 1.5rem;

  background: ${({ isOn }) => (isOn ? ON_COLOR : OFF_COLOR)};

  outline: none;
  cursor: pointer;

  transition: background-color 0.1s ease, border-color 0.1s ease;

  &::after {
    position: absolute;

    content: '';

    top: 0;
    left: ${({ isOn }) => (isOn ? '0' : '1.5rem')};
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #ffffff;

    transition: left 0.1s ease;
  }
`

interface SwitchContainerProps {
  isOn: boolean
}

export const SwitchContainer = styled.label<SwitchContainerProps>`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-end;
  font-size: 0.875rem;
  gap: 1rem;
  width: 100%;
  height: 100%;
  padding: 0.25rem;
  cursor: pointer;

  &:hover {
    button {
      background-color: ${({ isOn }) =>
        isOn ? HOVER_ON_COLOR : HOVER_OFF_COLOR};
      border-color: ${({ isOn }) => (isOn ? HOVER_ON_COLOR : HOVER_OFF_COLOR)};
    }
  }
`
