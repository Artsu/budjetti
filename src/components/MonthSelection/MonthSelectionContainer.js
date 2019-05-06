import { connect } from 'react-redux'

import MonthSelection from './MonthSelection'
import {updateSelectedMonth} from '../../common/ui/uiActions'
import {loadBudgetWithKey} from '../../common/budget/budgetActions'
import {loadEntriesForAMonth} from '../../common/entries/entriesActions'

function mapStateToProps(state) {
  return {
    selectedMonth: state.ui.month,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectMonth: (month) => {
      dispatch(updateSelectedMonth(month))
      dispatch(loadBudgetWithKey(month))
      dispatch(loadEntriesForAMonth(month))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MonthSelection)