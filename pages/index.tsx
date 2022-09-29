import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect } from "react";
import MonthSelection from "../src/components/MonthSelection/MonthSelection";
import MonthlySummary from "../src/components/MonthlySummary/MonthlySummary";
import NewCategoryBudgetInputGroup from "../src/components/NewCategoryBudgetInputGroup/NewCategoryBudgetInputGroup";
import BudgettingTable from "../src/components/BudgettingTable/BudgettingTable";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../src/redux/store";
import { loadEntriesState } from "../src/redux/entries/entriesSlice";
import RowsInput from "../src/components/RowsInput/RowsInput";
import NewEntryInputGroup from "../src/components/NewEntryInputGroup/NewEntryInputGroup";
import entriesDb from "../src/db/entriesDb";
import ExpensesTable from "../src/components/ExpensesTable/ExpensesTable";

const Home: NextPage = () => {
  const dispatch = useDispatch();
  const selectedMonth = useSelector((state: RootState) => state.ui.month);
  const entries = useSelector((state: RootState) => state.entries.items);
  useEffect(() => {
    (async () => {
      if (selectedMonth) {
        const allEntries = await entriesDb().getAll();

        dispatch(loadEntriesState({ items: allEntries, hilightedItems: [] }));
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
      <MonthlySummary />
      <hr />
      <RowsInput />
      <NewEntryInputGroup />
      <ExpensesTable entries={entries} />
    </div>
  );
};

export default Home;
