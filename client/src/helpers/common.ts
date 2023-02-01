import { COIN_APP_URL } from '../config';

export const handleError = async (response: Response) => {
  if (response.status === 400) {
    throw new Error((await response.json()).error);
  }
}

export const handleSuccessfulLogin = (token: string) => window.location.replace(`${COIN_APP_URL}?token=${encodeURIComponent(token)}`);
