import React from 'react';
import './header.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {

  const navigate = useNavigate();

  const logOut = () => {
    console.log('token removed');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="logo-container">
        <img src={'/assets/img/logo.png'} alt="Logo" className="logo" />
      </div>
      <div className='line-header'></div>
      <nav>
        <ul className='header-container'>
          <li>Home</li>
          <li>Courses</li>
          <li>My Courses</li>
          <li><img className='user-pic' src='/assets/img/user.jpeg' alt='pic' onClick={logOut}></img></li>
        </ul>
      </nav>
      <div className='line-bottom-header'></div>
    </header>
  );
}

export default Header;
