import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React, { useContext, useEffect, useState } from 'react';
import HttpService from '../services/HttpService';
import { formatDate } from '../utils';
import { Button } from './UI/button';
import { Chart } from './UI/Chart';
import { getConfigForChart } from './UI/Chart/config';
import { DatePicker } from './UI/DatePicker';
import { Loader } from './UI/Loader';
import { Select } from './UI/select';
import queryString from 'query-string';

import { useFetching } from '../hooks/useFetching';
import { QueryContext } from '../context';
import { createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom';

export const CurrencyRateForPeriod = () => {
  const { paramsPage, setParamsPage } = useContext(QueryContext);
  const { startDate, endDate, idCurrency, nameCurrency } = paramsPage;

  let navigate = useNavigate();
  let { search } = useLocation();

  const query = queryString.parse(search, { parseNumbers: true });

  const [currentCurrency, setCurrentCurrency] = useState({
    idCurrency: query?.idCurrency ?? idCurrency,
    nameCurrency: query?.nameCurrency ?? nameCurrency,
  });
  const [period, setPeriod] = useState({
    startDate: query?.startDate ?? startDate,
    endDate: query?.endDate ?? endDate,
  });

  const [idAndAbbreviation, setIdAndAbbreviation] = useState([]);
  const [optionsForChart, setOptionsForChart] = useState([]);

  const [fetchCurrencies, isLoadingCurrencies, errorCurrencies] = useFetching(async () => {
    const response = await HttpService.getDataCurrencies();
    setIdAndAbbreviation(
      [...response.data].map((item) => {
        return {
          id: item['Cur_ID'],
          name: item['Cur_Abbreviation'],
        };
      })
    );
  });

  const [fetchCurrenciesForPeriod, isLoadingCurrenciesForPeriod, errorCurrenciesForPeriod] = useFetching(async () => {
    const { startDate, endDate } = period;
    const { idCurrency } = currentCurrency;

    const response = await HttpService.getDataCurrencyRateForPeriod(idCurrency, startDate, endDate);
    setOptionsForChart(getConfigForChart(response.data ?? []));
  });

  useEffect(() => {
    if (!period.startDate) return;
    fetchCurrencies();
    fetchCurrenciesForPeriod();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeDate = (date, name) => {
    const formattedDate = formatDate(new Date(date), 'yyyy-MM-dd');

    navigate({
      search: createSearchParams({ ...paramsPage, [name]: formattedDate }).toString(),
    });

    setPeriod({ ...period, [name]: formattedDate });
    setParamsPage((prevState) => ({
      ...prevState,
      [name]: formattedDate,
    }));
  };

  const changeSelect = ({ target }) => {
    const { value: nameCurrency } = target;
    const idCurrency = idAndAbbreviation.filter((item) => item.name === nameCurrency)[0].id;

    navigate({
      search: createSearchParams({ ...paramsPage, idCurrency, nameCurrency }).toString(),
    });

    setCurrentCurrency({ nameCurrency, idCurrency });
    setParamsPage((prevState) => ({
      ...prevState,
      idCurrency,
      nameCurrency,
    }));
  };

  return (
    <Box component="section" sx={{ mb: 3 }}>
      <Typography variant="h4" component="h4" textAlign="center">
        Курс валют за период
      </Typography>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          flexWrap: 'wrap',
          mb: 2,
          mt: 2,
        }}
      >
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'start' }}>
          <DatePicker
            label="C"
            name="startDate"
            value={period.startDate}
            onChange={(date) => changeDate(date, 'startDate')}
            inputFormat="yyyy-MM-dd"
            styleBox={{ maxWidth: 0.5, minWidth: 150 }}
            sx={{ minWidth: 150 }}
            maxDate={period.endDate}
          />
          <DatePicker
            label="По"
            name="endDate"
            value={period.endDate}
            onChange={(date) => changeDate(date, 'endDate')}
            inputFormat="yyyy-MM-dd"
            sx={{ minWidth: 150 }}
            styleBox={{ minWidth: 150 }}
            minDate={period.startDate}
            maxDate={formatDate(new Date(), 'yyyy-MM-dd')}
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between', maxWidth: 0.5 }}>
          <Select onChange={changeSelect} value={currentCurrency.nameCurrency} options={idAndAbbreviation} />
          <Button
            sx={{ display: 'flex', margin: '10px 10px', minWidth: 120 }}
            variant="contained"
            endIcon={<SendIcon />}
            onClick={fetchCurrenciesForPeriod}
          >
            Запрос
          </Button>
        </Box>
      </Box>
      {isLoadingCurrenciesForPeriod ? <Loader /> : <Chart data={optionsForChart} />}
    </Box>
  );
};
