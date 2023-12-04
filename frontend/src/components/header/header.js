import React, { useState, useEffect, useCallback } from 'react';
import './header.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

  const goToHome = () => {
    navigate("/courses");
  }

  return (
    <header className="header">
      <div>
        <img src={'/assets/img/logoBlack.png'} alt="Logo" className="logo" onClick={goToHome} />
      </div>
      <div className='line-header'></div>
      <div>
        <ul className='home-container'>
          <li className='li-home'><a href='/home'>Home</a></li>
          <li className='li-courses'><a href='/courses'>Courses</a></li>
          <li className='li-my-courses'>My Courses</li>
          <Link to={'/profile'}>
            <img className='user-pic' src={filename} alt='pic' ></img>
          </Link>
        </ul>
      </div>
      <FontAwesomeIcon className='bell-icon' icon={faBell} />
      <div className='right-line-header'></div>
      <div className='line-bottom-header'></div>
    </header>
  );
}

export default Header;
