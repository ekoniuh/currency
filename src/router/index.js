import { CurrencyDay, CurrencyPeriod, CurrencyConverter, About, NotFoundPage } from '../pages/About';

export const routes = [
  { path: '/currency-day', Component: CurrencyDay },
  { path: '/currency-period', Component: CurrencyPeriod },
  { path: '/currency-converter', Component: CurrencyConverter },
  { path: '/about', Component: About },
  { path: '/not-found-page', Component: NotFoundPage },
];

// export const publicRoutes = [{ path: '/login', Component: Login }];
