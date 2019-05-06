import Promise from 'bluebird'
import { DateTime } from 'luxon'

import entriesDB from './entriesDb'
import {ADD_ENTRIES, HILIGHT_ENTRIES, RECEIVE_ENTRIES, UPDATE_ENTRY} from '../constants'

const addEntries = (entries) => {
  return async (dispatch, getState) => {
    const entriesWithIds = await Promise.map(entries, async (entry) => {
      const dbIndex = await entriesDB.add(entry)
      return {
        id: dbIndex,
        ...entry,
      }
    })

    await dispatch({
      type: ADD_ENTRIES,
      payload: entriesWithIds.filter(entry => {
        const entryDateTime = DateTime.fromJSDate(entry.date)
        return entryDateTime.toFormat('yyyy/MM') === getState().ui.month
      })
    })
    await dispatch({
      type: HILIGHT_ENTRIES,
      payload: entriesWithIds.map(entry => entry.id)
    })
  }
}

const loadEntriesForAMonth = (month) => {
  return async (dispatch) => {
    const allEntries = await entriesDB.getAll()

    await dispatch({
      type: RECEIVE_ENTRIES,
      payload: allEntries.filter(entry => {
        const entryDateTime = DateTime.fromJSDate(entry.date)
        return entryDateTime.toFormat('yyyy/MM') === month
      }),
    })
  }
}

const deleteEntry = (id) => {
  return async (dispatch) => {
    await entriesDB.delete(id)

    //TODO: Dispatch
  }
}

const updateEntry = (id, changedValues) => {
  return async (dispatch) => {
    const entry = {id, ...await entriesDB.get(id), ...changedValues}
    await entriesDB.set(id, entry)

    await dispatch({
      type: UPDATE_ENTRY,
      payload: entry,
    })
  }
}

export {
  addEntries,
  loadEntriesForAMonth,
  deleteEntry,
  updateEntry,
}
