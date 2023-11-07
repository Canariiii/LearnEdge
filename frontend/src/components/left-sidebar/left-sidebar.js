import React from 'react';
import './left-sidebar.css';
import {
  TableOutlined, ClockCircleOutlined,
  CheckOutlined, TeamOutlined, FileOutlined,
  SettingOutlined, LogoutOutlined
} from '@ant-design/icons';

const LeftSidebar = () => {
  return (
      <nav className='left-sidebar'>
        <ul className='left-container'>
          <TableOutlined className='table-icon' />
          <ClockCircleOutlined className='clock-icon' />
          <CheckOutlined className='check-icon' />
          <TeamOutlined className='instructors-icon' />
          <FileOutlined className='note-icon' />
          <SettingOutlined className='setting-icon' />
          <LogoutOutlined className='logout-icon' />
          <li className='overview-text'>Courses Overview</li>
          <li className='upcoming-text'>Upcoming Classes</li>
          <li className='grades-text'>Grades</li>
          <li className='instructors-text'>Instructors</li>
          <li className='notes-text'>Course Notes</li>
          <li className='setting-text'>Settings</li>
          <li className='logout-text'>Log Out</li>
        </ul>
      </nav>
  );
}

export default LeftSidebar;
