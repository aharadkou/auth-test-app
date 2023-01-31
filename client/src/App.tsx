import { useState } from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import logo from './assets/logo.svg';
import { ToastContainer } from 'react-toastify';
import { LoginComponent } from './components/login/LoginComponent';
import { RegistrationComponent } from './components/registration/RegistrationComponent';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('auth_token'));
  const onLogIn = () => setIsLoggedIn(true);
  
  return (
    <div className='app'>
      <header>
        <img src={logo} className="app-logo" alt="logo" />
      </header>
      <section className='app-content'>
        <div className='auth-container'>
          <RegistrationComponent />
          <LoginComponent />
        </div>
      </section>
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default App;
