import React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// export const DatePicker = ({ name, date, onChange }) => {
//   return <input type="date" name={name} value={date} onChange={onChange} />;
// };
export const DatePicker = ({ styleBox, ...props }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3} sx={{ ...styleBox }}>
        <DesktopDatePicker {...props} renderInput={(params) => <TextField {...params} />} />
      </Stack>
    </LocalizationProvider>
  );
};
