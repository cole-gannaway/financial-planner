import { IDataRow } from '../common/idatarow';
import { AggregateOption, IFrequency } from '../common/common-types';
import { ChartPoint } from '../slices/chartSlice';
import {
  createDateFromKey,
  createKeyByAggregateOptionAndDate,
} from './date-utils';

export function convertDataRowsIntoChartData(
  expenses: IDataRow[],
  wages: IDataRow[],
  startDateMs: number,
  endDateMs: number,
  aggregateOption: AggregateOption
) {
  // project future chart points
  const allExpensesChartData: ChartPoint[] = [];
  const allWagesChartData: ChartPoint[] = [];
  expenses.forEach((val) =>
    allExpensesChartData.push(
      ...generateRecurringChartData(val, startDateMs, endDateMs)
    )
  );
  wages.forEach((val) =>
    allWagesChartData.push(
      ...generateRecurringChartData(val, startDateMs, endDateMs)
    )
  );

  // aggregate future points
  const aggregatedExpensesMap = aggregateChartDataByFrequency(
    allExpensesChartData,
    aggregateOption
  );
  const aggregatedWagesMap = aggregateChartDataByFrequency(
    allWagesChartData,
    aggregateOption
  );

  // convert aggregate maps to chart points
  const expensesChartPoints: ChartPoint[] = [];
  const wagesChartPoints: ChartPoint[] = [];

  aggregatedExpensesMap.forEach((value, key) => {
    const date = createDateFromKey(key, aggregateOption);
    expensesChartPoints.push({ date: date.getTime(), amount: value });
  });

  aggregatedWagesMap.forEach((value, key) => {
    const date = createDateFromKey(key, aggregateOption);
    wagesChartPoints.push({ date: date.getTime(), amount: value });
  });

  expensesChartPoints.sort((a, b) => a.date - b.date);
  wagesChartPoints.sort((a, b) => a.date - b.date);

  // combine points
  const financesChartData: ChartPoint[] = [
    ...expensesChartPoints,
    ...wagesChartPoints,
  ];

  // aggregate points
  const aggregatedFinancesMap = aggregateChartDataByFrequency(
    financesChartData,
    aggregateOption
  );

  // convert aggregate map to chart points
  const financesChartPoints: ChartPoint[] = [];
  aggregatedFinancesMap.forEach((value, key) => {
    const date = createDateFromKey(key, aggregateOption);
    financesChartPoints.push({ date: date.getTime(), amount: value });
  });
  financesChartPoints.sort((a, b) => a.date - b.date);

  // create running total of finances
  let sum = 0;
  financesChartPoints.forEach((point) => {
    sum += point.amount;
    point.amount = sum;
  });

  // return results
  return {
    expenses: expensesChartPoints,
    wages: wagesChartPoints,
    finances: financesChartPoints,
  };
}
function generateRecurringChartData(
  data: IDataRow,
  startDateMs: number,
  endDateMs: number
) {
  const date = new Date(data.date);
  const retVal: ChartPoint[] = [];
  if (data.frequency === 'once') {
    retVal.push({ date: date.getTime(), amount: data.amount });
  } else {
    let timeMs = date.getTime();
    while (!(timeMs > endDateMs)) {
      if (timeMs >= startDateMs) {
        retVal.push({ date: date.getTime(), amount: data.amount });
      }
      incrementDate(data.frequency, date);
      timeMs = date.getTime();
    }
  }
  return retVal;
}
function incrementDate(frequency: IFrequency, d: Date) {
  switch (frequency) {
    case 'daily':
      d.setDate(d.getDate() + 1);
      break;
    case 'weekly':
      d.setDate(d.getDate() + 7);
      break;
    case 'monthly':
      d.setMonth(d.getMonth() + 1);
      break;
    case 'yearly':
      d.setFullYear(d.getFullYear() + 1);
      break;
    default:
      break;
  }
}
function aggregateChartDataByFrequency(
  data: ChartPoint[],
  aggregateOption: AggregateOption
) {
  const map: Map<string, number> = new Map<string, number>();
  data.forEach((val) => {
    const key = createKeyByAggregateOptionAndDate(
      new Date(val.date),
      aggregateOption
    );
    if (key) {
      const value = map.get(key);
      const sum = value ? value : 0;
      map.set(key, sum + val.amount);
    }
  });
  return map;
}
