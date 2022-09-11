import React from 'react';
import { CheckBoxContainer } from './UI/checkbox/';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

export const Header = () => {
  return (
    <Box sx={{ flexGrow: 1, width: 1 }}>
      <AppBar position="static" sx={{ justifyContent: 'center', alignItems: 'center' }}>
        <Toolbar sx={{ maxWidth: 0.8, width: 1, p: 0 }}>
          <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }}>
            <Chip
              label="Курсы валют"
              variant="outlined"
              sx={{ width: 160, height: 40, fontSize: 20, color: 'white' }}
            />
          </Typography>
          <CheckBoxContainer />
        </Toolbar>
      </AppBar>
    </Box>
  );
};
