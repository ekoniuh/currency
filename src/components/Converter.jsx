import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import queryString from 'query-string';
import React, { useContext, useEffect, useState } from 'react';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';
import HttpService from '../services/HttpService';
import { Select } from './UI/select';

import { QueryContext } from '../context';
import { useFetching } from '../hooks/useFetching';
import { Loader } from './UI/Loader';

export function Converter() {
  let navigate = useNavigate();
  const { paramsPage, setParamsPage } = useContext(QueryContext);

  const {
    idCurrencyFirst,
    valueCurrencySecond,
    valueCurrencyFirst,
    nameCurrencyFirst,
    idCurrencySecond,
    nameCurrencySecond,
  } = paramsPage;

  let { search } = useLocation();

  const query = queryString.parse(search, { parseNumbers: true });

  const [firstCurrency, setFirstCurrency] = useState({
    id: query?.idCurrencyFirst ?? idCurrencyFirst,
    name: query?.nameCurrencyFirst ?? nameCurrencyFirst,
    value: query?.valueCurrencyFirst ?? valueCurrencyFirst,
    helperText: '',
  });

  const [secondCurrency, setSecondCurrency] = useState({
    id: query?.idCurrencySecond ?? idCurrencySecond,
    name: query?.nameCurrencySecond ?? nameCurrencySecond,
    value: query?.valueCurrencySecond ?? valueCurrencySecond,
    helperText: '',
  });

  const [currencies, setCurrencies] = useState([]);

  const [fetchCurrencies, isLoadingCurrencies, errorCurrencies] = useFetching(async () => {
    const response = await HttpService.getDataCurrencies();
    setCurrencies(response.data);
    setFirstCurrency((prev) => ({
      ...prev,
      helperText: response.data.filter((item) => item['Cur_Abbreviation'] === firstCurrency.name)[0]['Cur_Name'],
    }));
    setSecondCurrency((prev) => ({
      ...prev,
      helperText: response.data.filter((item) => item['Cur_Abbreviation'] === secondCurrency.name)[0]['Cur_Name'],
    }));
  });

  useEffect(() => {
    fetchCurrencies();
    const intervalId = setInterval(() => {
      fetchCurrencies();
    }, 60000);
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeFirstCurrency = (e) => {
    const { value: name } = e.target;
    const currencyFirst = currencies.filter((item) => item['Cur_Abbreviation'] === name)[0];
    const currencySecond = currencies.filter((item) => item['Cur_Abbreviation'] === secondCurrency.name)[0];
    const rateFirst = currencyFirst['Cur_OfficialRate'] / currencyFirst['Cur_Scale'];
    const rateSecond = currencySecond['Cur_OfficialRate'] / currencySecond['Cur_Scale'];

    const rate = String(((Number(secondCurrency.value) * rateFirst) / rateSecond).toFixed(2));

    navigate({
      search: createSearchParams({
        ...paramsPage,
        idCurrencyFirst: currencyFirst['Cur_ID'],
        nameCurrencyFirst: name,
        valueCurrencyFirst: rate,
      }).toString(),
    });

    setFirstCurrency((prev) => ({
      ...prev,
      name,
      id: currencyFirst['Cur_ID'],
      helperText: currencyFirst['Cur_Name'],
      value: rate,
    }));
    setParamsPage((prevState) => ({
      ...prevState,
      idCurrencyFirst: currencyFirst['Cur_ID'],
      nameCurrencyFirst: name,
      valueCurrencyFirst: rate,
    }));
  };

  const changeSecondCurrency = (e) => {
    const { value: name } = e.target;
    const currencyFirst = currencies.filter((item) => item['Cur_Abbreviation'] === firstCurrency.name)[0];
    const currencySecond = currencies.filter((item) => item['Cur_Abbreviation'] === name)[0];
    const rateFirst = currencyFirst['Cur_OfficialRate'] / currencyFirst['Cur_Scale'];
    const rateSecond = currencySecond['Cur_OfficialRate'] / currencySecond['Cur_Scale'];
    const rate = String(((Number(secondCurrency.value) * rateFirst) / rateSecond).toFixed(2));

    navigate({
      search: createSearchParams({
        ...paramsPage,
        idCurrencySecond: currencySecond['Cur_ID'],
        nameCurrencySecond: name,
        valueCurrencySecond: rate,
      }).toString(),
    });

    setSecondCurrency((prev) => ({
      ...prev,
      name,
      id: currencySecond['Cur_ID'],
      helperText: currencySecond['Cur_Name'],
      value: String(((Number(firstCurrency.value) * rateFirst) / rateSecond).toFixed(2)),
    }));

    setParamsPage((prevState) => ({
      ...prevState,
      idCurrencySecond: currencySecond['Cur_ID'],
      nameCurrencySecond: name,
      valueCurrencySecond: rate,
    }));
  };

  const calcCurrencyFirst = (value) => {
    const currencyFirst = currencies.filter((item) => item['Cur_Abbreviation'] === firstCurrency.name)[0];
    const currencySecond = currencies.filter((item) => item['Cur_Abbreviation'] === secondCurrency.name)[0];
    const rateFirst = currencyFirst['Cur_OfficialRate'] / currencyFirst['Cur_Scale'];
    const rateSecond = currencySecond['Cur_OfficialRate'] / currencySecond['Cur_Scale'];
    const rate = String(((Number(value) * rateFirst) / rateSecond).toFixed(2));

    navigate({
      search: createSearchParams({
        ...paramsPage,
        valueCurrencyFirst: value,
        valueCurrencySecond: rate,
      }).toString(),
    });

    setFirstCurrency((prev) => ({ ...prev, value: value }));

    setSecondCurrency((prev) => ({
      ...prev,
      value: rate,
    }));
  };

  const calcCurrencySecond = (value) => {
    const currencyFirst = currencies.filter((item) => item['Cur_Abbreviation'] === firstCurrency.name)[0];
    const currencySecond = currencies.filter((item) => item['Cur_Abbreviation'] === secondCurrency.name)[0];
    const rateFirst = currencyFirst['Cur_OfficialRate'] / currencyFirst['Cur_Scale'];
    const rateSecond = currencySecond['Cur_OfficialRate'] / currencySecond['Cur_Scale'];
    const rate = String(((Number(value) * rateSecond) / rateFirst).toFixed(2));

    navigate({
      search: createSearchParams({
        ...paramsPage,
        valueCurrencyFirst: rate,
        valueCurrencySecond: value,
      }).toString(),
    });

    setSecondCurrency((prev) => ({ ...prev, value: value }));

    setFirstCurrency((prev) => ({
      ...prev,
      value: rate,
    }));
  };

  return isLoadingCurrencies ? (
    <Loader />
  ) : (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        '& > :not(style)': { m: '0 auto', width: '55ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          justifyContent: 'space-around',
        }}
      >
        <TextField
          label={firstCurrency.name}
          value={firstCurrency.value}
          onChange={(event) => calcCurrencyFirst(event.target.value)}
          variant="standard"
          helperText={firstCurrency.helperText}
        />
        <Select
          onChange={changeFirstCurrency}
          value={firstCurrency.name}
          id={firstCurrency.id}
          options={[...currencies].map((item) => ({ id: item['Cur_ID'], name: item['Cur_Abbreviation'] }))}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          justifyContent: 'space-around',
        }}
      >
        <TextField
          label={secondCurrency.name}
          value={secondCurrency.value}
          onChange={(event) => calcCurrencySecond(event.target.value)}
          variant="standard"
          helperText={secondCurrency.helperText}
        />
        <Select
          onChange={changeSecondCurrency}
          value={secondCurrency.name}
          id={secondCurrency.id}
          options={[...currencies].map((item) => ({ id: item['Cur_ID'], name: item['Cur_Abbreviation'] }))}
        />
      </Box>
      {errorCurrencies}
    </Box>
  );
}
