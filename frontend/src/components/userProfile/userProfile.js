import React, { useState, useEffect } from 'react';
import './userProfile.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserProfile = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (!token) {
      console.log("error");
      navigate('/login');
      return;
    }
    axios.get(`http://localhost:3001/users/profile/${userId}`)
      .then(response => {
        setUsername(response.data.data.username);
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
      });
  }, [navigate]);

  const logOut = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    navigate('/login'); 
  };  

  return (
    <div className='userContainer'>
      <div className='user-border'>
        <img className='profile-pic' src={'/assets/img/user.jpeg'} alt='profilePic' />
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
