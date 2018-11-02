import React, {Component} from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import ColoredAmount from '../ColoredAmount/ColoredAmount'

const ToggleIcon = styled.span`
  position: absolute;
  top: 0px;
  right: 0px;
  cursor: pointer;
`

const CardContent = styled.div`
  
`

const HeadDashboard = styled.div`
  display: grid;
  grid-template-columns: 100px auto;
  width: 200px;
`

const AmountCell = styled.span`
  text-align: right;
`

const ExpandableCardContent = styled.div`
  height: auto;
  transition: max-height 0.3s linear;
  max-height: ${props => props.isExpanded ? '500px' : '0'};
  overflow: hidden;
`

export default class MonthlySummary extends Component {
  state = {
    isExpanded: false,
  }

  calculateTotal = (filter) => {
    return this.props.entries.reduce((acc, entry) => {
      if (filter(entry.amount)) {
        return acc + entry.amount
      }
      return acc
    }, 0)
  }

  toggleExpanded = () => {
    this.setState({isExpanded: !this.state.isExpanded})
  }

  render() {
    const expenses = this.calculateTotal((amount) => amount < 0)
    const income = this.calculateTotal((amount) => amount > 0)
    const total = this.calculateTotal(() => true)

    return <div className="card">
      <CardContent className="card-content">
        <ToggleIcon className="icon is-large" onClick={this.toggleExpanded}>
          <i className={classnames('fas fa-2x', this.state.isExpanded ? 'fa-angle-up' : 'fa-angle-down')} />
        </ToggleIcon>
        <HeadDashboard>
          <strong>Menot:</strong><AmountCell><ColoredAmount value={expenses}/> €</AmountCell>
          <strong>Tulot:</strong><AmountCell><ColoredAmount value={income}/> €</AmountCell>
          <strong>Yhteensä:</strong><AmountCell><ColoredAmount value={total}/> €</AmountCell>
        </HeadDashboard>
        <ExpandableCardContent isExpanded={this.state.isExpanded}>

        </ExpandableCardContent>
      </CardContent>
    </div>
  }
}