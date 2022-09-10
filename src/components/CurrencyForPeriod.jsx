import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import HttpService from '../services/HttpService';
import { formatDate } from '../utils';
import { Button } from './UI/button/';
import { Chart } from './UI/Chart/';
import { getConfigForChart } from './UI/Chart/config';
import { DatePicker } from './UI/DatePicker/';
import { Loader } from './UI/Loader';
import { Select } from './UI/select/';

import { useFetching } from '../hooks/useFetching';

export const CurrencyForPeriod = () => {
  const [idAndAbbreviation, setIdAndAbbreviation] = useState([]);
  const [optionsForChart, setOptionsForChart] = useState([]);
  const [currentCurrency, setCurrentCurrency] = useState({ id: 431, name: 'USD' });
  const [period, setPeriod] = useState({
    startDate: formatDate(new Date(new Date().setMonth(new Date().getMonth() - 1))),
    endDate: formatDate(new Date()),
  });

  const loadDataCurrencyForPeriod = async () => {
    const { startDate, endDate } = period;
    const response = await fetch(
      `https://www.nbrb.by/api/exrates/rates/dynamics/${currentCurrency.id}?startDate=${startDate}&endDate=${endDate}`
    );
    const data = await response.json();
    setOptionsForChart(getConfigForChart(data ?? []));
  };

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

  const [fetchCurrenciesForPeriod, isLoadingCurrenciesForPeriod, errorCurrenciesForPeriod] = useFetching(
    async (id, startDate, endDate) => {
      const response = await HttpService.getDataCurrencyForPeriod(id, startDate, endDate);
      setOptionsForChart(getConfigForChart(response.data ?? []));
    }
  );

  useEffect(() => {
    const { startDate, endDate } = period;

    fetchCurrencies();
    fetchCurrenciesForPeriod(currentCurrency.id, startDate, endDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeDate = (date, name) => {
    setPeriod({ ...period, [name]: formatDate(new Date(date), 'yyyy-MM-dd') });
  };

  const changeSelect = ({ target }) => {
    const { value: name } = target;
    const id = idAndAbbreviation.filter((item) => item.name === name)[0].id;

    setCurrentCurrency({ id, name });
  };

  return (
    <Box component="section" sx={{ mb: 3 }}>
      <Typography variant="h4" component="h4" textAlign="center">
        Курс валют за период
      </Typography>

      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'space-between', mb: 2, mt: 2 }}>
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'start', maxWidth: 0.5 }}>
          <DatePicker
            label="C"
            name="startDate"
            value={period.startDate}
            onChange={(date) => changeDate(date, 'startDate')}
            inputFormat="yyyy-MM-dd"
            styleBox={{ maxWidth: 0.5,minWidth: 150 }}
            sx={{minWidth: 150}}
            maxDate={formatDate(new Date(), 'yyyy-MM-dd')}
          />
          <DatePicker
            label="По"
            name="endDate"
            value={period.endDate}
            onChange={(date) => changeDate(date, 'endDate')}
            inputFormat="yyyy-MM-dd"
            sx={{minWidth: 150}}
            styleBox={{ maxWidth: 0.5,minWidth: 150 }}
            maxDate={formatDate(new Date(), 'yyyy-MM-dd')}
          />
        </Box>
        <Select
          idCurrentCurrency={currentCurrency.id}
          name={currentCurrency.name}
          onChange={changeSelect}
          value={currentCurrency.name}
          options={idAndAbbreviation}
        />
        <Button
          style={{ display: 'flex', margin: '10px 10px' }}
          variant="contained"
          endIcon={<SendIcon />}
          onClick={loadDataCurrencyForPeriod}
        >
          Запрос
        </Button>
      </Box>
      {isLoadingCurrenciesForPeriod ? <Loader /> : <Chart data={optionsForChart} />}
    </Box>
  );
};
