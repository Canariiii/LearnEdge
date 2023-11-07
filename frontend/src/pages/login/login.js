import React from 'react';
import './login.css'; // Asegúrate de importar el archivo CSS correspondiente

function Login() {
  return (
    <div className='login-container'>
      <a className='logo' href='/login'><img src={process.env.PUBLIC_URL + '/assets/img/logo.png'} alt='logo' className='logo-img' /></a>
      <img src={process.env.PUBLIC_URL + '/assets/img/background.jpg'} alt='background' className='background-img' />
      <p className='welcome'>Welcome Back .!</p>
      <div className='line'></div>
      <p className='skipthelag'>Skip the lag ?</p>
    </div>
  );
}

export default Login;
