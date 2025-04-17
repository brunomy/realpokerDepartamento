import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function BasicDatePicker({ label, width, value = dayjs(), setValue }) {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker 
            label={label} 
            format="DD/MM/YYYY"
            sx={{ width: width || 300 }}
            value={dayjs(value, "DD/MM/YYYY")}
            onChange={(novaData) => {
              setValue(novaData);
            }}
            onChange={(novaData) => {
              setValue(novaData.format('DD/MM/YYYY'));
            }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}