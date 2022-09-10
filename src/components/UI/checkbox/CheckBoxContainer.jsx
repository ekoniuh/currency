import React, { useContext, Fragment } from 'react';
import configCheckBoxes from './config';
import { Checkbox } from './CheckBox';
import { QueryContext } from '../../../context';

export const CheckBoxContainer = () => {
  const { paramsPage, setParamsPage } = useContext(QueryContext);
  const { selectComponents } = paramsPage;

  const changeCheckBox = (position) => {
    const updatedCheckedState = [...selectComponents];

    for (const [index, item] of updatedCheckedState.entries()) {
      if (index === position) {
        updatedCheckedState[index].isShow = !item.isShow;
      }
    }

    setParamsPage((prevState) => ({
      ...prevState,
      selectComponents: [...updatedCheckedState],
    }));
  };

  return (
    <Fragment>
      {selectComponents.map((component, index) => (
        <label key={configCheckBoxes[index].key}>
          {configCheckBoxes[index].label}
          <Checkbox type="checkbox" checked={component.isShow} onChange={() => changeCheckBox(index)} />
        </label>
      ))}
    </Fragment>
  );
};
