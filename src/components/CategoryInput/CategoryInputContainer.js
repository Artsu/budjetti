import { connect } from 'react-redux'

import CategoryInput from './CategoryInput'
import {updateCategory} from '../../common/entries/entriesActions'

function mapDispatchToProps(dispatch) {
  return {
    saveCategory: (id, category) => dispatch(updateCategory(id, category)),
  }
}

export default connect(null, mapDispatchToProps)(CategoryInput)