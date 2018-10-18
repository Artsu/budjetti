import { connect } from 'react-redux'

import ExpensesAndIncome from './ExpensesAndIncome'
import {loadEntriesForAMonth, deleteEntry} from '../../common/entries/entriesActions'

function mapStateToProps(state) {
  return {
    entries: state.entries.items,

  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadEntriesForAMonth: (month) => dispatch(loadEntriesForAMonth(month)),
    deleteEntry: (id) => dispatch(deleteEntry(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesAndIncome)