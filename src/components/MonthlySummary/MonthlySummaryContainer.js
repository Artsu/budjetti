import { connect } from 'react-redux'

import MonthlySummary from './MonthlySummary'
import {loadEntriesForAMonth} from '../../common/entries/entriesActions'

function mapStateToProps(state) {
  return {
    entries: state.entries.items,

  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadEntriesForAMonth: (month) => dispatch(loadEntriesForAMonth(month)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MonthlySummary)