import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect } from "react";
import MonthSelection from "../src/components/MonthSelection/MonthSelection";
import NewCategoryBudgetInputGroup from "../src/components/NewCategoryBudgetInputGroup/NewCategoryBudgetInputGroup";
import BudgettingTable from "../src/components/BudgettingTable/BudgettingTable";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../src/redux/store";
import budgetDb from "../src/db/budgetDb";
import { loadBudgetState } from "../src/redux/budget/budgetSlice";

const Home: NextPage = () => {
  const dispatch = useDispatch();
  const selectedMonth = useSelector((state: RootState) => state.ui.month);
  useEffect(() => {
    (async () => {
      if (selectedMonth) {
        const monthlyRows = await budgetDb().get(selectedMonth);
        const repeatingRows = await budgetDb().get("repeating");

        dispatch(
          loadBudgetState({
            repeating: repeatingRows.budget,
            monthly: monthlyRows.budget,
          }),
        );
      }
    })();
  }, [selectedMonth]);

  return (
    <div>
      <Head>
        <title>Budjetti</title>
        <meta name="description" content="Lorem ipsum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MonthSelection />
      <h2 className="subtitle">Toistuvat kulut</h2>
      <NewCategoryBudgetInputGroup
        title="Lisää uusi toistuva kulu"
        budgetKey="repeating"
      />
      <BudgettingTable budgetKey="repeating" />
      <hr />
      <h2 className="subtitle">Pelkästään tässä kuussa tapahtuvat kulut</h2>
      <NewCategoryBudgetInputGroup
        title="Lisää kulu tälle kuukaudelle"
        budgetKey={selectedMonth}
      />
      <BudgettingTable budgetKey={selectedMonth} />
    </div>
  );
};

export default Home;
