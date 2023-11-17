import React from 'react';
import './userProfile.css';

document.body.classList.add('user-page');

const UserProfile = () => {
  return (
    <div className='userContainer'>
      <div className='user-border'>
        <img className='profile-pic' src='/assets/img/user.jpeg' alt='profilePic'></img>
        <h1 className='user-name'>Jose</h1>
        <h2 className='user-age'>24</h2>
        <div className='button-container'>
          <button className='logout-button'>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
