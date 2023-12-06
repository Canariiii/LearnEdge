import React, { useState, useEffect } from 'react';
import './manageUsers.css';
import Header from '../../components/header/header';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

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

  const togglePopup = () => {
    setShowPopup(!showPopup);
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
                onClick={togglePopup}
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
      <form className='edit-user-form-popup'>
        <p>Username</p>
        <input type='text' placeholder='New Username'></input>
        <p>Email</p>
        <input type='text' placeholder='New Email'></input>
        <p>Phone</p>
        <input type='text' placeholder='New Phone'></input>
        <p>Role</p>
        <input type='text' placeholder='New Role'></input>
        <input type='file'></input>
        <label htmlFor='fileInput' className='fileLabel'>Search...</label>
        <button>Save Changes</button>
      </form>)
      }
    </div>
  );
}

export default ManageUsers;
