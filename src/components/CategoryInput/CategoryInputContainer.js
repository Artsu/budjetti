import { connect } from 'react-redux'

import CategoryInput from './CategoryInput'
import {updateEntry} from '../../common/entries/entriesActions'

function mapDispatchToProps(dispatch) {
  return {
    saveCategory: (id, category) => dispatch(updateEntry(id, {category})),
  }
}

export default connect(null, mapDispatchToProps)(CategoryInput)