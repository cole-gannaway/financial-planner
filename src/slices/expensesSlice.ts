import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { Expense } from '../common/expense';
import { v4 as uuid } from 'uuid';

export interface ExpensesState {
  [id: string]: Expense;
}

const initialState: ExpensesState = {
  "077c4cfc-aae7-4b3a-8e93-911640aa0121": {
    "label": "Rent",
    "date": 1685674404000,
    "amount": -2000,
    "frequency": "monthly"
  },
  "81026ad5-10f7-447b-8646-39e0df49dcca": {
    "label": "Gym",
    "date": 1685674415000,
    "amount": -100,
    "frequency": "monthly"
  }
};

export const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addExpense: (state, action: PayloadAction<Expense | null>) => {
      const id = uuid();
      if (action.payload) {
        state[id] = action.payload;
      } else {
        const defaultExpense: Expense = {
          label: '',
          date: Date.now(),
          amount: 0,
          frequency: 'once',
        };
        state[id] = defaultExpense;
      }
    },
    bulkAddExpenses: (state, action: PayloadAction<Expense[]>) => {
      action.payload.forEach((expense) => {
        const id = uuid();
        state[id] = expense;
      });
    },
    updateExpense: (
      state,
      action: PayloadAction<{ id: string; expense: Partial<Expense> }>
    ) => {
      const orig = state[action.payload.id];
      const update = action.payload.expense;
      // hard-code the updated fields
      if (update.amount !== undefined) orig.amount = update.amount;
      if (update.date !== undefined) orig.date = update.date;
      if (update.frequency !== undefined) orig.frequency = update.frequency;
      if (update.label !== undefined) orig.label = update.label;
    },
    removeExpense: (state, action: PayloadAction<{ id: string }>) => {
      delete state[action.payload.id];
    },
  },
});

export const { addExpense, bulkAddExpenses, updateExpense, removeExpense } =
  expensesSlice.actions;

export const selectExpenses = (state: RootState) => state.expenses;

export default expensesSlice.reducer;
