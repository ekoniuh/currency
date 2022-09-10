import React from 'react';
import cl from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={cl.loaderCenter}>
      <div className={cl.loader}></div>
    </div>
  );
};
