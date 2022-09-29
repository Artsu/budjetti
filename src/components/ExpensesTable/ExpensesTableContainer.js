import { connect } from "react-redux";

import ExpensesTable from "./ExpensesTable";
import { deleteEntry, updateEntry } from "../../redux/entries/entriesActions";

function mapDispatchToProps(dispatch) {
  return {
    updateDateForEntry: (id, date) => dispatch(updateEntry(id, { date })),
    updateTransceiverForEntry: (id, transceiver) =>
      dispatch(updateEntry(id, { transceiver })),
    updateAmountForEntry: (id, amount) => dispatch(updateEntry(id, { amount })),
    deleteEntry: (id) => dispatch(deleteEntry(id)),
  };
}

export default connect(null, mapDispatchToProps)(ExpensesTable);
