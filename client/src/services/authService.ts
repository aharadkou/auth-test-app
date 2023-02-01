import { LOGIN_URL, REGISTER_URL } from '../config';
import { handleError } from '../helpers/common';

export const login = async (userName: string, password: string): Promise<{token: string}> => {
  const loginResponse = await fetch(LOGIN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username: userName.trim(), password}),
    });

    await handleError(loginResponse);

    return loginResponse.json();
};

export const register = async (userName: string, password: string, recaptchaToken: string): Promise<{token: string}> => {
  const registrationResponse = await fetch(REGISTER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({username: userName.trim(), password, recaptchaToken}),
  });

  await handleError(registrationResponse);

  return registrationResponse.json();
};