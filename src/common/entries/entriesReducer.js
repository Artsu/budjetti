import orderBy from 'lodash/orderBy'
import cloneDeep from 'lodash/cloneDeep'

import {
  ADD_ENTRIES,
  RECEIVE_ENTRIES,
  SELECT_MONTH,
  HILIGHT_ENTRIES,
  UPDATE_ENTRY,
} from '../constants'

const defaultState = {
  items: [],
  hilightedItems: [],
  selectedMonth: new Date(),
}

export default (state = defaultState, action) => {
  const { payload } = action

  switch (action.type) {
    case (ADD_ENTRIES):
      const updatedItems = [...payload, ...state.items]
      return {...state, items: orderBy(updatedItems, ['date'], ['desc'])}
    case (RECEIVE_ENTRIES):
      return {...state, items: orderBy(payload, ['date'], ['desc'])}
    case (SELECT_MONTH):
      return {...state, selectedMonth: payload}
    case HILIGHT_ENTRIES:
      return {...state, hilightedItems: payload}
    case UPDATE_ENTRY:
      const newState = cloneDeep(state)
      const updatedItemIndex = newState.items.findIndex(item => item.id === payload.id)
      newState.items[updatedItemIndex] = payload
      return newState
  }

  return state
}