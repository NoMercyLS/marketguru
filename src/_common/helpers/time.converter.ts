import moment from 'moment';

export const timeConverter = (date: string) => {
  return moment(date, 'DD-MM-YYYY').format('YYYY-MM-DD');
}