import { IFrequency } from './common-types';

export interface IDataRow {
  label: string;
  amount: number;
  date: number;
  frequency: IFrequency;
}
