import React from "react";
import { render } from "react-dom";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";

import App from "./App";
import rootReducer from "./redux/rootReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root"),
);

// Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}
