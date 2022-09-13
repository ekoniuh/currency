import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import queryString from 'query-string';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Converter } from './Converter';
import { CurrencyRateForDay } from './CurrencyRateForDay';
import { CurrencyRateForPeriod } from './CurrencyRateForPeriod';

const configComponents = {
  CurrencyRateForDay,
  CurrencyRateForPeriod,
  Converter,
};

export const CurrencyBox = () => {
  let { search } = useLocation();

  const query = queryString.parse(search, { parseNumbers: true });

  if (!query?.isShowPage) {
    return (
      <Typography variant="h4" component="h2">
        Выберите один из пунктов в меню
      </Typography>
    );
  }

  const arrayWithNamesComponents = typeof query?.isShowPage === 'string' ? [query.isShowPage] : query.isShowPage;

  return (
    <Box component="main" sx={{ mt: 5, width: 1, maxWidth: 0.8 }}>
      {arrayWithNamesComponents.map((nameComponent) => {
        const Component = configComponents[nameComponent];

        return <Component key={Component.name} />;
      })}
    </Box>
  );
};
