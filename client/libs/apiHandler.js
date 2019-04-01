import axios from 'axios';

const _baseReq = config => axios(config)
  .then(res => res.data)
  .catch(err => Promise.reject(err));

export const get = url => {
  const config = { url };
  return _baseReq(config);
};

export const post = (url, data) => {
  const config = {
    url,
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data
  };

  return _baseReq(config);
};

export const report = (url, data) => {
  const config = {
    url, 
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    data
  };
  
  return _baseReq(config);
};

export const remove = (url, data) => {
  const config = {
    url, 
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    data
  };
  
  return _baseReq(config);
};