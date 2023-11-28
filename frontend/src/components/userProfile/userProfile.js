import React, { useState, useEffect, useCallback } from 'react';
import './userProfile.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserPreferencesForm from '../userPreferences/userPreferences';

const UserProfile = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [filename, setFilename] = useState('');
  const [userId, setUserId] = useState('');
  const [showPreferences, setShowPreferences] = useState(false);

  const showData = useCallback(() => {
    if (userId && userId !== '') {
      axios.get(`http://localhost:3001/users/profile/${userId}`)
        .then(response => {
          setUsername(response.data.data.username);
          setFilename(`http://localhost:3001/user-images/${response.data.data.filename}`);
          if (!response.data.data.filename) {
            console.log('No image received.');
            setFilename('/assets/img/user.jpeg');
          }
        })
        .catch(error => {
          console.error('Error fetching user profile:', error);
        });
    }
  }, [userId]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log("error");
      navigate('/login');
      return;
    }
    const storedUserId = localStorage.getItem('userId');
    setUserId(storedUserId);
  }, [navigate]);

  useEffect(() => {
    showData();
  }, [userId, showData]);

  const logOut = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handlePreferencesClick = () => {
    setShowPreferences(true);
  };

  const handleClosePreferences = () => {
    showData();
    setShowPreferences(false);
  };

  return (
    <div className='userContainer'>
      <div className='user-border'>
        <img className='profile-pic' src={filename} alt='profilePic' />
        <h1 className='user-name'>{username}</h1>
        <div className='button-container'>
          <button onClick={logOut} className='logout-button'>Logout</button>
          <button onClick={handlePreferencesClick} className='settings-button'>Preferences</button>
        </div>
        {showPreferences && (
          <UserPreferencesForm userId={userId} onClose={handleClosePreferences} />
        )}
      </div>
    </div>
  );
};

export default UserProfile;
