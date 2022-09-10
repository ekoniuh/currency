import axios from 'axios';

const BASE_URL = 'https://www.nbrb.by/api/exrates/rates';

export default class HttpService {
  static async getDataCurrencies(periodicity = 0) {
    const response = await axios.get(BASE_URL, {
      params: { periodicity },
    });
    return response;
  }

  static async getDataCurrenciesForDay(date, periodicity = 0) {
    const response = await axios.get(BASE_URL, {
      params: { ondate: date, periodicity },
    });
    return response;
  }

  static async getDataCurrencyForPeriod(id, startDate, endDate) {
    const response = await axios.get(`${BASE_URL}/dynamics/${id}`, {
      params: { startDate, endDate },
    });
    return response;
  }
}
