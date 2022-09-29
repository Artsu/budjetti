import { openDB } from "idb";
import { Entry } from "../common/types";

const DB_NAME = "entries";

interface EntriesDb {
  get: (key: string) => Promise<Entry>;
  set: (key: string, val: Entry) => void;
  delete: (key: string) => void;
  getAll: () => Promise<Entry[]>;
  add: (entry: Entry) => Promise<Entry>;
}

let db: EntriesDb;

const getEntriesDb = () => {
  if (db) {
    return db;
  }

  const dbPromise = openDB("entries-store", 1, {
    upgrade: (upgradeDB) => {
      upgradeDB.createObjectStore(DB_NAME, { autoIncrement: true });
    },
  });

  db = {
    get(key) {
      return dbPromise.then((db) => {
        return db.transaction(DB_NAME).objectStore(DB_NAME).get(key);
      });
    },
    set(key: string, val: Entry) {
      return dbPromise.then((db) => {
        const tx = db.transaction(DB_NAME, "readwrite");
        tx.objectStore(DB_NAME).put(val, key);
        return tx.done;
      });
    },
    delete(key: string) {
      return dbPromise.then((db) => {
        const tx = db.transaction(DB_NAME, "readwrite");
        tx.objectStore(DB_NAME).delete(key);
        return tx.done;
      });
    },
    // clear() {
    //   return dbPromise.then((db) => {
    //     const tx = db.transaction(DB_NAME, "readwrite");
    //     tx.objectStore(DB_NAME).clear();
    //     return tx.done;
    //   });
    // },
    async add(entry: Entry) {
      const db = await dbPromise;
      const tx = db.transaction(DB_NAME, "readwrite");
      const id = (await tx.objectStore(DB_NAME).add(entry)) as string;
      await tx.done;
      return { id, ...entry };
    },
    async getAll() {
      const db = await dbPromise;
      const tx = db.transaction(DB_NAME, "readwrite");
      const objectStore = tx.objectStore(DB_NAME);
      let cursor = await objectStore.openCursor();
      const entries: Entry[] = [];
      while (cursor) {
        const key = cursor.primaryKey;
        const value = cursor.value;
        entries.push({
          id: key,
          ...value,
        });
        cursor = await cursor.continue();
      }
      return entries;
    },
    // keys() {
    //   return dbPromise.then((db) => {
    //     const tx = db.transaction(DB_NAME);
    //     const keys = [];
    //     const store = tx.objectStore(DB_NAME);
    //
    //     // This would be store.getAllKeys(), but it isn't supported by Edge or Safari.
    //     // openKeyCursor isn't supported by Safari, so we fall back
    //     (store.iterateKeyCursor || store.iterateCursor).call(
    //       store,
    //       (cursor) => {
    //         if (!cursor) return;
    //         keys.push(cursor.key);
    //         cursor.continue();
    //       },
    //     );
    //
    //     return tx.complete.then(() => keys);
    //   });
    // },
  };

  return db;
};
export default getEntriesDb;
