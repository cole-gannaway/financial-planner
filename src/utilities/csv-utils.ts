import { IDataRow } from '../common/idatarow';
import { IFrequency } from '../common/common-types';

export function createCSV(rows: string[][]) {
  let csvContent =
    'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n');
  return csvContent;
}

export function convertDataRowIntoCSVRows(dataRows: IDataRow[]) {
  const csvRows = dataRows.map((dataRow) => {
    const row: string[] = [];
    row.push(dataRow.label);
    row.push(dataRow.date.toString());
    row.push(dataRow.amount.toString());
    row.push(dataRow.frequency);
    return row;
  });
  const headerRow = ['label', 'date', 'amount', 'frequency'];
  csvRows.unshift(headerRow);
  return csvRows;
}

export function convertCSVRowIntoDataRow(csvRow: string[]) {
  const label = csvRow[0];
  const date: number = parseInt(csvRow[1]);
  const amount: number = parseFloat(csvRow[2]);
  const freqency = csvRow[3] as IFrequency;
  const result: IDataRow = {
    label: label,
    date: !isNaN(date) ? date : -1,
    amount: !isNaN(amount) ? amount : -1,
    frequency: freqency,
  };
  return result;
}
