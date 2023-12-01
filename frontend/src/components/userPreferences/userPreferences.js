import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './userPreferences.css';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UserPreferencesForm = ({ userId = localStorage.getItem('userId'), onClose }) => {
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    email: '',
  });
  const [userPicture, setUserPicture] = useState(null);
  const [currentPic, setCurrentPic] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const onChange = (file) => {
    if (!file) {
      setUserPicture(currentPic);
      return;
    }
    setUserPicture(file);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/users/user-preferences-form/${userId}`)
      .then((response) => {
        const userData = response.data.data;
        setFormData({
          username: userData.username,
          phone: userData.phone,
          email: userData.email
        });
        setCurrentPic(userData.filename);
        console.log('filename: ', userData.filename);
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

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div>
      <h1 className='my-data'>My Data</h1>
      <div className='my-data-line'></div>
      <form className='form-container' onSubmit={handleSubmit}>
        <p>Username</p>
        <input type='text' name='username' onChange={handleChange} placeholder='new username'></input>
        <p>Email</p>
        <input type='text' name='email' onChange={handleChange} placeholder='new email'></input>
        <p>Phone</p>
        <input type='text' name='phone' onChange={handleChange} placeholder='new phone'></input>
        <p>Password</p>
        <input type='text' placeholder='new password' ></input>
        <p>Repeat Password</p>
        <input type='text' placeholder='repeat password'></input>
        <p>Change Avatar</p>
        <FontAwesomeIcon icon={faPlus} className='plus-icon' onClick={togglePopup} />
        <button className='save-changes-button' type='submit'>Save Changes</button>
      </form>
      {showPopup && (
        <div className='avatar-popup'>
          <input type='file' id='fileInput' onChange={(event) => onChange(event.target.files[0] || null)} />
          <label htmlFor='fileInput' className='fileLabel'>Search...</label>
          <p>Avatar preview</p>
          {userPicture && <img src={URL.createObjectURL(userPicture)} alt='Avatar preview' />}
        </div>
      )}
    </div>
  );
};

export default UserPreferencesForm;
