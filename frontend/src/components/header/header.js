import React from 'react';
import './header.css';
import { SearchOutlined } from '@ant-design/icons';

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <div className='container'>
          <p className='header-text'>Get Started</p>
          <SearchOutlined className='search-icon'/>
          <input type='text' placeholder='Search for courses' />
        </div>
      </nav>
    </header >
  );
}

export default Header;