import React from 'react';
import './header.css';

const Header = () => {


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
          <li><img className='user-pic' src='/assets/img/user.jpeg' alt='pic' ></img></li>
        </ul>
      </nav>
      <div className='line-bottom-header'></div>
    </header>
  );
}

export default Header;
