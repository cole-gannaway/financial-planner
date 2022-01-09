
import { DatePickerWrapper } from './DatePickerWrapper';
import { IDataRow } from '../common/idatarow';
import { IFrequency } from '../common/common-types';

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import { MenuItem } from "@material-ui/core";
import { TextField } from '@material-ui/core';
import { FormControl, InputLabel, Select } from '@mui/material';

export interface IDataRowProps {
    uuid: string;
    data: IDataRow;
    addRow: (data?: IDataRow) => void;
    updateRow: (id: string, row: Partial<IDataRow>) => void;
    deleteRow: (id: string) => void;
}
export function DataRow(props: IDataRowProps) {
    return <TableRow>
        <TableCell className="label-form"><TextField variant="outlined" value={props.data.label} onChange={(e) => props.updateRow(props.uuid, { label: e.target.value })}></TextField></TableCell>
        <TableCell className="label-date">
            <DatePickerWrapper value={props.data.date} onChange={(date: number) => props.updateRow(props.uuid, { date: date })}></DatePickerWrapper>
        </TableCell>
        <TableCell>
            <TextField type="number" variant="outlined" value={props.data.amount} onChange={(e) => {
                const amount = parseFloat(e.target.value);
                if (amount) props.updateRow(props.uuid, { amount: amount });
            }}></TextField>
        </TableCell>
        <TableCell>
            <FormControl fullWidth>
                <Select
                    value={props.data.frequency}
                    onChange={(e) => props.updateRow(props.uuid, { frequency: e.target.value as IFrequency })}
                >
                    <MenuItem value='once'>Once</MenuItem>
                    <MenuItem value='daily'>Daily</MenuItem>
                    <MenuItem value='weekly'>Weekly</MenuItem>
                    <MenuItem value='monthly'>Monthly</MenuItem>
                    <MenuItem value='yearly'>Yearly</MenuItem>
                </Select>
            </FormControl>
        </TableCell>
        <TableCell onClick={() => props.deleteRow(props.uuid)}><DeleteIcon /></TableCell>
    </TableRow>
}