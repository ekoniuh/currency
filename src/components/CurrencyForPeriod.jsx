import React, { useEffect, useState } from 'react';
import { formatDate } from '../utils';
import { Button } from './UI/button/';
import { Chart } from './UI/Chart/';
import { getConfigForChart } from './UI/Chart/config';
import { DatePicker } from './UI/DatePicker/';
import { Select } from './UI/select/';
import { Loader } from './UI/Loader';

import HttpService from '../services/HttpService';

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

  const changeDate = ({ target }) => {
    const { value, name } = target;
    setPeriod({ ...period, [name]: value });
  };

  const changeSelect = ({ target }) => {
    const { value: name } = target;
    const id = idAndAbbreviation.filter((item) => item.name === name)[0].id;

    setCurrentCurrency({ id, name });
  };

  return isLoadingCurrenciesForPeriod ? (
    <Loader />
  ) : (
    <section>
      <DatePicker name={'startDate'} date={period.startDate} onChange={changeDate} />
      <DatePicker name={'endDate'} date={period.endDate} onChange={changeDate} />
      <Select
        idCurrentCurrency={currentCurrency.id}
        name={currentCurrency.name}
        onChange={changeSelect}
        defaultValue={currentCurrency.name}
        options={idAndAbbreviation}
      />
      <Button onClick={loadDataCurrencyForPeriod}>Запрос</Button>
      <Chart data={optionsForChart} />
    </section>
  );
};
