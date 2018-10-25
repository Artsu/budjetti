import { connect } from 'react-redux'

import ExpensesTable from './ExpensesTable'
import {updateDate} from '../../common/entries/entriesActions'

function mapDispatchToProps(dispatch) {
  return {
    updateDate: (id, date) => dispatch(updateDate(id, date)),
  }
}

export default connect(null, mapDispatchToProps)(ExpensesTable)