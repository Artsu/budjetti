
export const amountInputValidator = (value) => {
  return value.match(/^-?\d+(\.\d{1,2})?$/)
}