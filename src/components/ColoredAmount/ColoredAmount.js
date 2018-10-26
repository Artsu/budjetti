import React from 'react'
import styled from 'styled-components'

function getColorForAmount(amount) {
  if (amount > 0) {
    return 'green'
  }
  if (amount < 0) {
    return 'red'
  }
}

const ColoredAmount = styled.span`
  color: ${props => getColorForAmount(props.value)};
  
  ::after {
    content: '${props => props.value ? props.value.toFixed(2) : ''}';
  }
`

export default ColoredAmount