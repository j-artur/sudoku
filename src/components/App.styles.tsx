import styled from '@emotion/styled'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;

  width: 100%;
  height: 100%;

  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};

  font-family: 'Open Sans', 'Roboto', sans-serif;

  transition: background-color 0.15s ease, color 0.15s ease;
`

export const GameContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  width: 100%;
  height: 100%;
`
