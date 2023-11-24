import React, { useState, useEffect } from 'react';
import './userProfile.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Modal, Form, Input } from 'antd';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const onFinish = (values) => {
  console.log(values);
};

const UserProfile = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [filename, setFilename] = useState('');
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
        if (!response.data.data.filename){
          console.log('No image receive. Setting a default pic')
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

  return (
    <div className='userContainer'>
      <div className='user-border'>
        <img className='profile-pic' src={filename} alt='profilePic' />
        <h1 className='user-name'>{username}</h1>
        <div className='button-container'>
          <button onClick={logOut} className='logout-button'>Logout</button>
          <Button className='settings-button' type="primary" onClick={showModal}>Preferences</Button>
          <Modal title="User Settings" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Form {...layout} name="nest-messages" onFinish={onFinish} style={{ maxWidth: 600, }} validateMessages={validateMessages}>
              <Form.Item name={['user', 'name']} label="New username" rules={[{ required: false, },]}><Input /></Form.Item>
              <Form.Item name={['user', 'email']} label="New Email" rules={[{ type: 'email', },]}><Input /></Form.Item>
              <Form.Item name={['user', 'password']} label="New Password" rules={[{ type: 'email', },]}><Input /></Form.Item>
              <Form.Item name={['user', 'phone']} label="New Phone" rules={[{ type: 'email', },]}><Input /></Form.Item>
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8, }}>
                <Button type="primary" htmlType="submit">Submit</Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
