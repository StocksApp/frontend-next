import { isBefore, isValid } from 'date-fns';

export const validateDatesOrder = (
  earlierDate: Date,
  laterDate: Date,
  errorMessage?: string
) => {
  return isBefore(earlierDate, laterDate) || errorMessage;
};

export const validateDate = (date: Date, errorMessage?: string) => {
  return isValid(date) || errorMessage;
};
