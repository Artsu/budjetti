import { connect } from 'react-redux'

import ExpensesAndIncome from './ExpensesAndIncome'
import {loadEntriesForAMonth} from '../../common/entries/entriesActions'
import {loadCategoriesFromDb} from '../../common/categories/categoriesActions'
import {loadBudgetWithKey} from '../../common/budget/budgetActions'
import {REPEATING_BUDGET_KEY} from '../../common/constants'

function mapStateToProps(state) {
  return {
    selectedMonth: state.ui.month,
    entries: state.entries.items,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadEntriesForAMonth: (month) => dispatch(loadEntriesForAMonth(month)),
    loadCategories: () => dispatch(loadCategoriesFromDb()),
    loadBudgetForMonth: (month) => dispatch(loadBudgetWithKey(month)),
    loadRepeatingBudget: () => dispatch(loadBudgetWithKey(REPEATING_BUDGET_KEY)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesAndIncome)