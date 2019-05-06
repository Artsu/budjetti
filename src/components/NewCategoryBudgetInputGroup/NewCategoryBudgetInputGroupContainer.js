import { connect } from 'react-redux'

import NewCategoryBudgetInputGroup from './NewCategoryBudgetInputGroup'
import { addOrUpdateBudgetForCategory } from '../../common/budget/budgetActions'

function mapDispatchToProps(dispatch) {
  return {
    addOrUpdateBudgetForCategory: (key, categoryBudget) => {
      return dispatch(addOrUpdateBudgetForCategory(key, categoryBudget))
    }
  }
}

export default connect(null, mapDispatchToProps)(NewCategoryBudgetInputGroup)