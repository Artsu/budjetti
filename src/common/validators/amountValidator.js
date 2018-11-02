
export const amountInputValidator = (value) => {
  console.log('value', value)
  console.log('value.match(/^-?\d+(\.\d{1,2})?$/)', value.match(/^-?\d+(\.\d{1,2})?$/))
  return value.match(/^-?\d+(\.\d{1,2})?$/)
}