import React, { useEffect, useState } from 'react';
import { DatePicker } from './UI/DatePicker/';
import { Button } from './UI/button/';
import { Table } from './UI/Table/';
import { Loader } from './UI/Loader';
import { formatDate } from '../utils';
import HttpService from '../services/HttpService';
import { useFetching } from '../hooks/useFetching';

export const CurrencyForDay = () => {
  const [dataForOneDay, setDataForOneDay] = useState([]);
  const [date, setDate] = useState(formatDate(new Date()));

  const [fetchCurrencies, isLoading, error] = useFetching(async () => {
    const response = await HttpService.getDataCurrenciesForDay(date);
    setDataForOneDay([...response.data]);
  });

  useEffect(() => {
    fetchCurrencies(date);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeDate = ({ target }) => {
    const date = target.value;
    setDate(date);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <section>
      <div style={{ display: 'flex' }}>
        <DatePicker date={date} onChange={changeDate} />
        <Button onClick={() => fetchCurrencies(date)}>Запрос</Button>
      </div>
      <Table currencies={dataForOneDay} />
    </section>
  );
};
