
import { DatePickerWrapper } from './DatePickerWrapper';
import { IDataRow } from '../common/idatarow';
import { IFrequency } from '../common/common-types';

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormControl, MenuItem, Select, TextField } from '@mui/material';

export interface IDataRowProps {
    uuid: string;
    data: IDataRow;
    isExpensesRow: boolean;
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
            <TextField type="number" inputProps={{ pattern:"[0-9]*"}} variant="outlined" value={props.isExpensesRow? (-1 * props.data.amount) : props.data.amount} onChange={(e) => {
                const amount = parseFloat(e.target.value);
                if (amount) props.updateRow(props.uuid, { amount: props.isExpensesRow? (-1 * amount) : amount });
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