import React from 'react';
import './right-sidebar.css';

const RightSidebar = () => {
  return (
      <nav className='right-sidebar'>
        <ul className='right-container'>
          <li className='current-text'>Current Lesson</li>
          <li className='inbox-text'>Inbox</li>
        </ul>
      </nav>
  );
}

export default RightSidebar;
