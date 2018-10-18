import idb from 'idb'

const DB_NAME = 'entries'

const dbPromise = Promise.resolve(idb.open('entries-store', 1, upgradeDB => {
  upgradeDB.createObjectStore(DB_NAME, { autoIncrement : true })
}))

export default {
  get(key) {
    return dbPromise.then(db => {
      return db.transaction(DB_NAME)
        .objectStore(DB_NAME).get(key)
    })
  },
  set(key, val) {
    return dbPromise.then(db => {
      const tx = db.transaction(DB_NAME, 'readwrite')
      tx.objectStore(DB_NAME).put(val, key)
      return tx.complete
    })
  },
  delete(key) {
    return dbPromise.then(db => {
      const tx = db.transaction(DB_NAME, 'readwrite')
      tx.objectStore(DB_NAME).delete(key)
      return tx.complete
    })
  },
  clear() {
    return dbPromise.then(db => {
      const tx = db.transaction(DB_NAME, 'readwrite')
      tx.objectStore(DB_NAME).clear()
      return tx.complete
    })
  },
  add(val) {
    return dbPromise.then(db => {
      const tx = db.transaction(DB_NAME, 'readwrite')
      const entry = tx.objectStore(DB_NAME).add(val)
      return tx.complete.then(() => {
        return entry.request.result
      })
    })
  },
  getAll() {
    return dbPromise.then(db => {
      return new Promise((resolve) => {
        const tx = db.transaction(DB_NAME, 'readwrite')
        const objectStore = tx.objectStore(DB_NAME)
        const entries = []

        objectStore.iterateCursor((cursor) => {
          if (cursor) {
            const key = cursor.primaryKey
            const value = cursor.value
            entries.push({
              id: key,
              ...value,
            })
            return cursor.continue()
          } else {
            return tx.complete.then(() => {
              return resolve(entries)
            })
          }
        })
      })
    })
  },
  keys() {
    return dbPromise.then(db => {
      const tx = db.transaction(DB_NAME)
      const keys = []
      const store = tx.objectStore(DB_NAME);

      // This would be store.getAllKeys(), but it isn't supported by Edge or Safari.
      // openKeyCursor isn't supported by Safari, so we fall back
      (store.iterateKeyCursor || store.iterateCursor).call(store, cursor => {
        if (!cursor) return
        keys.push(cursor.key)
        cursor.continue()
      })

      return tx.complete.then(() => keys)
    })
  }
}