import React, {Component, Fragment} from 'react'
import BudgettingTable from '../../components/BudgettingTable/BudgettingTableContainer'
import NewCategoryBudgetInputGroup from '../../components/NewCategoryBudgetInputGroup/NewCategoryBudgetInputGroupContainer'

import {REPEATING_BUDGET_KEY} from '../../common/constants'
import MonthSelection from '../../components/MonthSelection/MonthSelectionContainer'

export default class Budgetting extends Component {

  componentDidMount() {
    this.props.loadBudgetForMonth(this.props.selectedMonth)
    this.props.loadRepeatingBudget()
  }

  render() {
    return <div>
      <MonthSelection />
      <h2 className="subtitle">Toistuvat kulut</h2>
      <NewCategoryBudgetInputGroup title="Lisää uusi toistuva kulu" budgetKey="repeating" />
      <BudgettingTable rows={this.props.repeatingBudget} budgetKey={REPEATING_BUDGET_KEY} />
      <hr/>
      <h2 className="subtitle">Pelkästään tässä kuussa tapahtuvat kulut</h2>
      <NewCategoryBudgetInputGroup title="Lisää kulu tälle kuukaudelle" budgetKey={this.props.selectedMonth} />
      <BudgettingTable rows={this.props.monthlyBudget} />
    </div>
  }

}