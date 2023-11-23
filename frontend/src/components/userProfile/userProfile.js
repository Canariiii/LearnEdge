import React, { useState, useEffect } from 'react';
import './userProfile.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Modal, Form, Input } from 'antd';

const UserProfile = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [filename, setFilename] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const MyFormItemContext = React.createContext([]);

  function toArr(str) {
    return Array.isArray(str) ? str : [str];
  };

  const MyFormItemGroup = ({ prefix, children }) => {
    const prefixPath = React.useContext(MyFormItemContext);
    const concatPath = React.useMemo(() => [...prefixPath, ...toArr(prefix)], [prefixPath, prefix]);
    return <MyFormItemContext.Provider value={concatPath}>{children}</MyFormItemContext.Provider>;
  };

  const MyFormItem = ({ name, ...props }) => {
    const prefixPath = React.useContext(MyFormItemContext);
    const concatName = name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;
    return <Form.Item name={concatName} {...props} />;
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (value) => {
    console.log(value);
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
            <Form name="form_item_path" layout="vertical" onFinish={onFinish}>
              <MyFormItemGroup prefix={['user']}>
                <MyFormItemGroup prefix={['name']}>
                  <MyFormItem name="username" label="username">
                    <Input />
                  </MyFormItem>
                  <MyFormItem name="email" label="email">
                    <Input />
                  </MyFormItem>
                </MyFormItemGroup>
                <MyFormItem name="age" label="age">
                  <Input />
                </MyFormItem>
                <MyFormItem name="phone" label="phone">
                  <Input />
                </MyFormItem>
              </MyFormItemGroup>
            </Form>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
