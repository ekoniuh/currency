import queryString from 'query-string';
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Currency, Header } from './components/';
import { Loader } from './components/UI/Loader';
import { INITIAL_PARAMS_PAGE } from './constants/';
import { QueryContext } from './context';
import './styles/App.css';
import { formatDate } from './utils';

function App() {
  const [paramsPage, setParamsPage] = useState(INITIAL_PARAMS_PAGE);
  // let location = useLocation();
  // let history = useHistory();

  // to={{
  //   pathname: "/login",
  //   search: "?utm=your+face",
  //   state: { referrer: currentLocation }
  // }}
  const value = useMemo(() => ({ paramsPage, setParamsPage }), [paramsPage, setParamsPage]);
  // console.log(location.search);
  // useEffect(() => {
  //   if (!location.search) {
  //     const objWithQueryData = { day: formatDate(new Date()), isShow: ['CurrencyForDay'] };

  //     history.pushState(
  //       {},
  //       '',
  //       `?${queryString.stringify(objWithQueryData, {
  //         skipEmptyString: true,
  //       })}`
  //     );

  //     setParamsPage((prevState) => ({
  //       ...prevState,
  //       day: formatDate(new Date()),
  //     }));
  //   } else {
  //     const query = queryString.parse(location.search, { parseBooleans: true });

  //     setParamsPage((prevState) => ({
  //       ...prevState,
  //       ...query,
  //     }));
  //   }
  // }, []);

  // if (!paramsPage.day) {
  //   return <Loader />;
  // }

  console.log(paramsPage);

  return (
    <QueryContext.Provider value={value}>
      <Header />
      <Currency />
    </QueryContext.Provider>
  );
}

export default App;
