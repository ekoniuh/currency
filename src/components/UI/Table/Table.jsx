import React from 'react';

export const Table = ({ currencies }) => {
  return (
    <div>
      <table>
        {currencies.map(({ Cur_ID, Cur_Abbreviation, Cur_OfficialRate, Cur_Name }) => {
          return (
            <tr key={Cur_ID}>
              <th>
                {Cur_Name}
                {Cur_Abbreviation}
              </th>
              <td>{Cur_OfficialRate}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};
