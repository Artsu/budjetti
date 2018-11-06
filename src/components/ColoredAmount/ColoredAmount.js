import React from 'react'
import styled from 'styled-components'

function getColorForAmount(amount) {
  if (amount > 0) {
    return '#1a845f'
  }
  if (amount < 0) {
    return '#c4505f'
  }
}

const ColoredAmount = styled.span`
  color: ${props => getColorForAmount(props.value)};
  
  ::after {
    content: '${props => props.value ? props.value.toFixed(2) : '0'}';
  }
`

export default ColoredAmount