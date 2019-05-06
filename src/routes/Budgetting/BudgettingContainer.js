import { connect } from 'react-redux'

import Budgetting from './Budgetting'
import {loadBudgetWithKey} from '../../common/budget/budgetActions'
import {REPEATING_BUDGET_KEY} from '../../common/constants'

function mapStateToProps(state) {
  return {
    selectedMonth: state.ui.month,
    monthlyBudget: state.budget.monthly,
    repeatingBudget: state.budget.repeating,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadBudgetForMonth: (month) => dispatch(loadBudgetWithKey(month)),
    loadRepeatingBudget: () => dispatch(loadBudgetWithKey(REPEATING_BUDGET_KEY)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Budgetting)