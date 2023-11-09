import React, { useState } from 'react';
import './signup.css';
import { Link } from 'react-router-dom';
import { GoogleOutlined, FacebookOutlined, GithubOutlined } from '@ant-design/icons';

function SignUp() {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');


  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (password && e.target.value !== password) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };

  return (
    <div className='signup-container'>
      <a className='logo-signup' href='/login'><img src={process.env.PUBLIC_URL + '/assets/img/logo.png'} alt='logo' className='logo-img-signup' /></a>
      <img src={process.env.PUBLIC_URL + '/assets/img/background.jpg'} alt='background' className='background-img-signup' />
      <p className='join'>Join Now .!</p>
      <div className='line'></div>
      <p className='scare'>Scare to join ?</p>
      <div className='signup-border'>
        <p className='signup-text'>Sign Up</p>
        <p className='details-text'>Just some details to get you in.!</p>
        <input className='username-signup' type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
        <input className='email-signup' type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className='password-signup' type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <input className='confirm-password-signup' type='password' placeholder='Confirm Password' value={confirmPassword} onChange={handleConfirmPasswordChange} />
        {passwordError && <p className='error-message'>{passwordError}</p>}
        <Link to='/home'>
          <button className='signup-button'>Signup</button>
        </Link>
        <div className='line-or-first-signup'><p className='or-text-signup'>Or</p></div>
        <div className='second-or-first-signup'></div>
        <div className='social-container-signup'>
            <GoogleOutlined className='social-icon' />
            <FacebookOutlined className='social-icon' />
            <GithubOutlined className='social-icon' />
          </div>
        <p className='already-signup'>Already registered ? <a href='/login'>Login</a></p>
        <div className='terms-support-container-signup'>
          <p>Terms & Conditions</p>
          <p>Support</p>
          <p>Customer Care</p>
        </div>
      </div>
      <div className='first-ellipse'></div>
      <div className='second-ellipse'></div>
    </div>
  );
}

export default SignUp;