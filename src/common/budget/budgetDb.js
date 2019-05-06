import idb from 'idb'

const DB_NAME = 'budget'

const dbPromise = Promise.resolve(idb.open('budget-store', 1, upgradeDB => {
  upgradeDB.createObjectStore(DB_NAME, {keyPath: 'key'})
}))

export default {
  get(key) {
    return dbPromise.then(db => {
      return db.transaction(DB_NAME)
        .objectStore(DB_NAME).get(key)
    })
  },
  set(val) {
    return dbPromise.then(db => {
      const tx = db.transaction(DB_NAME, 'readwrite')
      tx.objectStore(DB_NAME).put(val)
      return tx.complete
    })
  },
  getAll() {
    return dbPromise.then(db => {
      const tx = db.transaction(DB_NAME, 'readwrite')
      return tx.objectStore(DB_NAME).getAll()
    })
  },
}