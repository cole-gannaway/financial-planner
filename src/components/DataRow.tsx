
import { DatePickerWrapper } from './DatePickerWrapper';
import { IDataRow } from '../common/idatarow';
import { IFrequency } from '../common/common-types';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import { MenuItem } from "@material-ui/core";
import { TextField } from '@material-ui/core';
import { useState } from 'react';

export interface IDataRowProps {
    uuid: string;
    data: IDataRow;
    addRow: (data?: IDataRow) => void;
    updateRow: (id: string, row: Partial<IDataRow>) => void;
    deleteRow: (id: string) => void;
}
export function DataRow(props: IDataRowProps) {
    const [label, setLabel] = useState(props.data.label);
    const [date, setDate] = useState(props.data.date);
    const [amount, setAmount] = useState(props.data.amount);
    const [frequency, setFrequency] = useState(props.data.frequency);

    function handleDateChange() {
        props.updateRow(props.uuid, {
            label: label,
            date: date,
            amount: amount,
            frequency: frequency
        });
    }

    return <TableRow>
        <TableCell className="label-form"><TextField value={props.data.label} onChange={(e) => setLabel(e.target.value)}></TextField></TableCell>
        <TableCell className="label-date">
            <DatePickerWrapper value={props.data.date} label={"Date"} onChange={(date: number) => setDate(date)}></DatePickerWrapper>
        </TableCell>
        <TableCell>
            <TextField type="number" value={props.data.amount} onChange={(e) => {
                const amount = parseFloat(e.target.value);
                if (amount) setAmount(amount);
            }}></TextField>
        </TableCell>
        <TableCell>
            <TextField
                id="select-frequency"
                select
                label="Frequency"
                value={props.data.frequency}
                onChange={(e) => setFrequency(e.target.value as IFrequency)}
                onMouseLeave={handleDateChange}
                margin="normal"
            >
                <MenuItem value='once'>Once</MenuItem>
                <MenuItem value='daily'>Daily</MenuItem>
                <MenuItem value='weekly'>Weekly</MenuItem>
                <MenuItem value='monthly'>Monthly</MenuItem>
                <MenuItem value='yearly'>Yearly</MenuItem>
            </TextField>
        </TableCell>
        <TableCell onClick={() => props.deleteRow(props.uuid)}><DeleteIcon /></TableCell>
    </TableRow>
}