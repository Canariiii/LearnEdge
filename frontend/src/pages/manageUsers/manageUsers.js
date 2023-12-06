import React, { useState, useEffect } from 'react';
import './manageUsers.css';
import Header from '../../components/header/header';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'; 

function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/admin/users')
      .then(response => {
        setUsers(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

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
              <FontAwesomeIcon className='edit-icon' icon={faPenToSquare} style={{color: "#000000"}} />
              <FontAwesomeIcon className='trash-icon' icon={faTrash} style={{color: "#000000" }} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageUsers;
