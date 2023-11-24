import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={'/assets/img/logo.png'} alt="Logo" className="logo" />
      </div>
      <div className='line-header'></div>
      <nav>
        <ul className='header-container'>
          <li><a href='/courses'>Courses</a></li>
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
