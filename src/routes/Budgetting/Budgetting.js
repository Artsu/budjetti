import React, {Component, Fragment} from 'react'
import BudgettingTable from '../../components/BudgettingTable/BudgettingTableContainer'
import NewCategoryBudgetInputGroup from '../../components/NewCategoryBudgetInputGroup/NewCategoryBudgetInputGroupContainer'

import {REPEATING_BUDGET_KEY} from '../../common/constants'
const MOCK_MONTH_KEY = '2018/10'

export default class Budgetting extends Component {

  componentDidMount() {
    this.props.loadBudgetForMonth(MOCK_MONTH_KEY)
    this.props.loadRepeatingBudget()
  }

  render() {
    return <Fragment>
      <h2 className="subtitle">Toistuvat kulut</h2>
      <NewCategoryBudgetInputGroup title="Lisää uusi toistuva kulu" budgetKey="repeating" />
      <BudgettingTable rows={this.props.repeatingBudget} budgetKey={REPEATING_BUDGET_KEY} />
      <hr/>
      <h2 className="subtitle">Pelkästään tässä kuussa tapahtuvat kulut</h2>
      <NewCategoryBudgetInputGroup title="Lisää kulu tälle kuukaudelle" budgetKey={MOCK_MONTH_KEY} />
      <BudgettingTable rows={this.props.monthlyBudget} />
    </Fragment>
  }

}