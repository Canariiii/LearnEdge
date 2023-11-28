import React, { useState, useEffect, useCallback } from 'react';
import './header.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [filename, setFilename] = useState(null);
  const [userId, setUserId] = useState('');

  const showData = useCallback(() => {
    if (userId && userId !== '') {
      axios.get(`http://localhost:3001/users/profile/${userId}`)
        .then(response => {
          setFilename(`http://localhost:3001/user-images/${response.data.data.filename}`);
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
    showData();
  }, [userId, showData]);

  return (
    <header className="header">
      <div className="logo-container">
        <img src={'/assets/img/logo.png'} alt="Logo" className="logo" />
      </div>
      <div className='line-header'></div>
      <nav>
        <ul className='header-container'>
          <li><a href='/courses'>Courses</a></li>
          <li>My Courses</li>
          <Link to={'/profile'}>
            <li><img className='user-pic' src={filename} alt='pic' ></img></li>
          </Link>
        </ul>
      </nav>
      <div className='line-bottom-header'></div>
    </header>
  );
}

export default Header;
