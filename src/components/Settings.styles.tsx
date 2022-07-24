import styled from '@emotion/styled'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  user-select: none;
`

interface SwitchProps {
  active: boolean
  children?: never
}

export const StyledSwitch = styled.button<SwitchProps>`
  position: relative;

  padding: 0;
  border: 0.25rem solid
    ${props => (props.active ? props.theme.colors.switchOn : props.theme.colors.switchOff)};
  border-radius: 0.75rem;
  width: 3rem;
  height: 1.5rem;

  background: ${props =>
    props.active ? props.theme.colors.switchOn : props.theme.colors.switchOff};

  outline: none;
  cursor: pointer;

  transition: background-color 0.35s ease, border-color 0.1s ease;

  &::after {
    position: absolute;

    content: '';

    top: 0;
    left: ${props => (props.active ? '0rem' : '1.5rem')};
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: ${props => props.theme.colors.switchKnob};

    transition: left 0.1s ease;
  }
`

export const SwitchContainer = styled.label<Pick<SwitchProps, 'active'>>`
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
      background-color: ${props =>
        props.active ? props.theme.colors.switchOnHover : props.theme.colors.switchOffHover};
      border-color: ${props =>
        props.active ? props.theme.colors.switchOnHover : props.theme.colors.switchOffHover};
    }
  }
`
