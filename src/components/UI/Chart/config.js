import { formatDate } from '../../../utils';

export function getConfigForChart(data) {
  const isEmptyArray = data.length > 0;

  return {
    accessibility: {
      enabled: false,
    },
    chart: {
      zoomType: 'x',
      defaultSeriesType: 'spline',
      height: 600,
      backgroundColor: 'rgba(220, 220, 220, 255)',
    },
    title: {
      text: 'Данные валюты',
    },
    xAxis: {
      categories: isEmptyArray ? data.map((item) => formatDate(new Date(item.Date))) : null,
      type: 'datetime',
    },
    yAxis: {
      title: {
        text: 'Курс',
      },
    },
    series: [
      {
        name: 'Дата',
        color: '#ff3399',
        data: isEmptyArray ? data.map((item) => item['Cur_OfficialRate']) : null,
      },
    ],
  };
}
