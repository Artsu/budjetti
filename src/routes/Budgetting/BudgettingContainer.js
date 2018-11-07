import { connect } from 'react-redux'

import Budgetting from './Budgetting'
import {loadBudgetFromDb} from '../../common/budget/budgetActions'

function mapStateToProps(state) {
  return {
    budget: state.budget,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadBudget: () => dispatch(loadBudgetFromDb()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Budgetting)