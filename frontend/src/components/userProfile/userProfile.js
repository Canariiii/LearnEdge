import React, { useState, useEffect } from 'react';
import './userProfile.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserPreferencesForm from '../userPreferences/userPreferences';

const UserProfile = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [filename, setFilename] = useState('');
  const [userId, setUserId] = useState(''); // Agrega userId al estado
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');
    setUserId(storedUserId); // Actualiza el estado con la userId
    if (!token) {
      console.log("error");
      navigate('/login');
      return;
    }
    axios.get(`http://localhost:3001/users/profile/${storedUserId}`)
      .then(response => {
        setUsername(response.data.data.username);
        setFilename(`http://localhost:3001/user-images/${response.data.data.filename}`);
        if (!response.data.data.filename) {
          console.log('No image receive.');
          setFilename('/assets/img/user.jpeg');
        }
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

  const handlePreferencesClick = () => {
    setShowPreferences(true);
  };

  const handleClosePreferences = () => {
    setShowPreferences(false);
  };

  return (
    <div className='userContainer'>
      <div className='user-border'>
        <img className='profile-pic' src={filename} alt='profilePic' onClick={logOut}/>
        <h1 className='user-name'>{username}</h1>
        <div className='button-container'>
          <button onClick={logOut} className='logout-button'>Logout</button>
          <button onClick={handlePreferencesClick} className='settings-button'>Preferences</button>
        </div>
        <button className='change-userpic'>Change Picture</button>
        {showPreferences && (
          <UserPreferencesForm userId={userId} onClose={handleClosePreferences} />
        )}
      </div>
    </div>
  );
};

export default UserProfile;
