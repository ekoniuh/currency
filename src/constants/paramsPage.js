import { formatDate } from '../utils';
import { CurrencyForDay, CurrencyForPeriod, Converter } from '../components/';

const configComponents = [
  { id: 1, Component: CurrencyForDay, isShow: true },
  { id: 2, Component: CurrencyForPeriod, isShow: false },
  { id: 3, Component: Converter, isShow: false },
];

export const INITIAL_PARAMS_PAGE = {
  selectComponents: configComponents,
  day: formatDate(new Date()),
  startDay: '',
  endDay: '',
};
