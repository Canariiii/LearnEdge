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
    phone: '',
    email: '',
    role: ''
  });
  const [userPicture, setUserPicture] = useState(null);
  const [currentPic, setCurrentPic] = useState(null);
  // En tu componente de React, donde obtienes el userId del localStorage
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

  const fetchUsers = () => {
    axios.get('http://localhost:3001/admin/users', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(response => {
        setUsers(response.data.data);
        const adminUser = response.data.data.find(user => user.role === 'admin');
        if (adminUser) {
          setAdminId(adminUser._id);
        }
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3001/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchUsers();
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error('User not found:', error.response.data.error);
      } else {
        console.error('Error deleting user:', error);
      }
    }
  };

  const togglePopup = (userId) => {
    setUserId(userId);
    setShowPopup(!showPopup);
  };


  useEffect(() => {
    axios
      .get(`http://localhost:3001/admin/users/${userId}`)
      .then((response) => {
        const userData = response.data.data;
        setFormData({
          username: userData.username,
          phone: userData.phone,
          email: userData.email,
          role: userData.role,
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
      if (!adminId) {
        console.error('Admin ID not available');
        return;
      }
      const updatedFormData = new FormData();
      updatedFormData.append('username', formData.username);
      updatedFormData.append('phone', formData.phone);
      updatedFormData.append('email', formData.email);
      updatedFormData.append('role', formData.role);
      if (userPicture) {
        updatedFormData.append('filename', userPicture);
      } else {
        updatedFormData.append('filename', currentPic);
      }
      const response = await axios.put(
        `http://localhost:3001/admin/users/${adminId}/${userId}`,
        updatedFormData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log('User updated:', response.data);
      onClose();
    } catch (error) {
      console.error('Error updating user:', error);
    }
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
                onClick={() => deleteUser(user._id)}
              />
            </div>
          </li>
        ))}
      </ul>
      {showPopup && (
        <form className='edit-user-form-popup' onSubmit={handleSubmit}>
          <p>Username</p>
          <input type='text' name='username' placeholder='New Username' onChange={handleChange} value={formData.username}></input>
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
