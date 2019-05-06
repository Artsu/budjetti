import {CHANGE_MONTH} from '../constants'

const updateSelectedMonth = (month) => {
  return async (dispatch) => {
    dispatch({
      type: CHANGE_MONTH,
      payload: month,
    })
  }
}

export {
  updateSelectedMonth,
}
