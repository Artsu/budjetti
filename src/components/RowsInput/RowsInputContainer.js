import { connect } from "react-redux";

import RowsInput from "./RowsInput";
import { addEntries } from "../../redux/entries/entriesActions";

function mapStateToProps(state) {
  return {
    categories: state.categories.defaultTransceiverCategories,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addEntries: (entries) => {
      return dispatch(addEntries(entries));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RowsInput);
