import React, {Component} from 'react'
import RowsInput from '../../components/RowsInput/RowsInputContainer'
import ExpensesTable from '../../components/ExpensesTable/ExpensesTable'
import ColoredAmount from '../../components/ColoredAmount/ColoredAmount'
import NewEntryInputGroup from '../../components/NewEntryInputGroup/NewEntryInputGroupContainer'
import MonthSelection from '../../components/MonthSelection/MonthSelectionContainer'
export default class ExpensesAndIncome extends Component {

  async componentDidMount() {
    await this.props.loadEntriesForAMonth(new Date())
  }

  calculateTotal = (filter) => {
    return this.props.entries.reduce((acc, entry) => {
      if (filter(entry.amount)) {
        return acc + entry.amount
      }
      return acc
    }, 0)
  }

  render() {
    const expenses = this.calculateTotal((amount) => amount < 0)
    const income = this.calculateTotal((amount) => amount > 0)
    const total = this.calculateTotal(() => true)

    return <div>
      <RowsInput/>
      <MonthSelection />
      <NewEntryInputGroup />
      <ExpensesTable entries={this.props.entries} deleteEntry={this.props.deleteEntry} />
      <div>
        Arvio kuukauden menoista: <ColoredAmount value={expenses}/>€<br/>
        Arvio kuukauden tuloista: +<ColoredAmount value={income}/>€<br/>
        Kuukauden tulos: <ColoredAmount value={total}/>€<br/>
      </div>
    </div>
  }
}