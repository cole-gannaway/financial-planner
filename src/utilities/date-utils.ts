import { AggregateOption } from '../common/common-types';

export const MILLIS_PER_WEEK = 1000 * 60 * 60 * 24 * 7;
export function createDateFromKey(
  key: string,
  aggregateOption: AggregateOption
) {
  let retVal;
  switch (aggregateOption) {
    case 'year':
      const createdDate = new Date('1-1-1970');
      // tslint:disable-next-line: radix
      const year = Number.parseInt(key);
      createdDate.setFullYear(year);
      retVal = createdDate;
      break;
    case 'month':
      retVal = new Date(key);
      break;
    case 'day':
      retVal = new Date(key);
      break;
  }
  return retVal;
}

export function createKeyByAggregateOptionAndDate(
  d: Date,
  aggregateOption: AggregateOption
) {
  switch (aggregateOption) {
    case 'year':
      return '' + d.getFullYear();
    case 'month':
      return '' + d.getFullYear() + '/' + getMonthInMMFormat(d.getMonth());
    case 'day':
      return (
        '' +
        d.getFullYear() +
        '/' +
        getMonthInMMFormat(d.getMonth()) +
        '/' +
        d.getDate()
      );
  }
}

export function getMonthInMMFormat(month: number) {
  const actualMonth = month + 1;
  if (actualMonth < 10) {
    return '0' + actualMonth.toString();
  } else {
    return actualMonth.toString();
  }
}
export function getDateinDDFormat(date: number) {
  if (date < 10) {
    return '0' + date.toString();
  } else {
    return date.toString();
  }
}
export function compareDates(a: Date, b: Date) {
  let compare = a.getFullYear() - b.getFullYear();
  if (compare === 0) {
    compare = a.getMonth() - b.getMonth();
  }
  if (compare === 0) {
    compare = a.getDate() - b.getDate();
  }
  return compare;
}
