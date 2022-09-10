import React, { useContext } from 'react';
import { QueryContext } from '../context';

export const Currency = () => {
  const {
    paramsPage: { selectComponents },
  } = useContext(QueryContext);

  return (
    <main>{selectComponents.map(({ Component, isShow }) => (isShow ? <Component key={Component.name} /> : null))}</main>
  );
};
