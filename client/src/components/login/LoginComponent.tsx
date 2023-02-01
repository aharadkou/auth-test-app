import { useState, MouseEvent } from 'react';
import { toast } from 'react-toastify';

import './LoginComponent.css';
import { handleSuccessfulLogin } from '../../helpers/common';
import { login } from '../../services/authService';

export function LoginComponent() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isRequestInProgress, setRequestInProgress] = useState(false);

  const handleLogin = async (event: MouseEvent) => {
    event.preventDefault();

    try {
      if (isRequestInProgress) {
        return;
      }

      setRequestInProgress(true);

      const { token } = await login(userName, password);

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
      <button disabled={!userName.trim() || isRequestInProgress} onClick={(event) => handleLogin(event)}>Login</button>
    </form>
  );
}