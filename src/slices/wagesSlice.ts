import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { Wage } from '../common/wage';
import { uuid } from 'uuidv4';

export interface WagesState {
  [id: string]: Wage;
}

const initialState: WagesState = {};

export const wageSlice = createSlice({
  name: 'wage',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addWage: (state, action: PayloadAction<Wage | null>) => {
      const id = uuid();
      if (action.payload) {
        state[id] = action.payload;
      } else {
        const defaultWage: Wage = {
          label: '',
          date: Date.now(),
          amount: 0,
          frequency: 'once',
        };
        state[id] = defaultWage;
      }
    },
    bulkAddWages: (state, action: PayloadAction<Wage[]>) => {
      action.payload.forEach((wage) => {
        const id = uuid();
        state[id] = wage;
      });
    },
    updateWage: (
      state,
      action: PayloadAction<{ id: string; wage: Partial<Wage> }>
    ) => {
      const orig = state[action.payload.id];
      const update = action.payload.wage;
      // hard-code the updated fields
      if (update.amount !== undefined) orig.amount = update.amount;
      if (update.date !== undefined) orig.date = update.date;
      if (update.frequency !== undefined) orig.frequency = update.frequency;
      if (update.label !== undefined) orig.label = update.label;
    },
    removeWage: (state, action: PayloadAction<{ id: string }>) => {
      delete state[action.payload.id];
    },
  },
});

export const { addWage, bulkAddWages, updateWage, removeWage } =
  wageSlice.actions;

export const selectWages = (state: RootState) => state.wages;

export default wageSlice.reducer;
