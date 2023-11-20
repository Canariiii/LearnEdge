import React, { useState, useEffect } from 'react';
import './userProfile.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserProfile = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  const userId = localStorage.getItem('userId');
  console.log('userId:', userId);
  
  useEffect(() => {
    axios.get(`http://localhost:3001/users/profile/${userId}`)
      .then(response => {
        setUsername(response.data.data.username);
      })
      .catch(error => {
      });
  });

  const logOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className='userContainer'>
      <div className='user-border'>
        <img className='profile-pic' src={''} alt='profilePic' />
        <h1 className='user-name'>{username}</h1>
        <div className='button-container'>
          <button onClick={logOut} className='logout-button'>Logout</button>
          <button className='settings-button'>Preferences</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
