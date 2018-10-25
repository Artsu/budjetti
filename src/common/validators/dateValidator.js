import DateTime from 'luxon/src/datetime'
import isEmpty from 'lodash/isEmpty'

export const getDateFormat = (value) => {
  return value.match(/^\d{2}\.\d{2}\.$/) ? 'dd.MM.' : 'dd.MM.yyyy'
}

export const dateInputValidator = (value) => {
  const format = getDateFormat(value)
  return !(DateTime.fromFormat(value, format).isValid || isEmpty(value))
}