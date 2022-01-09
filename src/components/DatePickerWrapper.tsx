import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import { TextField } from '@mui/material';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
export interface DatePickerWrapperProps {
    value: number;
    label?: string;
    onChange: (date: number) => void;
}

export function DatePickerWrapper(props: DatePickerWrapperProps) {

    function handleChange(date: MaterialUiPickersDate) {
        if (date) {
            props.onChange(date.getTime());
        }
    }

    return <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MobileDatePicker
            label={props.label}
            inputFormat="MM/dd/yyyy"
            value={props.value}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
        />
    </LocalizationProvider>


}