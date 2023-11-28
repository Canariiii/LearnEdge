import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './userPreferences.css';

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
      setUserPicture(null);
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
        setCurrentPic(userData.filename);
        setFormData({
          username: userData.username,
          phone: userData.phone,
          email: userData.email
        });
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
    <form className='preferences-form' onSubmit={handleSubmit}>
      <label>
        Username:
        <input type='text' name='username' value={formData.username} onChange={handleChange} />
      </label>
      <label>
        Phone:
        <input type='text' name='phone' value={formData.phone} onChange={handleChange} />
      </label>
      <label>
        Email:
        <input type='text' name='email' value={formData.email} onChange={handleChange} />
      </label>
      <label>
        User Picture:
        <input type='file' onChange={(event) => onChange(event.target.files[0] || null)} />
      </label>
      <button type='submit'>Save Changes</button>
    </form>
  );
};

export default UserPreferencesForm;
