import { connect } from 'react-redux'

import ExpensesTable from './ExpensesTable'
import {updateEntry} from '../../common/entries/entriesActions'

function mapDispatchToProps(dispatch) {
  return {
    updateDateForEntry: (id, date) => dispatch(updateEntry(id, {date})),
    updateTransceiverForEntry: (id, transceiver) => dispatch(updateEntry(id, {transceiver})),
  }
}

export default connect(null, mapDispatchToProps)(ExpensesTable)