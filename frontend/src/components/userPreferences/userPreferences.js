import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './userPreferences.css';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UserPreferencesForm = ({ userId, onClose }) => {
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    email: '',
  });
  const [userPicture, setUserPicture] = useState(null);
  const [currentPic, setCurrentPic] = useState(null);

  const fileToDataUri = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.readAsDataURL(file);
    });

  const onChange = (file) => {
    if (!file) {
      setUserPicture();
      return;
    }
    fileToDataUri(file).then((dataUri) => {
      setUserPicture(file);
    });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/users/profile/${userId}`)
      .then((response) => {
        const userData = response.data.data;
        setFormData({
          username: userData.username,
          phone: userData.phone,
          email: userData.email
        });
        setCurrentPic(userData.filename);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, [userId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedFormData = new FormData();
      updatedFormData.append('username', formData.username);
      updatedFormData.append('phone', formData.phone);
      updatedFormData.append('email', formData.email);
      if (userPicture) {
        updatedFormData.append('filename', userPicture);
      } else {
        updatedFormData.append('filename', currentPic);
      }
      const response = await axios.put(
        `http://localhost:3001/users/profile/${userId}`,
        updatedFormData
      );
      console.log('Preferences updated:', response.data);
      onClose();
    } catch (error) {
      console.error('Error updating preferences:', error);
    }
  };


  return (
    <div>
      <h1 className='my-data'>My Data</h1>
      <div className='my-data-line'></div>
      <form className='form-container' onSubmit={handleSubmit}>
        <FontAwesomeIcon icon={faPlus} className='plus-icon' />
        <p>Username</p>
        <input type='text' placeholder='username' onChange={handleChange}></input>
        <p>Email</p>
        <input type='text' placeholder='email' onChange={handleChange}></input>
        <p>Phone</p>
        <input type='text' placeholder='phone' onChange={handleChange}></input>
        <p>Password</p>
        <input type='text' placeholder='password' onChange={handleChange}></input>
        <p>Repeat Password</p>
        <input type='text' placeholder='repeat password' onChange={handleChange}></input>
      </form>
    </div>
  );
};

export default UserPreferencesForm;
