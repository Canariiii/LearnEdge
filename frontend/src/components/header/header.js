import React from 'react';
import './header.css';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {

  const navigate = useNavigate();
  
  const logOut = () => {
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
          <li>Courses</li>
          <li>My Courses</li>
          <Link to={'/profile'}>
            <li><img className='user-pic' src='/assets/img/user.jpeg' alt='pic' ></img></li>
          </Link>
        </ul>
      </nav>
      <div className='line-bottom-header'></div>
    </header>
  );
}

export default Header;
