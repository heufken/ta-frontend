import axios from './axios';

export const loginApi = (username, password) =>
  axios.post('auth/login', { username, password });

export const getUserApi = () =>
  axios.get('auth/user');

export const logoutApi = () =>
  axios.post('auth/logout');