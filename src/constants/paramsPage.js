import { formatDate } from '../utils';
// import { CurrencyRateForDay, CurrencyRateForPeriod, Converter } from '../components/';
import { format } from 'date-fns';

export const isShowPage = ['CurrencyRateForDay'];

export const INITIAL_PARAMS_PAGE = {
  isShowPage,
  day: format(new Date(), 'yyyy-MM-dd'),
  idCurrency: 431,
  nameCurrency: 'USD',
  startDate: format(new Date(new Date().setMonth(new Date().getMonth() - 1)), 'yyyy-MM-dd'),
  endDate: format(new Date(), 'yyyy-MM-dd'),
};
