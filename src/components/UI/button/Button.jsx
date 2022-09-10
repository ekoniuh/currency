import React from 'react';
import classes from './MyButton.module.css';

export const Button = ({ children, ...props }) => {
  return (
    <button {...props} className={classes.myBtn}>
      {children}
    </button>
  );
};
