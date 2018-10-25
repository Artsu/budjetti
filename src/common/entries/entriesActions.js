import Promise from 'bluebird'
import { DateTime } from 'luxon'

import entriesDB from './entriesDb'
import {ADD_ENTRIES, HILIGHT_ENTRIES, RECEIVE_ENTRIES, SELECT_MONTH, UPDATE_ENTRY} from '../constants'

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
        const selectedDate = DateTime.fromJSDate(getState().entries.selectedMonth)
        const entryDateTime = DateTime.fromJSDate(entry.date)
        return selectedDate.hasSame(entryDateTime, 'month') && entryDateTime.hasSame(entryDateTime, 'year')
      })
    })
    await dispatch({
      type: HILIGHT_ENTRIES,
      payload: entriesWithIds.map(entry => entry.id)
    })
  }
}

const loadEntriesForAMonth = (date) => {
  return async (dispatch) => {
    const allEntries = await entriesDB.getAll()

    await dispatch({
      type: SELECT_MONTH,
      payload: date,
    })

    await dispatch({
      type: RECEIVE_ENTRIES,
      payload: allEntries.filter(entry => {
        const dateTime = DateTime.fromJSDate(date)
        const entryDateTime = DateTime.fromJSDate(entry.date)
        return dateTime.hasSame(entryDateTime, 'month') && dateTime.hasSame(entryDateTime, 'year')
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

const updateCategory = (payload) => {
  return async (dispatch) => {
    const {id, category} = payload
    const entry = await entriesDB.get(id)
    entry.category = category
    await entriesDB.set(id, entry)

    await dispatch({
      type: UPDATE_ENTRY,
      payload: {id, ...entry},
    })
  }
}

const updateDate = (id, date) => {
  return async (dispatch) => {
    const entry = await entriesDB.get(id)
    entry.date = date
    await entriesDB.set(id, entry)

    await dispatch({
      type: UPDATE_ENTRY,
      payload: {id, ...entry},
    })
  }
}

export {
  addEntries,
  loadEntriesForAMonth,
  deleteEntry,
  updateCategory,
  updateDate,
}
