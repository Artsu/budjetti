import { connect } from "react-redux";

import CategoryInput from "./CategoryInput";
import { updateEntry } from "../../redux/entries/entriesActions";
import { addOrUpdateCategory } from "../../redux/categories/categoriesActions";

function mapStateToProps(state) {
  return {
    categories: state.categories.defaultTransceiverCategories,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateEntryCategory: (id, category) =>
      dispatch(updateEntry(id, { category })),
    saveCategory: (category) => dispatch(addOrUpdateCategory(category)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryInput);
