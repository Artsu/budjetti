import { openDB } from "idb";
import { useEffect, useState } from "react";
import { Budget } from "../redux/budget/budgetSlice";

const DB_NAME = "budget";

interface BudgetDb {
  get: (key: string) => Promise<{ key: string; budget: Budget[] }>;
  set: (val: any) => void;
  getAll: () => any;
}

let db: BudgetDb;

const getBudgetDb = () => {
  if (db) {
    return db;
  }

  const dbPromise = openDB("budget-store", 1, {
    upgrade: (upgradeDB) => {
      upgradeDB.createObjectStore(DB_NAME, { keyPath: "key" });
    },
  });

  db = {
    get(key: string) {
      return dbPromise.then((db) => {
        return db
          .transaction(DB_NAME)
          .objectStore(DB_NAME)
          .get(key) as Promise<{ key: string; budget: Budget[] }>;
      });
    },
    set(val: any) {
      return dbPromise.then((db) => {
        const tx = db.transaction(DB_NAME, "readwrite");
        tx.objectStore(DB_NAME).put(val);
        return tx.done;
      });
    },
    getAll() {
      return dbPromise.then((db) => {
        const tx = db.transaction(DB_NAME, "readwrite");
        return tx.objectStore(DB_NAME).getAll();
      });
    },
  };

  return db;
};
export default getBudgetDb;
