import React from 'react';
import './header.css';
import { SearchOutlined } from '@ant-design/icons';

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <p className='header-text'>Get Started</p>
        <div className='container'>
          <SearchOutlined className='search-icon' />
          <input type='text' placeholder='Search for courses' />
        </div>
      </nav>
    </header >
  );
}

export default Header;