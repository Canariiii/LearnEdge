import React, { useState, useEffect } from 'react';
import './userProfile.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserProfile = ({ userId }) => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  useEffect(() => {
    // Realizar la solicitud GET al servidor Express
    axios.get(`http://localhost:3001/users/profile/${userId}`)
      .then(response => {
        setNombre(response.data.username);
      })
      .catch(error => {
        console.error('Error al obtener el nombre del usuario:', error);
      });
  }, [userId]);
  const logOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className='userContainer'>
      <div className='user-border'>
        <img className='profile-pic' src={'/assets/img/user.jpeg'} alt='profilePic' />
        <h1 className='user-name'>{nombre}</h1>
        <div className='button-container'>
          <button onClick={logOut} className='logout-button'>
            Logout
          </button>
          <button className='settings-button'>Preferences</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
