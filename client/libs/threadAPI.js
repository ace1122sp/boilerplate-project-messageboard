import axios from 'axios';

const _baseReq = config => axios(config)
  .then(res => res.data)
  .catch(err => Promise.reject(err))

export const getThreads = url => {
  const config = { url };
  return _baseReq(config);
};

export const postThread = (url, data) => {
  const config = {
    url,
    method: 'post',
    headers: {},
    data
  };

  return _baseReq(config);
};

export const reportThread = (url, thread_id) => {
  const config = {
    method: 'put',
    url, 
    headers: { 'Content-Type': 'application/json' },
    data: { thread_id }
  };
  
  return _baseReq(config);
};

export const deleteThread = (url, data) => {
  const config = {
    method: 'delete',
    url, 
    headers: { 'Content-Type': 'application/json' },
    data
  };
  
  return _baseReq(config);
};