import { connect } from 'react-redux'

import MonthSelection from './MonthSelection'
import {loadEntriesForAMonth} from '../../common/entries/entriesActions'

function mapStateToProps(state) {
  return {
    selectedMonth: state.entries.selectedMonth,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectMonth: (month) => dispatch(loadEntriesForAMonth(month)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MonthSelection)