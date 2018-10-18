import { connect } from 'react-redux'

import RowsInput from './RowsInput'
import { addEntries } from '../../common/entries/entriesActions'

function mapDispatchToProps(dispatch) {
  return {
    addEntries: (entries) => {
      return dispatch(addEntries(entries))
    }
  }
}

export default connect(null, mapDispatchToProps)(RowsInput)