import { useState,useEffect } from 'react';
import { LicenseInfo } from '@mui/x-license';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { Box, Typography } from '@mui/material';
// LicenseInfo.setLicenseKey('61628ce74db2c1b62783a6d438593bc5Tz1NVUktRG9jLEU9MTY4MzQ0NzgyMTI4NCxTPXByZW1pdW0sTE09c3Vic2NyaXB0aW9uLEtWPTI=');

export default function InputCalendarRange({ label, de, ate, setFunctionDe, setFunctionAte }) {
  const [value, setValue] = useState(de, ate);

  useEffect(() => {
    setValue([de ? dayjs(de) : null, ate ? dayjs(ate) : null]);
  }, [de, ate]);

  return (
    <LocalizationProvider size="small" dateAdapter={AdapterDayjs}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <DateRangePicker
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
            setFunctionDe(newValue[0]?.format('YYYY-MM-DD'));
            setFunctionAte(newValue[1]?.format('YYYY-MM-DD'));
          }}
          localeText={{ start: label + ' De:', end: 'Até:' }}
          format="DD/MM/YYYY"
        />
      </Box>
    </LocalizationProvider>
  );
}
