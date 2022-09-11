export const updateArrayCheckbox = (isShowPage, position, configComponents) => {
  // debugger
  let updatedCheckedState = typeof isShowPage === 'string' ? [isShowPage] : isShowPage;

  if (updatedCheckedState.includes(configComponents[position])) {
    const indexItem = updatedCheckedState.indexOf(configComponents[position]);

    updatedCheckedState.splice(indexItem, 1);
  } else {
    updatedCheckedState.push(configComponents[position]);
  }
  return updatedCheckedState;
};
