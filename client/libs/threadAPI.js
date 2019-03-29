import axios from 'axios';

export const getThreads = url => {
  return axios(url)
    .then(res => {
      return res.data.threads;
    })
    .catch(err => Promise.reject(err));
}

export const postThread = () => {}

export const reportThread = () => {}

export const deleteThread = () => {}