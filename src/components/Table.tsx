import React from 'react';
import './Table.css'

import { IDataRow } from '../common/idatarow';
import { convertCSVRowIntoDataRow, convertDataRowIntoCSVRows, createCSV } from '../utilities/csv-utils'
import { IFrequency } from '../common/common-types';
import { DataRow } from './DataRow';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import { parse } from 'papaparse';


export interface ITableProps {
    title: string;
    data: { [id: string]: IDataRow; }
    addRow: (data?: IDataRow) => void;
    updateRow: (id: string, row: Partial<IDataRow>) => void;
    deleteRow: (id: string) => void;
    onImportComplete: (data: IDataRow[]) => void;
}
export function DataTable(props: ITableProps) {

    function handleAddRow() {
        props.addRow();
    }
    function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (evt) => {
                /* Parse data */
                const bstr = evt.target?.result;
                if (bstr) {
                    const rows = parse(bstr.toString());
                    const dataRows: IDataRow[] = []
                    for (let i = 1; i < rows.data.length; i++) {
                        const row = rows.data[i] as string[];
                        const dataRow = convertCSVRowIntoDataRow(row);
                        dataRows.push(dataRow);
                    }
                    props.onImportComplete(dataRows);
                }
            };
            reader.readAsBinaryString(file);
        }
    }
    function handleExport() {
        const filename = props.title;
        const csvRows = convertDataRowIntoCSVRows(Object.values(props.data));
        const csvContent = createCSV(csvRows);
        const link = document.createElement('a');
        link.setAttribute('href', csvContent);
        link.setAttribute('download', filename + ".csv");
        link.click();
        link.remove();
        // window.open(encodedUri);
    }

    return <div>
        <div style={{ textAlign: 'center' }}><h3>{props.title} <AddCircleOutlineIcon onClick={handleAddRow} /></h3></div>
        <div style={{ maxHeight: 400, overflowX: 'auto' }}>
            <Table stickyHeader >
                <TableHead>
                    <TableRow>
                        <TableCell>Label </TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Frequency</TableCell>
                        <TableCell>X</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody >
                    {Object.entries(props.data).map((entry) => {
                        const uuid = entry[0];
                        const row = entry[1];
                        return <DataRow key={uuid} uuid={uuid} data={props.data[uuid]} addRow={props.addRow} updateRow={props.updateRow} deleteRow={props.deleteRow}></DataRow>
                    })}
                </TableBody>
            </Table>
        </div>
        <input type="file" accept=".csv" onChange={handleImport} />
        <Button onClick={handleExport}>Export</Button>
    </div>
}

