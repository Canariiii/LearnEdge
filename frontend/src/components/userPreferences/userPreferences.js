import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './userPreferences.css';

const UserPreferencesForm = ({ userId, onClose }) => {
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    email: '',
    filename: '',
  });

  useEffect(() => {
    axios.get(`http://localhost:3001/users/profile/${userId}`)
      .then(response => {
        const userData = response.data.data;
        setFormData({
          username: userData.username,
          phone: userData.phone,
          email: userData.email,
          filename: userData.filename,
        });
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, [userId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/users/profile/${userId}`, formData)
      .then(response => {
        console.log('Preferences updated:', response.data);
        onClose();
      })
      .catch(error => {
        console.error('Error updating preferences:', error);
      });
  };

  return (
    <form className='preferences-form' onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" name="username" value={formData.username} onChange={handleChange} />
      </label>
      <label>
        Phone:
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
      </label>
      <label>
        Email:
        <input type="text" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default UserPreferencesForm;
