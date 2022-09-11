import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export const Chart = ({ data }) => {
  return <HighchartsReact highcharts={Highcharts} options={data} />;
};
