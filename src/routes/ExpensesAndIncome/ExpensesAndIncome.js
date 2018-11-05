import React, {Component} from 'react'
import RowsInput from '../../components/RowsInput/RowsInputContainer'
import ExpensesTable from '../../components/ExpensesTable/ExpensesTableContainer'
import MonthlySummary from '../../components/MonthlySummary/MonthlySummaryContainer'
import NewEntryInputGroup from '../../components/NewEntryInputGroup/NewEntryInputGroupContainer'
import MonthSelection from '../../components/MonthSelection/MonthSelectionContainer'

export default class ExpensesAndIncome extends Component {

  async componentDidMount() {
    await this.props.loadCategories()
    await this.props.loadEntriesForAMonth(new Date())
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