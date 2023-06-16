import React, { useEffect, useRef } from "react";
import 'chartjs-adapter-moment';
import { Chart, Legend, LineController, LineElement, PointElement, LinearScale, TimeScale, Title, Tooltip } from 'chart.js';
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectChartExpenses, selectChartFinances, selectChartAgggregateOption, selectChartWages, setChartData, setAgggregateOption, selectChartStartTimeMs, selectChartEndTimeMs, setStartTimeMs, setEndTimeMs } from "../slices/chartSlice";
import { AggregateOption } from "../common/common-types";
import { selectExpenses } from "../slices/expensesSlice";
import { selectWages } from "../slices/wagesSlice";
import { convertDataRowsIntoChartData } from "../utilities/chart-utils";
import { DatePickerWrapperMax, DatePickerWrapperMin } from "./DatePickerWrapper";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
Chart.register(Legend, LineController, LineElement, PointElement, LinearScale, TimeScale, Title, Tooltip);

const chartConfig: any = {
    type: 'line',
    data: {
        datasets: [
            {
                label: 'Net Worth',
                fill: true,
                backgroundColor: "rgb(150, 105, 25, 0.8)",
                borderColor: "rgb(150, 105, 25, 1)",
                data: [],
            },
            {
                label: 'Income',
                fill: true,
                backgroundColor: "rgba(63, 195, 128, 0.8)",
                borderColor: "rgba(63, 195, 128, 1)",
                data: [],
            },
            {
                label: 'Expenses',
                fill: true,
                backgroundColor: "rgba(255, 99, 132, 0.8)",
                borderColor: "rgba(255, 99, 132, 1)",
                data: [],
            },
        ]
    },
    options: {
        responsive: true,
        // responsive: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Finances'
            }
        },
        scales: {
            x: {
                type: 'time',
                distribution: 'series'
            },
            y: {
                type: 'linear'
            }
        }
    },

};

interface ChartJSPoint {
    x: Date,
    y: number
}
export default function DataChart() {
    const dispatch = useAppDispatch();
    // canvas variable for ChartJs
    const chartContainer = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<Chart | null>(null);

    const expensesData = useAppSelector(selectExpenses);
    const wagesData = useAppSelector(selectWages);

    const startTimeMs = useAppSelector(selectChartStartTimeMs);
    const endTimeMs = useAppSelector(selectChartEndTimeMs);

    const expenses = useAppSelector(selectChartExpenses);
    const finances = useAppSelector(selectChartFinances);
    const wages = useAppSelector(selectChartWages);
    const aggregateOption = useAppSelector(selectChartAgggregateOption);

    // creates canvas for ChartJs
    useEffect(() => {
        if (chartContainer && chartContainer.current) {
            chartInstance.current = new Chart(chartContainer.current, chartConfig);
        }
        return () => {
            if (chartInstance && chartInstance.current) {
                chartInstance.current.destroy();
            }
        }
    }, [chartContainer]);

    // listens to updates on chart data and updates the canvas
    useEffect(() => {
        if (chartInstance && chartInstance.current) {
            const finanacesPoints: ChartJSPoint[] = finances.map((point) => {
                return { x: new Date(point.date), y: point.amount };
            })
            const wagesPoints: ChartJSPoint[] = wages.map((point) => {
                return { x: new Date(point.date), y: point.amount };
            })
            const expensesPoints: ChartJSPoint[] = expenses.map((point) => {
                return { x: new Date(point.date), y: point.amount };
            })
            chartInstance.current.data.datasets[0].data = finanacesPoints as any;
            chartInstance.current.data.datasets[1].data = wagesPoints as any;
            chartInstance.current.data.datasets[2].data = expensesPoints as any;

            chartInstance.current.update();
        }
        return () => {

        }
    }, [expenses, wages, finances, aggregateOption])

    // leverage React to listen to changes in state and convert to chart data accordingly
    useEffect(() => {
        const chartData = convertDataRowsIntoChartData(Object.values(expensesData), Object.values(wagesData), startTimeMs, endTimeMs, aggregateOption);
        dispatch(setChartData({
            expenses: chartData.expenses,
            wages: chartData.wages,
            finances: chartData.finances
        }))

    }, [dispatch, wagesData, expensesData, aggregateOption, startTimeMs, endTimeMs])

    function handleAggregateOptionChange(event: any) {
        const option: AggregateOption = event.target.value as AggregateOption;
        dispatch(setAgggregateOption(option));
    }

    function handleStartTimeChange(date: number) {
        if (date > endTimeMs){
            console.log("Don't pick a time before ")
        } else {
            dispatch(setStartTimeMs(date));
        }
    }
    function handleEndTimeChange(date: number) {
        dispatch(setEndTimeMs(date));
    }

    return (
        <div>
            <div style={{display: "flex", justifyContent: "center", alignContent: "center", margin:"10px"}} className="chartConfiguration">
                <div style={{width:200, margin:"10px"}}><DatePickerWrapperMax value={startTimeMs} label={"Start Time"} onChange={handleStartTimeChange} maxDate={endTimeMs}></DatePickerWrapperMax></div>
                <div style={{width:200, margin:"10px"}}><DatePickerWrapperMin value={endTimeMs} label={"End Time"} onChange={handleEndTimeChange} minDate={startTimeMs}></DatePickerWrapperMin></div>
                <div style={{width:100, margin:"10px", transform: "translate(0,10px)"}}>
                    <FormControl 
                    style={{width:"100%"}}>
                        <InputLabel id="aggregate-by-label">Aggregate</InputLabel>
                        <Select
                            labelId="aggregate-by-label"
                            id="aggregate-by"
                            label="Aggregate"
                            value={aggregateOption}
                            onChange={handleAggregateOptionChange}
                        >
                            <MenuItem value={"day"}>Day</MenuItem>
                            <MenuItem value={"month"}>Month</MenuItem>
                            <MenuItem value={"year"}>Year</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
            <div className="chartContainer" style={{maxWidth:1000, margin:"0 auto"}}>
                <div style={{ display:"block"}} >
                    <canvas  ref={chartContainer} />
                </div>
            </div>
        </div>
    );
};
