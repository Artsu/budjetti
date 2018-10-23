import { connect } from 'react-redux'

import NewEntryInputGroup from './NewEntryInputGroup'
import { addEntries } from '../../common/entries/entriesActions'

function mapDispatchToProps(dispatch) {
  return {
    addEntry: (entry) => {
      return dispatch(addEntries([entry]))
    }
  }
}

export default connect(null, mapDispatchToProps)(NewEntryInputGroup)