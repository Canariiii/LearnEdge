import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import { EyeInvisibleOutlined, GoogleOutlined, FacebookOutlined, GithubOutlined, EyeOutlined } from '@ant-design/icons';
import UserService from '../../services/loginService';

function Login() {
  const [isChecked, setIsChecked] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async () => {
    if (!username || !password) {
      console.error('Username and password are required.');
      return;
    }
  
    try {
      const response = await UserService.login({ username, password });
  
      // Solo redirigir si el inicio de sesión fue exitoso
      if (response.success) {
        localStorage.setItem('token', response.token);
        navigate('/courses');
      } else {
        console.error('Login failed:', response.error);
      }
    } catch (error) {
      console.error('Error while logging in:', error);
      if (error.response) {
        console.error('Server responded with status code:', error.response.status);
        console.error('Response data:', error.response.data);
      } else {
        console.error('Error setting up the request:', error.message);
      }
    }
  };
  

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/courses');
    }
  }, [navigate]);

  return (
    <div className='login-container'>
      <img src={process.env.PUBLIC_URL + '/assets/img/logo.png'} alt='logo' className='logo-img logo' />
      <img src={process.env.PUBLIC_URL + '/assets/img/background.jpg'} alt='background' className='background-img' />
      <p className='welcome'>Welcome Back .!</p>
      <div className='line-login'></div>
      <p className='skipthelag'>Skip the lag ?</p>
      <div className='login-border'>
        <form className='login-form'>
          <p className='login-text'>Login</p>
          <p className='glad-text'>Glad you're back.!</p>
          <input className='username-input' type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
          <input className='password-input' type={showPassword ? 'text' : 'password'} placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <div className='eye-icon' onClick={toggleShowPassword}>
            {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
          </div>
          <div className='remember-me-container'>
            <label className='checkbox-label'>
              <input className='remember-check' type='checkbox' checked={isChecked} onChange={handleCheckboxChange} />
              <span className='custom-checkbox'></span>
              <p className='remember-text'>Remember me</p>
            </label>
          </div>
          <Link to='/courses'>
            <button className='login-button' onClick={handleSubmit}>Login</button>
          </Link>
          <a href='/home'><p className='forgot-password'>Forgot Password ?</p></a>
          <div className='line-or-first'><p className='or-text'>Or</p></div>
          <div className='second-or-first'></div>
          <div className='social-container'>
            <GoogleOutlined className='social-icon' />
            <FacebookOutlined className='social-icon' />
            <GithubOutlined className='social-icon' />
          </div>
          <p className='signup'>Don't have an account ? <a href='/signup'>Sign Up</a></p>
          <div className='terms-support-container'>
            <p>Terms & Conditions</p>
            <p>Support</p>
            <p>Customer Care</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
