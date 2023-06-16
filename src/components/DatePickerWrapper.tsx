import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers';

export interface DatePickerWrapperProps {
    value: number;
    label?: string;
    onChange: (date: number) => void;
}

export interface DatePickerWrapperMinProps extends DatePickerWrapperProps {
    minDate:number;
}

export interface DatePickerWrapperMaxProps extends DatePickerWrapperProps {
    maxDate:number;
}

export function DatePickerWrapper(props: DatePickerWrapperProps) {

    function handleChange(date: any) {
        if (date) {
            const newDate = date.valueOf();
            props.onChange(newDate);
        }
    }

    return <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DemoContainer components={['DatePicker']}>
        <MobileDatePicker value={dayjs(props.value)} onChange={handleChange} closeOnSelect={true} />
    </DemoContainer>
  </LocalizationProvider>


}

export function DatePickerWrapperMin(props: DatePickerWrapperMinProps) {

    function handleChange(date: any) {
        if (date) {
            const newDate = date.valueOf();
            props.onChange(newDate);
        }
    }

    return <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DemoContainer components={['DatePicker']}>
        <MobileDatePicker value={dayjs(props.value)} onChange={handleChange} minDate={dayjs(props.minDate)} label={props.label} closeOnSelect={true} />
    </DemoContainer>
  </LocalizationProvider>


}

export function DatePickerWrapperMax(props: DatePickerWrapperMaxProps) {

    function handleChange(date: any) {
        if (date) {
            const newDate = date.valueOf();
            props.onChange(newDate);
        }
    }

    return <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DemoContainer components={['DatePicker']}>
        <MobileDatePicker value={dayjs(props.value)} onChange={handleChange} maxDate={dayjs(props.maxDate)} label={props.label} closeOnSelect={true} />
    </DemoContainer>
  </LocalizationProvider>


}