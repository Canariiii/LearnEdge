import React, { useState, useEffect, useCallback } from 'react';
import './userProfile.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserProfile = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [filename, setFilename] = useState(null);
  const [userId, setUserId] = useState('');
  const [userRole, setUserRole] = useState('');
  const [activeCourses, setActiveCourses] = useState([]);
  const [currentCourses, setCurrentCourses] = useState([]);

  const showData = useCallback(() => {
    if (userId && userId !== '') {
      axios.get(`http://localhost:3001/users/profile/${userId}`)
        .then(response => {
          setUsername(response.data.data.username);
          setUserRole(response.data.data.role);
          setFilename(`http://localhost:3001/user-images/${response.data.data.filename}`);
          if (!response.data.data.filename) {
            console.log('No image received.');
            setFilename('/assets/img/user.jpeg');
          }
          const courses = response.data.data.currentCourses || [];
        
          // Maneja los cursos actuales del instructor
          setCurrentCourses(courses);
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
    showData();// Nueva llamada para obtener cursos activos del instructor
    if (userRole === 'instructor') {
      axios.get(`http://localhost:3001/instructors/${userId}/currentCourses`)
        .then(response => {
          setActiveCourses(response.data.data);
        })
        .catch(error => {
          console.error('Error fetching active courses:', error);
        });
    }
  }, [userId, showData, userRole]);
  
  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    navigate('/');
  };

  const goToUserPreferencesForm = () => {
    navigate('/user-preferences-form');
  }

  const goToManage = () => {
    navigate('/manage');
  }

  return (
    <div className='user-container'>
      <img src={filename} alt='profilePic' />
      <h1 className='user-name'>{username}</h1>
      <div className='user-line'></div>
      <div className='button-container'>
        <button onClick={logOut}>Logout</button>
        <button onClick={goToUserPreferencesForm} >Preferences</button>
      </div>
      {(userRole === 'instructor' || userRole === 'student') && (
        <>
        <p>Current courses</p>
        <ul className='current-courses-instructor'>
          {currentCourses.map(course => (
            <li key={course._id}>
              <h3>{course.title}</h3>
              <img src={`http://localhost:3001/course-images/${course.filename}`} alt={`Course: ${course.title}`} />
            </li>
          ))}
        </ul>
      </>
      )}
      {userRole === 'admin' && (
        <button onClick={goToManage} className='manage-button'>Manage</button>
      )}
    </div>
  );
};

export default UserProfile;
