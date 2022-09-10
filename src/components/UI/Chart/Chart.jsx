import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export const Chart = ({ data }) => {
  return (
    // <div style={{ marginBottom: '30px', marginTop: '30px' }}>
    <HighchartsReact highcharts={Highcharts} options={data} />
    // </div>
  );
};
