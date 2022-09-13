import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React from 'react';

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

export function BasicSelect({ options, id, value, onChange }) {
  
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="select-Currency">Валюта</InputLabel>
        <Select
          labelId="select-Currency"
          value={value}
          label="Валюта"
          renderValue={(selected) => (!selected ? <em>Выберите</em> : selected)}
          onChange={onChange}
          MenuProps={MenuProps}
        >
          <MenuItem value={value}>
            <em>{value}</em>
          </MenuItem>
          {options.map(({ id, name }) => (
            <MenuItem key={id} value={name} style={getStyles(name, value)}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
