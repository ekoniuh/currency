import queryString from 'query-string';
import React, { useEffect, useMemo, useState } from 'react';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { CurrencyBox, Header } from './components/';
import { Loader } from './components/UI/Loader';
import { INITIAL_PARAMS_PAGE } from './constants/';
import { QueryContext } from './context';
import './styles/App.css';

function App() {
  const [paramsPage, setParamsPage] = useState(INITIAL_PARAMS_PAGE);
  let { search } = useLocation();
  let navigate = useNavigate();

  const value = useMemo(() => ({ paramsPage, setParamsPage }), [paramsPage, setParamsPage]);

  useEffect(() => {
    const query = queryString.parse(search, { parseNumbers: true });

    setParamsPage((prevState) => ({
      ...prevState,
      ...INITIAL_PARAMS_PAGE,
      ...query,
    }));
  }, [search]);

  useEffect(() => {
    if (search) return;
    navigate({
      search: createSearchParams(INITIAL_PARAMS_PAGE).toString(),
    });

    setParamsPage({ ...INITIAL_PARAMS_PAGE });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  if (!search) {
    return <Loader />;
  }

  return (
    <QueryContext.Provider value={value}>
      <Header />
      <CurrencyBox />
    </QueryContext.Provider>
  );
}

export default App;
