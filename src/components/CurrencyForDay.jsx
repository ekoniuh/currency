import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { format } from 'date-fns';
import React, { useContext, useEffect, useState } from 'react';
import { QueryContext } from '../context';
import { useFetching } from '../hooks/useFetching';
import HttpService from '../services/HttpService';
import { Button } from './UI/button/';
import { DatePicker } from './UI/DatePicker';
import { Loader } from './UI/Loader';
import { Table } from './UI/Table/';

export const CurrencyForDay = () => {
  const { paramsPage, setParamsPage } = useContext(QueryContext);
  const [dataForOneDay, setDataForOneDay] = useState([]);

  const [date, setDate] = useState(paramsPage.day);

  const [fetchCurrencies, isLoading, error] = useFetching(async () => {
    const response = await HttpService.getDataCurrenciesForDay(date);
    setDataForOneDay([...response.data]);
  });

  useEffect(() => {
    fetchCurrencies(date);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // const query = queryString.parse(window.location.search, { parseBooleans: true });
    // window.history.pushState({}, '', `?${queryString.stringify({ ...query, day: paramsPage.day })}`);
  }, []);

  // useEffect(() => {
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   const query = queryString.parse(window.location.search, { parseBooleans: true });
  //   console.log(query);
  //   window.history.pushState({}, '', `?${queryString.stringify({ ...query, day: date })}`);
  // }, [date]);

  const changeDate = (date) => {
    const day = format(new Date(date), 'yyyy-MM-dd');

    setDate(day);
    setParamsPage((prevState) => ({
      ...prevState,
      day,
    }));
  };

  return (
    <Box component="section">
      <Typography variant="h4" component="h4" textAlign="center" sx={{mb:3}}>
        Курс валют за период
      </Typography>
      <Box sx={{ display: 'flex', maxWidth: 0.6, justifyContent: 'space-around', m: 'auto' }}>
        <DatePicker
          label="Выберите день"
          inputFormat="yyyy-MM-dd"
          value={date}
          onChange={changeDate}
          maxDate={format(new Date(), 'yyyy-MM-dd')}
        />
        <Button
          style={{ display: 'flex', margin: '10px 10px' }}
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
