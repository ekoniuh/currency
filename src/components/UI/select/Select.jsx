import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React from 'react';
// export const Select = ({ options, defaultValue, name, id, onChange }) => {
//   return (
//     <select value={name} id={id} onChange={onChange}>
//       <option value={name} id={id}>
//         {defaultValue}
//       </option>
//       {options.map((option) => (
//         <option key={option.id} value={option.name} id={option.id}>
//           {option.name}
//         </option>
//       ))}
//     </select>
//   );
// };

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 120,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight: personName.indexOf(name) === -1 ? 500 : 700,
  };
}

export function BasicSelect({ options, value, name, id, onChange }) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="select-currency">Валюта</InputLabel>
        <Select
          labelId="select-currency"
          value={value}
          label="Валюта"
          renderValue={(selected) => (!selected ? <em>Выберите</em> : selected)}
          onChange={onChange}
          MenuProps={MenuProps}
        >
          {options.map(({ id, name }) => (
            <MenuItem key={id} value={name} id={id} style={getStyles(name, value)}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
