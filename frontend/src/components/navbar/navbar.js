import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <header className="header">
      <div className='navbar-container'>
        <nav className="navbar">
          <img className='logo-img-home' src="/assets/img/logo.png" alt="" height={50} />
          <ul className="nav-links">
            <Link to='/login'>
              <button className='nav-login'>Login</button>
            </Link>
            <Link to='/signup'>
              <button className='nav-signup'>Signup</button>
            </Link>
            <div className='nav-line'></div>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default NavBar;