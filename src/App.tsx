import React from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { addExpense, bulkAddExpenses, removeExpense, selectExpenses, updateExpense } from './slices/expensesSlice';
import { addWage, bulkAddWages, removeWage, selectWages, updateWage } from './slices/wagesSlice';
import { Expense } from './common/expense';
import { Wage } from './common/wage';
import { DataTable } from './components/Table';
import DataChart from './components/DataChart';
import { selectChartEndTimeMs, selectChartStartTimeMs, setEndTimeMs, setStartTimeMs } from './slices/chartSlice';
import { IDataRow } from './common/idatarow';


function App() {
  const expenses = useAppSelector(selectExpenses);
  const wages = useAppSelector(selectWages);

  const startTimeMs = useAppSelector(selectChartStartTimeMs);
  const endTimeMs = useAppSelector(selectChartEndTimeMs);

  const dispatch = useAppDispatch();
  function handleCreateExpense(expense?: Expense) {
    dispatch(addExpense(expense ? expense : null))
  }
  function handleCreateWage(wage?: Wage) {
    dispatch(addWage(wage ? wage : null))
  }

  function handleUpdateWage(id: string, wage: Partial<Wage>) {
    dispatch(updateWage({ id: id, wage: wage }))
    if (wage.date) handleChartDateChange(wage.date)
  }

  function handleUpdateExpense(id: string, expense: Partial<Expense>) {
    dispatch(updateExpense({ id: id, expense: expense }))
    if (expense.date) handleChartDateChange(expense.date);
  }

  /** Changes the chart date start and end time if the data changes */
  function handleChartDateChange(newDate: number){
    if (newDate < startTimeMs) dispatch(setStartTimeMs(newDate));
    if (newDate > endTimeMs)  dispatch(setEndTimeMs(newDate));
  }

  function handleRemoveWage(id: string) {
    dispatch(removeWage({ id: id }))
  }

  function handleRemoveExpense(id: string) {
    dispatch(removeExpense({ id: id }))
  }

  function handleImportExpensesComplete(data: IDataRow[]) {
    const expensesTimeArr = Object.values(data).map((val) => val.date);
    const minTime = Math.min(...expensesTimeArr);
    const maxTime = Math.max(...expensesTimeArr);
    dispatch(bulkAddExpenses(data));
    dispatch(setStartTimeMs(Math.min(startTimeMs, minTime)));
    dispatch(setEndTimeMs(Math.max(endTimeMs, maxTime)));
  }

  function handleImportWagesComplete(data: IDataRow[]) {
    const wagesTimeArr = Object.values(data).map((val) => val.date);
    const minTime = Math.min(...wagesTimeArr);
    const maxTime = Math.max(...wagesTimeArr);
    dispatch(bulkAddWages(data));
    dispatch(setStartTimeMs(Math.min(startTimeMs, minTime)));
    dispatch(setEndTimeMs(Math.max(endTimeMs, maxTime)));
  }

  return (
    <div>
      <div style={{ textAlign: 'center', minWidth: 700 }}><h1>Financial Planner</h1></div>
      <div style={{ textAlign: 'center', minWidth: 700 }}>
        <DataChart></DataChart>
      </div>
      <div style={{ textAlign: 'center', minWidth: 700 }}>
        <DataTable title={"Income"} data={wages} addRow={handleCreateWage} updateRow={handleUpdateWage} deleteRow={handleRemoveWage} onImportComplete={handleImportWagesComplete}></DataTable>
      </div>
      <div style={{ textAlign: 'center', minWidth: 700 }}>
        <DataTable title={"Expenses"} data={expenses} addRow={handleCreateExpense} updateRow={handleUpdateExpense} deleteRow={handleRemoveExpense} onImportComplete={handleImportExpensesComplete}></DataTable>
      </div>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
}

export default App;
