import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './userPreferences.css';

const UserPreferencesForm = ({ userId, onClose }) => {
  const [filename, setFilename] = useState(''); // Asegúrate de que setFilename esté definido
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    email: '',
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/users/profile/${userId}`)
      .then(response => {
        const userData = response.data.data;
        setFormData({
          username: userData.username,
          phone: userData.phone,
          email: userData.email,
        });
        setFilename(`http://localhost:3001/user-images/${userData.filename}`);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, [userId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUserPic = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedFormData = new FormData();
      updatedFormData.append('username', formData.username);
      updatedFormData.append('phone', formData.phone);
      updatedFormData.append('email', formData.email);

      if (file) {
        updatedFormData.append('filename', file);
      }
      const response = await axios.put(`http://localhost:3001/users/profile/${userId}`, updatedFormData);
      console.log('Preferences updated:', response.data);
      const newFilename = `http://localhost:3001/user-images/${response.data.data.filename}`;
      console.log('New filename:', newFilename);
      setFilename(newFilename);
      onClose();
    } catch (error) {
      console.error('Error updating preferences:', error);
    }
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
      <label>
        User Picture:
        <input type='file' onChange={handleUserPic} />
      </label>
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default UserPreferencesForm;
