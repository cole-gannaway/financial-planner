import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { Expense } from '../common/expense';
import { uuid } from 'uuidv4';

export interface ExpensesState {
  [id: string]: Expense;
}

const initialState: ExpensesState = {};

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
