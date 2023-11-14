import React from 'react';
import './userProfile.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faGear);

document.body.classList.add('user-page');

const UserProfile = () => {
  return (
    <div className='userContainer'>
      <div className='user-border'>
        <img className='profile-pic' src='/assets/img/user.jpeg' alt='profilePic'></img>
        <h1 className='user-name'>Jose</h1>
        <h2 className='user-age'>24</h2>
        <a href='/'><FontAwesomeIcon className='gear-icon' icon={faGear} spin style={{ color: "#feffff" }} /></a>
      </div>
    </div>
  );
}

export default UserProfile;
