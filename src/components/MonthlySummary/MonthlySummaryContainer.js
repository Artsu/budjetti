import { connect } from "react-redux";

import MonthlySummary from "./MonthlySummary";
import { loadEntriesForAMonth } from "../../redux/entries/entriesActions";

function mapStateToProps(state) {
  return {
    entries: state.entries.items,
    budget: [...state.budget.monthly, ...state.budget.repeating],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadEntriesForAMonth: (month) => dispatch(loadEntriesForAMonth(month)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MonthlySummary);
