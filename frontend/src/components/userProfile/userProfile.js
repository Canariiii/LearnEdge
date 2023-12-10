import React, { useState, useEffect, useCallback } from 'react';
import './userProfile.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faX } from '@fortawesome/free-solid-svg-icons';

const UserProfile = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [filename, setFilename] = useState(null);
  const [userId, setUserId] = useState('');
  const [userRole, setUserRole] = useState('');
  const [activeCourses, setActiveCourses] = useState([]);

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
        })
        .catch(error => {
          console.error('Error fetching user profile:', error);
        });
    }
  }, [userId]);


  const showInstructorCourses = useCallback(() => {
    if (userId && userId !== '') {
      axios.get(`http://localhost:3001/users/profile/${userId}`)
        .then(response => {
          if (response.data.data.role === 'instructor') {
            const instructorId = response.data.data._id;
            axios.get(`http://localhost:3001/instructors/active-courses/${instructorId}`)
              .then(coursesResponse => {
                console.log("Courses Response:", coursesResponse.data); // Agrega este log para depuración
                setActiveCourses(coursesResponse.data.data);
              })
              .catch(error => {
                console.error('Error fetching active courses:', error);
              });
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
    showInstructorCourses();
  }, [userId, showData, showInstructorCourses]);

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
      {userRole === 'instructor' && activeCourses.length > 0 && (
        <>
          <p className='instructor-courses'>Active Courses</p>
          <ul className='instructor-active-courses'>
            {activeCourses.map(course => (
              <li key={course._id}>
                <div>
                  <img src={`http://localhost:3001/user-images/${course.filename}`} alt={course.title} />
                </div>
                <div>
                  <p>{course.title}</p>
                  <FontAwesomeIcon className='edit-course' icon={faPenToSquare} style={{ color: "#000000" }} />
                  <FontAwesomeIcon className='delete-course' icon={faX} style={{ color: "#000000", }} />
                </div>
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
