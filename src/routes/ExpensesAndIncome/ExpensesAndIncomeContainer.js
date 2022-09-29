import { connect } from "react-redux";

import ExpensesAndIncome from "./ExpensesAndIncome";
import { loadEntriesForAMonth } from "../../redux/entries/entriesActions";
import { loadCategoriesFromDb } from "../../redux/categories/categoriesActions";
import { loadBudgetWithKey } from "../../redux/budget/budgetActions";
import { REPEATING_BUDGET_KEY } from "../../redux/constants";

function mapStateToProps(state) {
  return {
    selectedMonth: state.ui.month,
    entries: state.entries.items,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadEntriesForAMonth: (month) => dispatch(loadEntriesForAMonth(month)),
    loadCategories: () => dispatch(loadCategoriesFromDb()),
    loadBudgetForMonth: (month) => dispatch(loadBudgetWithKey(month)),
    loadRepeatingBudget: () =>
      dispatch(loadBudgetWithKey(REPEATING_BUDGET_KEY)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesAndIncome);
