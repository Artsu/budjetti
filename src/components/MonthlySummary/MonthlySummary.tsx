import React, { Component, FC, useState } from "react";
import styled from "styled-components";
import classnames from "classnames";
import ColoredAmount from "../ColoredAmount/ColoredAmount";
import MonthlyResultsByCategories from "./MonthlyResultsByCategories";
import MonthlyDashboardGraphs from "./MonthlyDashboardGraphs";
import { Budget } from "../../redux/budget/budgetSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const ToggleIcon = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
`;

const CardContent = styled.div``;

const HeadDashboard = styled.div`
  display: flex;
`;

const MonthlyActualized = styled.div`
  display: grid;
  grid-template-columns: 100px auto;
  width: 200px;
  max-height: 70px;
  margin-top: 40px;
`;

const MonthlyBudgetted = styled.div`
  display: grid;
  grid-template-columns: 150px auto;
  width: 250px;
  max-height: 70px;
  margin-top: 40px;
`;

const AmountCell = styled.span`
  text-align: right;
`;

const ExpandableCardContent = styled.div<{ isExpanded: boolean }>`
  height: auto;
  transition: max-height 0.3s linear;
  max-height: ${(props) => (props.isExpanded ? "1000px" : "0")};
  overflow: hidden;
`;

const VerticalSeparator = styled.div`
  margin: 0 25px 0 30px;
  border-left: 1px solid lightgray;
`;

interface Expense {
  amount: number;
}

const MonthlySummary: FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const entries = useSelector((state: RootState) => state.entries.items);
  const budget = useSelector((state: RootState) => [
    ...state.budget.monthly,
    ...state.budget.repeating,
  ]);

  const calculateTotal = (
    entries: (Expense | Budget)[],
    filter?: (amount: number) => boolean,
  ) => {
    return entries.reduce((acc, entry) => {
      if (!filter || filter(entry.amount)) {
        return acc + entry.amount;
      }
      return acc;
    }, 0);
  };

  const expenses = calculateTotal(entries, (amount) => amount < 0);
  const income = calculateTotal(entries, (amount) => amount > 0);
  const total = calculateTotal(entries);

  const expensesBudget = calculateTotal(budget, (amount) => amount < 0);
  const incomeBudget = calculateTotal(budget, (amount) => amount > 0);
  const totalBudget = calculateTotal(budget);

  return (
    <div className="card">
      <CardContent className="card-content">
        <ToggleIcon
          className="icon is-large"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <i
            className={classnames(
              "fas fa-2x",
              isExpanded ? "fa-angle-up" : "fa-angle-down",
            )}
          />
        </ToggleIcon>
        <HeadDashboard>
          <MonthlyActualized>
            <strong>Menot:</strong>
            <AmountCell>
              <ColoredAmount value={expenses} /> €
            </AmountCell>
            <strong>Tulot:</strong>
            <AmountCell>
              <ColoredAmount value={income} /> €
            </AmountCell>
            <strong>Yhteensä:</strong>
            <AmountCell>
              <ColoredAmount value={total} /> €
            </AmountCell>
          </MonthlyActualized>
          <VerticalSeparator />
          <MonthlyBudgetted>
            <strong>Arvio menoista:</strong>
            <AmountCell>
              <ColoredAmount value={expensesBudget} /> €
            </AmountCell>
            <strong>Arvio tuloista:</strong>
            <AmountCell>
              <ColoredAmount value={incomeBudget} /> €
            </AmountCell>
            <strong>Arvio yhteensä:</strong>
            <AmountCell>
              <ColoredAmount value={totalBudget} /> €
            </AmountCell>
          </MonthlyBudgetted>
          <VerticalSeparator />
          <MonthlyDashboardGraphs
            expenses={expenses}
            income={income}
            expensesBudget={expensesBudget}
            incomeBudget={incomeBudget}
          />
        </HeadDashboard>
        <ExpandableCardContent isExpanded={isExpanded}>
          <hr />
          <MonthlyResultsByCategories entries={entries} />
        </ExpandableCardContent>
      </CardContent>
    </div>
  );
};

export default MonthlySummary;
