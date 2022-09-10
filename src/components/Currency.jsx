import React, { useContext } from 'react';
import { QueryContext } from '../context';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export const Currency = () => {
  const {
    paramsPage: { selectComponents },
  } = useContext(QueryContext);

  return (
    <Box component="main" sx={{ mt: 5, width: 1, maxWidth: 0.8 }}>
      {/* <Container maxWidth="lg"> */}
      {selectComponents.map(({ Component, isShow }) => (isShow ? <Component key={Component.name} /> : null))}
      {/* </Container> */}
    </Box>
  );
};
