import React, {Component} from 'react'
import RowsInput from '../../components/RowsInput/RowsInputContainer'
import ExpensesTable from '../../components/ExpensesTable/ExpensesTableContainer'
import MonthlySummary from '../../components/MonthlySummary/MonthlySummaryContainer'
import NewEntryInputGroup from '../../components/NewEntryInputGroup/NewEntryInputGroupContainer'
import MonthSelection from '../../components/MonthSelection/MonthSelectionContainer'

export default class ExpensesAndIncome extends Component {

  async componentDidMount() {
    this.props.loadBudgetForMonth(this.props.selectedMonth)
    this.props.loadRepeatingBudget()
    await this.props.loadCategories()
    await this.props.loadEntriesForAMonth(this.props.selectedMonth)
  }

  render() {
    return <div>
      <MonthSelection />
      <MonthlySummary />
      <hr/>
      <RowsInput/>
      <NewEntryInputGroup />
      <ExpensesTable entries={this.props.entries} />
    </div>
  }

}