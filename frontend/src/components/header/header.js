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
          <li>Home</li>
          <li>Courses</li>
          <li>My Courses</li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
