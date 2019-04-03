import { report } from './apiHandler';

export const reportThread = (url, data, cb) => {
  report(url, data)
    .then(res => {
      if (res === 'success') cb();
    })
    .catch(err => {
      console.error(err); // temp solution for development
    });
};