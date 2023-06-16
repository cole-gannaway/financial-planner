import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import expensesReducer from '../slices/expensesSlice';
import wagesReducer from '../slices/wagesSlice';
import chartReducer from '../slices/chartSlice';

export const store = configureStore({
  reducer: {
    expenses: expensesReducer,
    wages: wagesReducer,
    chart: chartReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

