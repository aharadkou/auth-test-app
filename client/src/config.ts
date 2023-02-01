const isDev = process.env.NODE_ENV === 'development';
export const BASE_URL = isDev ? 'http://localhost:4001/api' : '/api';

export const REGISTER_URL = `${BASE_URL}/auth/register`;
export const LOGIN_URL = `${BASE_URL}/auth/login`;

export const COIN_APP_URL = isDev ? 'http://localhost:3002' : 'https://coin-test-application.netlify.app';
