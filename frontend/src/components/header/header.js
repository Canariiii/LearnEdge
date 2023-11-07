import React from 'react';
import './header.css';
import { SearchOutlined, BellOutlined, MailOutlined, 
  CommentOutlined, TableOutlined, ClockCircleOutlined, 
  CheckOutlined, TeamOutlined, FileOutlined,
  SettingOutlined, LogoutOutlined } from '@ant-design/icons';

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
      <nav className='left-sidebar'>
        <ul className='left-container'>
          <TableOutlined className='table-icon' />
          <ClockCircleOutlined className='clock-icon'/>
          <CheckOutlined className='check-icon'/>
          <TeamOutlined className='instructors-icon'/>
          <FileOutlined className='note-icon' />
          <SettingOutlined className='setting-icon'/>
          <LogoutOutlined className='logout-icon'/>
          <li className='overview-text'>Courses Overview</li>
          <li className='upcoming-text'>Upcoming Classes</li>
          <li className='grades-text'>Grades</li>
          <li className='instructors-text'>Instructors</li>
          <li className='notes-text'>Course Notes</li>
          <li className='setting-text'>Settings</li>
          <li className='logout-text'>Log Out</li>
        </ul>
      </nav>
      <nav className='right-sidebar'>
        <ul className='right-container'>
          <li className='current-text'>Current Lesson</li>
          <li className='inbox-text'>Inbox</li>
        </ul>
      </nav>
    </header >
  );
}

export default Header;
