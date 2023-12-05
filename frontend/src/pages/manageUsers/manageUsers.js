import React, { useCallback, useState, useEffect } from "react";
import './manageUsers.css';
import Header from "../../components/header/header";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


function ManageUsers() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [filename, setFilename] = useState(null);
  const [userId, setUserId] = useState('');

  const fetchUsers = useCallback(() => {
    if (userId && userId !== '') {
      axios.get(`http://localhost:3001/users`)
        .then(response => {
          setUsername(response.username);
          setFilename(`http://localhost:3001/user-images/${response.filename}`);
          if (!response.data.data.filename) {
            console.log('No image received.');
            setFilename('/assets/img/user.jpeg');
          }
        })
        .catch(error => {
          console.error('Error fetching user profile:', error);
        });
    }
  }, [userId]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log("error");
      navigate('/login');
      return;
    }
    const storedUserId = localStorage.getItem('userId');
    setUserId(storedUserId);
  }, [navigate]);

  useEffect(() => {
    fetchUsers();
  }, [userId, fetchUsers]);

  return (
    <div className="manage-users-container">
      <Header />
      <ul>
        <li>{filename}{username}</li>
      </ul>
    </div>
  );
}

export default ManageUsers;