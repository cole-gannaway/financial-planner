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

import { TourProvider } from '@reactour/tour'

const steps = [
  {
    selector: ".title",
    content: () =>
      <div>
        <p>
          While most websites merely display your <b>PAST</b> purchases, we empower you to take control of your financial <b>FUTURE</b> by providing accurate projections based on your recurring income and expenses. Say goodbye to uncertainty and welcome a brighter financial tomorrow.
        </p>
      </div>,
  },
  {
    selector: ".chartContainer",
    content: () =>
      <div>
        <p>
          Visualize your progress like never before! Our platform presents <b>stunning visuals</b> that enable you to track your net worth over time. Witness the transformation of your financial landscape with ease and clarity.
        </p>
      </div>,
  },
  {
    selector: ".incomeAndExpensesTable",
    content: () =>
      <div>
        <p>
          Input your recurring <b>income</b> and <b>expenses</b> below. Worried about data security? All your sensitive data remains securely stored on your local computer, ensuring the utmost privacy
        </p>
      </div>,
  },
  {
    selector: ".chartConfiguration",
    content: () =>
      <div>
        <p>
          Project your your <b>net worth</b> over time by simply adjusting the <b>start</b> and <b>end</b> date of the chart.
        </p>
      </div>,
  },
  {
    selector: ".exportContainer",
    content: () =>
      <div>
        <p>
          Effortlessly <b>save</b> your work to a .csv file, compatible with Microsoft Excel. <br></br>
          Again, all data is stored locally, ensuring you have control over your own data.
        </p>
      </div>,
  }
]

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
    <div style={{marginLeft: "2rem", marginRight: "2rem"}}>
    <TourProvider
      steps={steps}
      defaultOpen={true}
      scrollSmooth={true}
    >
    <div style={{ textAlign: 'center', minWidth: 700 }}><h1 className="title">Financial Planner</h1></div>
    <div style={{ textAlign: 'center', minWidth: 700 }}>
      <DataChart></DataChart>
    </div>
    <div className="incomeAndExpensesTable">
      <div style={{ textAlign: 'center', minWidth: 700 }}>
        <DataTable title={"Income"} data={wages} addRow={handleCreateWage} updateRow={handleUpdateWage} deleteRow={handleRemoveWage} onImportComplete={handleImportWagesComplete} isExpensesTable={false}></DataTable>
      </div>
      <div style={{ textAlign: 'center', minWidth: 700 }}>
        <DataTable title={"Expenses"} data={expenses} addRow={handleCreateExpense} updateRow={handleUpdateExpense} deleteRow={handleRemoveExpense} onImportComplete={handleImportExpensesComplete} isExpensesTable={true}></DataTable>
      </div>
    </div>
    <br></br>
    <br></br>
    <br></br>
    </TourProvider>
  </div>
  );
}

export default App;
