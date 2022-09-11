import React, { useContext } from 'react';
import { QueryContext } from '../context';
import Box from '@mui/material/Box';
import queryString from 'query-string';
import { createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { CurrencyRateForDay } from './CurrencyRateForDay';
import { CurrencyRateForPeriod } from './CurrencyRateForPeriod';
import { Converter } from './Converter';

const configComponents = {
  CurrencyRateForDay,
  CurrencyRateForPeriod,
  Converter,
};

export const CurrencyBox = () => {
  let { search } = useLocation();
  const {
    paramsPage: { selectComponents },
  } = useContext(QueryContext);

  const query = queryString.parse(search, { parseNumbers: true });

  if (!query?.isShowPage) {
    return 'выберите компонент';
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
