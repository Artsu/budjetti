import { connect } from 'react-redux'

import CategoryInput from './CategoryInput'
import {saveCategory} from '../../common/entries/entriesActions'

function mapDispatchToProps(dispatch) {
  return {
    saveCategory: (payload) => dispatch(saveCategory(payload)),
  }
}

export default connect(null, mapDispatchToProps)(CategoryInput)