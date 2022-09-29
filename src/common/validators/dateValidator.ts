import { DateTime } from "luxon";
import isEmpty from "lodash/isEmpty";

export const getDateFormat = (value: string) => {
  return value.match(/^\d{2}\.\d{2}\.$/) ? "dd.MM." : "dd.MM.yyyy";
};

export const dateInputValidator = (value: string) => {
  const format = getDateFormat(value);
  return DateTime.fromFormat(value, format).isValid && !isEmpty(value);
};
