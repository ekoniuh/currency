import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { format } from 'date-fns';
import React, { useContext, useEffect, useState } from 'react';
import { QueryContext } from '../context';
import { useFetching } from '../hooks/useFetching';
import HttpService from '../services/HttpService';
import { Button } from './UI/button';
import { DatePicker } from './UI/DatePicker';
import { Loader } from './UI/Loader';
import { Table } from './UI/Table';
import { createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import queryString from 'query-string';

export const CurrencyRateForDay = () => {
  const { paramsPage, setParamsPage } = useContext(QueryContext);
  const [dataForOneDay, setDataForOneDay] = useState([]);

  let navigate = useNavigate();
  let { search } = useLocation();

  const query = queryString.parse(search, { parseNumbers: true });

  const [date, setDate] = useState(query?.day ?? paramsPage.day);

  const [fetchCurrencies, isLoading, error] = useFetching(async () => {
    const response = await HttpService.getDataCurrenciesForDay(date);
    setDataForOneDay([...response.data]);
  });

  useEffect(() => {
    if (!date) return;
    fetchCurrencies(date);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   setDate(query?.day ?? paramsPage.day);
  // }, []);

  const changeDate = (date) => {
    const day = format(new Date(date), 'yyyy-MM-dd');
    setDate(day);

    navigate({
      search: createSearchParams({ ...paramsPage, day }).toString(),
    });
    setParamsPage((prevState) => ({
      ...prevState,
      day,
    }));
  };
  // console.log(paramsPage.day);

  return (
    <Box component="section">
      <Typography variant="h4" component="h4" textAlign="center" sx={{ mb: 3 }}>
        Курс валют за день
      </Typography>
      <Box sx={{ display: 'flex', maxWidth: 0.6, justifyContent: 'space-around', m: 'auto' }}>
        <DatePicker
          label="Выберите день"
          inputFormat="yyyy-MM-dd"
          value={date}
          onChange={changeDate}
          sx={{ minWidth: 150 }}
          styleBox={{ minWidth: 150 }}
          maxDate={format(new Date(), 'yyyy-MM-dd')}
        />
        <Button
          sx={{ display: 'flex', margin: '10px 10px', minWidth: 120 }}
          variant="contained"
          endIcon={<SendIcon />}
          onClick={() => fetchCurrencies(date)}
        >
          Запрос
        </Button>
      </Box>
      {isLoading ? <Loader /> : <Table currencies={dataForOneDay} />}
    </Box>
  );
};
