import {DateTime} from 'luxon'

import {
  CHANGE_MONTH,
} from '../constants'

const defaultState = {
  month: DateTime.utc().toFormat('yyyy/MM'),
}

export default (state = defaultState, action) => {
  const { payload } = action

  switch (action.type) {
    case (CHANGE_MONTH):
      return {...state, month: payload}
  }

  return state
}