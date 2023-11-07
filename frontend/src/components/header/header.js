import React from 'react';
import './header.css';
import { SearchOutlined, BellOutlined, MailOutlined, 
  CommentOutlined } from '@ant-design/icons';

const Header = () => {
  return (
    <header className="header">
      <nav>
        <p className='text'>Get Started</p>
        <div className='container'>
          <SearchOutlined className='search-icon' />
          <input type='text' placeholder='Search for courses' />
          <a href='/'><BellOutlined className='bell-icon' /></a>
          <a href='/'><MailOutlined className='mail-icon' /></a>
          <a href='/'><CommentOutlined className='comment-icon' /></a>
        </div>
      </nav>
    </header >
  );
}

export default Header;
