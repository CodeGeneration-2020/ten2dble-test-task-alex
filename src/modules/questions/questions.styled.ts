import styled from 'styled-components'

export const Input = styled.input<{error: boolean}>`
  border-radius: 8px;
  border: 1px solid ${({error}) => error ? 'red' : 'grey'};
  padding: 5%;
  width: 100%;
  text-align: center;
  background-color: white;
`

export const Text = styled.p`
  margin: 10px 0;
  color: white;
`

export const Button = styled.button<{error: boolean}>`
  background-color: yellow;
  padding: 15px 10px;
  border-radius: 8px;
  border: 0;
  color: ${({error}) => error ? 'red' : 'black'};
  width: 100%;
`