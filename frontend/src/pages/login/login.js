import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css'; 
import { EyeInvisibleOutlined } from '@ant-design/icons';

function Login() {
  const [isChecked, setIsChecked] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username !== '' && password !== '') {
      console.log('Campos no vacíos');
    } else {
      console.log('Por favor, complete todos los campos');
    }
  };

  return (
    <div className='login-container'>
      <a className='logo' href='/login'>
        <img src={process.env.PUBLIC_URL + '/assets/img/logo.png'} alt='logo' className='logo-img' />
      </a>
      <img src={process.env.PUBLIC_URL + '/assets/img/background.jpg'} alt='background' className='background-img' />
      <p className='welcome'>Welcome Back .!</p>
      <div className='line'></div>
      <p className='skipthelag'>Skip the lag ?</p>
      <div className='login-border'>
        <form className='login-form' onSubmit={handleSubmit}>
          <p className='login-text'>Login</p>
          <p className='glad-text'>Glad you're back.!</p>
          <input className='username-input' type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
          <EyeInvisibleOutlined className='eye-icon' />
          <input className='password-input' type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <div>
            <label>
              <input className='remember-check' type='checkbox' checked={isChecked} onChange={handleCheckboxChange} />
              <p className='remember-text'>Remember me</p>
            </label>
            <Link to='/home'>
              <button className='login-button'>Login</button>
            </Link>
            <a href='/home'><p className='forgot-password'>Forgot Password ?</p></a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
