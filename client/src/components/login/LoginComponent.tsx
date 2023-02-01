import { useState, MouseEvent } from 'react';
import { toast } from 'react-toastify';

import './LoginComponent.css';
import { LOGIN_URL } from '../../config';
import { handleError, handleSuccessfulLogin } from '../../helpers/common';

export function LoginComponent() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isRequestInProgress, setRequestInProgress] = useState(false);

  const login = async (event: MouseEvent) => {
    event.preventDefault();

    try {
      if (isRequestInProgress) {
        return;
      }

      setRequestInProgress(true);

      const loginResponse = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username: userName.trim(), password}),
      });

      await handleError(loginResponse);


      const { token } = await loginResponse.json();

      handleSuccessfulLogin(token);
    } catch(error) {
      toast.error(error.message);
    } finally {
      setRequestInProgress(false);
    }
  };

  return (
    <form className='app-form'>
      <h2>Login</h2>
      <input
        type="text"
        placeholder='Username'
        onChange={(event) => setUserName(event.target.value)}
        value={userName}
      />
      <input
        type='password'
        placeholder='Password'
        onChange={(event) => setPassword(event.target.value)}
        value={password}
      />
      <button disabled={!userName.trim() || isRequestInProgress} onClick={(event) => login(event)}>Login</button>
    </form>
  );
}