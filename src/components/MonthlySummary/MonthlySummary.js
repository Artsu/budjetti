import React, {Component} from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import ColoredAmount from '../ColoredAmount/ColoredAmount'
import MonthlyResultsByCategories from './MonthlyResultsByCategories'
import MonthlyDashboardGraphs from './MonthlyDashboardGraphs'

const ToggleIcon = styled.span`
  position: absolute;
  top: 0px;
  right: 0px;
  cursor: pointer;
`

const CardContent = styled.div`
  
`

const HeadDashboard = styled.div`
  display: flex;
`

const MonthlyActualized = styled.div`
  display: grid;
  grid-template-columns: 100px auto;
  width: 200px;
  max-height: 70px;
  margin-top: 40px;
`

const MonthlyBudgetted = styled.div`
  display: grid;
  grid-template-columns: 150px auto;
  width: 250px;
  max-height: 70px;
  margin-top: 40px;
`

const AmountCell = styled.span`
  text-align: right;
`

const ExpandableCardContent = styled.div`
  height: auto;
  transition: max-height 0.3s linear;
  max-height: ${props => props.isExpanded ? '1000px' : '0'};
  overflow: hidden;
`

const VerticalSeparator = styled.div`
  margin: 0 25px 0 30px;
  border-left: 1px solid lightgray;
`

export default class MonthlySummary extends Component {
  state = {
    isExpanded: false,
  }

  calculateTotal = (entries, filter = () => true) => {
    return entries.reduce((acc, entry) => {
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
    const expenses = this.calculateTotal(this.props.entries, (amount) => amount < 0)
    const income = this.calculateTotal(this.props.entries, (amount) => amount > 0)
    const total = this.calculateTotal(this.props.entries)

    const expensesBudget = this.calculateTotal(this.props.budget, (amount) => amount < 0)
    const incomeBudget = this.calculateTotal(this.props.budget, (amount) => amount > 0)
    const totalBudget = this.calculateTotal(this.props.budget)

    return <div className="card">
      <CardContent className="card-content">
        <ToggleIcon className="icon is-large" onClick={this.toggleExpanded}>
          <i className={classnames('fas fa-2x', this.state.isExpanded ? 'fa-angle-up' : 'fa-angle-down')} />
        </ToggleIcon>
        <HeadDashboard>
          <MonthlyActualized>
            <strong>Menot:</strong><AmountCell><ColoredAmount value={expenses}/> €</AmountCell>
            <strong>Tulot:</strong><AmountCell><ColoredAmount value={income}/> €</AmountCell>
            <strong>Yhteensä:</strong><AmountCell><ColoredAmount value={total}/> €</AmountCell>
          </MonthlyActualized>
          <VerticalSeparator />
          <MonthlyBudgetted>
            <strong>Arvio menoista:</strong><AmountCell><ColoredAmount value={expensesBudget}/> €</AmountCell>
            <strong>Arvio tuloista:</strong><AmountCell><ColoredAmount value={incomeBudget}/> €</AmountCell>
            <strong>Arvio yhteensä:</strong><AmountCell><ColoredAmount value={totalBudget}/> €</AmountCell>
          </MonthlyBudgetted>
          <VerticalSeparator />
          <MonthlyDashboardGraphs
            expenses={expenses}
            income={income}
            expensesBudget={expensesBudget}
            incomeBudget={incomeBudget}
          />
        </HeadDashboard>
        <ExpandableCardContent isExpanded={this.state.isExpanded}>
          <hr/>
          <MonthlyResultsByCategories entries={this.props.entries} />
        </ExpandableCardContent>
      </CardContent>
    </div>
  }
}