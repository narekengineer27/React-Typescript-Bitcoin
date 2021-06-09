import * as moment from 'moment';

export const getGmt1Now = () => {
  return moment().utcOffset(1);
};

export const getGmt1NowTimeStamp = () => {
  return getGmt1Now().valueOf();
};

export const lastSyncTime = (unixSeconds) => {
  return (moment.unix(unixSeconds).utcOffset(1).format('ddd MMM DD YYYY HH:mm:ss')) + ' GMT+0100 (CST)';
  // return getGmt1Now().format('HH:mm');
};

export const tableDateTime = (date) => {
  return moment(date).format('DD.MM.YYYY HH:mm');
};

export const expired = (date: string) => {
  const now = moment();
  return moment(date) < now;
};

export const now = () => {
  return (new Date()).getTime();
};
