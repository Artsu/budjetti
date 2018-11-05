import { connect } from 'react-redux'

import ExpensesAndIncome from './ExpensesAndIncome'
import {loadEntriesForAMonth} from '../../common/entries/entriesActions'
import {loadCategoriesFromDb} from '../../common/categories/categoriesActions'

function mapStateToProps(state) {
  return {
    entries: state.entries.items,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadEntriesForAMonth: (month) => dispatch(loadEntriesForAMonth(month)),
    loadCategories: () => dispatch(loadCategoriesFromDb()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesAndIncome)