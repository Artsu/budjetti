import { connect } from 'react-redux'

import BudgettingTable from './BudgettingTable'
import {
  addOrUpdateBudgetForCategory,
  deleteBudgetForCategory,
  renameCategory,
} from '../../common/budget/budgetActions'

function mapDispatchToProps(dispatch) {
  return {
    updateBudget: (key, budget) => dispatch(addOrUpdateBudgetForCategory(key, budget)),
    deleteBudget: (key, category) => dispatch(deleteBudgetForCategory(key, category)),
    renameCategory: (key, category, newCategoryName) => dispatch(renameCategory(key, category, newCategoryName))
  }
}

export default connect(null, mapDispatchToProps)(BudgettingTable)