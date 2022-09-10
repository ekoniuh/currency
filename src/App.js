import React, { useMemo, useState } from 'react';
import './styles/App.css';
import { Header, Currency } from './components/';
import { QueryContext } from './context';
import { INITIAL_PARAMS_PAGE } from './constants/';


function App() {
  const [paramsPage, setParamsPage] = useState(INITIAL_PARAMS_PAGE);

  const value = useMemo(() => ({ paramsPage, setParamsPage }), [paramsPage, setParamsPage]);

  return (
    <QueryContext.Provider value={value}>
      <Header />
      <Currency />
    </QueryContext.Provider>
  );
}

export default App;
