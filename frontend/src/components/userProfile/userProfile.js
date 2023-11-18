import React from 'react';
import './userProfile.css';
import { Link, useNavigate } from 'react-router-dom';

document.body.classList.add('user-page');

const UserProfile = () => {

  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className='userContainer'>
      <div className='user-border'>
        <img className='profile-pic' src='/assets/img/user.jpeg' alt='profilePic'></img>
        <h1 className='user-name'>Jose</h1>
        <div className='button-container'>
          <Link onClick={logOut} to={'/login'}>
            <button className='logout-button'>Logout</button>
          </Link>
          <Link>
            <button className='settings-button'>Preferences</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
