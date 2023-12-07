import React, { useState, useEffect } from 'react';
import './manageUsers.css';
import Header from '../../components/header/header';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

function ManageUsers({ onClose }) {
  const [users, setUsers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    role: ''
  });
  const [userPicture, setUserPicture] = useState(null);
  const [currentPic, setCurrentPic] = useState(null);
  const [adminId, setAdminId] = useState('');
  const [userId, setUserId] = useState('');

  const onChange = (file) => {
    if (!file) {
      setUserPicture(currentPic);
      return;
    }
    setUserPicture(file);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3001/admin/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data.data);
      const adminUser = response.data.data.find((user) => user._id && user.role === 'admin');
      if (adminUser) {
        setAdminId(adminUser._id);
        console.log('Admin ID:', adminUser._id);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const deleteUser = async (adminId, userId) => {
    try {
      const userExists = users.find(user => user._id === userId);
      if (!userExists) {
        console.error('User not found:', userId);
        return;
      }

      await axios.delete(`http://localhost:3001/admin/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      // Espera a que la solicitud DELETE se complete antes de actualizar la lista
      await fetchUsers();
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error('User not found:', error.response.data.error);
      } else {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!adminId) {
        console.error('Admin ID not available');
        return;
      }
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not available');
        return;
      }
      const updatedFormData = new FormData();
      updatedFormData.append('username', formData.username);
      updatedFormData.append('email', formData.email);
      updatedFormData.append('phone', formData.phone);
      updatedFormData.append('role', formData.role);
      if (userPicture) {
        updatedFormData.append('filename', userPicture, userPicture.name);
      } else {
        updatedFormData.append('filename', currentPic);
      }
      console.log('Token:', localStorage.getItem('token'));
      const response = await axios.put(
        `http://localhost:3001/admin/users/${adminId}/${userId}`,
        updatedFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('User updated:', response.data);
      onClose();
    } catch (error) {
      console.error('Error updating user:', error);

      if (error.response) {
        console.error('Response data:', error.response?.data);
        console.error('Response status:', error.response?.status);
        console.error('Response headers:', error.response?.headers);
      }
    }
  };

  const togglePopup = (userId) => {
    setUserId(userId);
    setShowPopup(!showPopup);
  };


  useEffect(() => {
    axios.get(`http://localhost:3001/admin/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        const userData = response.data.data;
        if (userData) {
          setFormData({
            username: userData.username || '',
            email: userData.email || '',
            phone: userData.phone || '',
            role: userData.role || '',
          });
          setCurrentPic(userData.filename || null);
        }
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, [userId]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Header />
      <h1 className='list-user-title'>Users</h1>
      <ul className='list-users'>
        {users.map(user => (
          <li key={user._id}>
            <div>
              <img src={`http://localhost:3001/user-images/${user.filename}`} alt={user.username} />
            </div>
            <div>
              <p>{user.username}</p>
              <FontAwesomeIcon
                className='edit-icon'
                icon={faPenToSquare}
                style={{ color: "#000000" }}
                onClick={() => togglePopup(user._id)}
              />
              <FontAwesomeIcon
                className='trash-icon'
                icon={faTrash}
                style={{ color: "#000000" }}
                onClick={() => deleteUser(adminId, user._id)}
              />
            </div>
          </li>
        ))}
      </ul>
      {showPopup && (
        <form className='edit-user-form-popup' onSubmit={handleSubmit}>
          <p>Username</p>
          <input type='text' name='username' placeholder='New Username' onChange={handleChange} value={formData.username || ''}></input>
          <p>Email</p>
          <input type='text' name='email' placeholder='New Email' onChange={handleChange} value={formData.email}></input>
          <p>Phone</p>
          <input type='text' name='phone' placeholder='New Phone' onChange={handleChange} value={formData.phone}></input>
          <p>Role</p>
          <input type='text' name='role' placeholder='New Role' onChange={handleChange} value={formData.role}></input>
          <input type='file' id='fileInput' onChange={(event) => onChange(event.target.files[0] || null)}></input>
          <label htmlFor='fileInput' className='fileLabel'>Search...</label>
          <button type='submit'>Save Changes</button>
        </form>
      )}
    </div>
  );
}

export default ManageUsers;
