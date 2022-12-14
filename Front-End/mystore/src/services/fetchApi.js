import axios from 'axios';

const api = axios.create({
  baseURL: `http://${process.env.REACT_APP_HOSTNAME}:${process.env.REACT_APP_API_PORT}`,
});

// export const setToken = (token) => {
//   api.defaults.headers.common.Authorization = token;
// };

export const requestGet = async (endpoint) => {
  const { data } = await api.get(endpoint);
  return data;
};

export const requestPost = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const requestPut = async (endpoint, body) => {
  const { data } = await api.put(endpoint, body);
  return data;
};

export default api;
