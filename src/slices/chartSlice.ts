import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { AggregateOption } from '../common/common-types';

export interface ChartState {
  expenses: ChartPoint[];
  wages: ChartPoint[];
  finances: ChartPoint[];
  aggregateOption: AggregateOption;
  startTimeMs: number;
  endTimeMs: number;
}

export interface ChartPoint {
  date: number;
  amount: number;
}

const defaultEndDate = new Date();
defaultEndDate.setDate(defaultEndDate.getDate() + 7);

const initialState: ChartState = {
  expenses: [],
  wages: [],
  finances: [],
  aggregateOption: 'day',
  startTimeMs: Date.now(),
  endTimeMs: defaultEndDate.getTime(),
};

export type ChartDataLabel = 'expenses' | 'wages' | 'finances';

export const chartSlice = createSlice({
  name: 'chart',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setChartData: (state, action: PayloadAction<Partial<ChartState>>) => {
      if (action.payload.expenses) state.expenses = action.payload.expenses;
      if (action.payload.finances) state.finances = action.payload.finances;
      if (action.payload.wages) state.wages = action.payload.wages;
    },
    setAgggregateOption: (state, action: PayloadAction<AggregateOption>) => {
      state.aggregateOption = action.payload;
    },
    setStartTimeMs: (state, action: PayloadAction<number>) => {
      state.startTimeMs = action.payload;
    },
    setEndTimeMs: (state, action: PayloadAction<number>) => {
      state.endTimeMs = action.payload;
    },
  },
});

export const {
  setChartData,
  setAgggregateOption,
  setStartTimeMs,
  setEndTimeMs,
} = chartSlice.actions;

export const selectChartExpenses = (state: RootState) => state.chart.expenses;
export const selectChartWages = (state: RootState) => state.chart.wages;
export const selectChartFinances = (state: RootState) => state.chart.finances;
export const selectChartAgggregateOption = (state: RootState) =>
  state.chart.aggregateOption;
export const selectChartStartTimeMs = (state: RootState) =>
  state.chart.startTimeMs;
export const selectChartEndTimeMs = (state: RootState) => state.chart.endTimeMs;

export default chartSlice.reducer;
