import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// export const Table = ({ currencies }) => {
//   return (
//     <div>
//       <table>
//         {currencies.map(({ Cur_ID, Cur_Abbreviation, Cur_OfficialRate, Cur_Name }) => {
//           return (
//             <tr key={Cur_ID}>
//               <th>
//                 {Cur_Name}
//                 {Cur_Abbreviation}
//               </th>
//               <td>{Cur_OfficialRate}</td>
//             </tr>
//           );
//         })}
//       </table>
//     </div>
//   );
// };

export function BasicTable({ currencies }) {
  return (
    <TableContainer component={Paper} sx={{ mb: 4, mt: 4 }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Наименование валюты</TableCell>
            <TableCell align="center">Буквенный код</TableCell>
            <TableCell align="center">Курс</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currencies.map(({ Cur_ID, Cur_Abbreviation, Cur_OfficialRate, Cur_Name }) => (
            <TableRow key={Cur_ID} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" align="left">
                {Cur_Name}
              </TableCell>
              <TableCell align="center">{Cur_Abbreviation}</TableCell>
              <TableCell align="center">{Cur_OfficialRate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
