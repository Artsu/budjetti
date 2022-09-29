import React, { Component, Fragment } from "react";
import { Switch, Route } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";

import ExpensesAndIncome from "./routes/ExpensesAndIncome/ExpensesAndIncomeContainer";
import Budgetting from "./routes/Budgetting/BudgettingContainer";
import CreditCards from "./routes/CreditCards/CreditCards";
import NavBar from "./components/NavBar/NavBar";
import Tabs from "./components/Tabs/Tabs";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bulma/css/bulma.css";

export default class App extends Component {
  render() {
    return (
      <section className="section">
        <div className="container">
          <Router>
            <Fragment>
              <NavBar />
              <Tabs />
              <Switch>
                <Route exact path="/" component={ExpensesAndIncome} />
                <Route exact path="/budget" component={Budgetting} />
                <Route exact path="/credit" component={CreditCards} />
              </Switch>
            </Fragment>
          </Router>
        </div>
      </section>
    );
  }
}
