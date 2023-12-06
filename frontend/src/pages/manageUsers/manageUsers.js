import React, { useState, useEffect } from 'react';
import './manageUsers.css';
import Header from '../../components/header/header';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

function ManageUsers() {
  const [users, setUsers] = useState([]);

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

  return (
    <div>
      <Header />
      <h1>Users</h1>
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
    </div>
  );
}

export default ManageUsers;
