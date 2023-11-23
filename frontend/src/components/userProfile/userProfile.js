import React, { useState, useEffect } from 'react';
import './userProfile.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Modal } from 'antd';

const UserProfile = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [filename, setFilename] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);


  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


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
        setFilename(`http://localhost:3001/user-images/${response.data.data.filename}`);
        setEmail(response.data.data.email);
        setPhone(response.data.data.phone);
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
        <img className='profile-pic' src={filename} alt='profilePic' />
        <h1 className='user-name'>{username}</h1>
        <h1 className='user-email'>{email}</h1>
        <h1 className='user-phone'>{phone}</h1>
        <div className='button-container'>
          <button onClick={logOut} className='logout-button'>Logout</button>
          <Button className='settings-button' type="primary" onClick={showModal}>Preferences</Button>
          <Modal title="User Settings" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <div className='preferences-container'></div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
