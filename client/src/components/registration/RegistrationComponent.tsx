import { useState, MouseEvent } from 'react';
import ReCAPTCHA from 'react-google-recaptcha-enterprise';
import { toast } from 'react-toastify';

import './RegistrationComponent.css';
import { REGISTER_URL } from '../../config';
import { handleError, handleSuccessfulLogin } from '../../helpers/common';

const MIN_USERNAME_LENGTH = 5;
const MIN_PASSWORD_LENGTH = 8;

export function RegistrationComponent() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [recaptchaToken, setRecaptchaToken] = useState('');

  const onRegisterClick = async (event: MouseEvent) => {
    event.preventDefault();

    try {
      if (userName.length < MIN_USERNAME_LENGTH) {
        throw new Error(`Min username length is ${MIN_USERNAME_LENGTH}!`)
      }

      if (password !== passwordConfirmation) {
        throw new Error(`Passwords don't match!`)
      }

      if (password.length < MIN_PASSWORD_LENGTH) {
        throw new Error(`Min password length is ${MIN_USERNAME_LENGTH}!`)
      }

      const registrationResponse = await fetch(REGISTER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username: userName.trim(), password, recaptchaToken}),
      });

      await handleError(registrationResponse);

      const { token } = await registrationResponse.json();


      handleSuccessfulLogin(token);
    } catch(error) {
      toast.error(error.message);
    }
  }

  return (
    <form className='app-form'>
      <h2>Register</h2>
      <input
        type='text'
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
      <input
        type='password'
        placeholder='Confirm password'
        onChange={(event) => setPasswordConfirmation(event.target.value)}
        value={passwordConfirmation}
      />
      <ReCAPTCHA
        sitekey='6LdswD8kAAAAAL1DoiYq1k_26BKoV1Q_OD1O4mXH'
        onChange={setRecaptchaToken}
      />
      <button
        className='register-button'
        disabled={!userName.trim()}
        onClick={(event) => onRegisterClick(event)}
      >Register</button>
    </form>
  );
}