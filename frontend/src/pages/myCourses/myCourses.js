import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { deleteCourse } from '../../services/courseService';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faX } from '@fortawesome/free-solid-svg-icons';
import './myCourses.css';

function MyCourses() {
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();
  const [activeCourses, setActiveCourses] = useState([]);
  const [userRole, setUserRole] = useState('');

  const fetchData = useCallback(() => {
    if (userId && userId !== '') {
      axios.get(`http://localhost:3001/users/profile/${userId}`)
        .then(response => {
          setUserRole(response.data.data.role);
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
                console.log("Courses Response:", coursesResponse.data);
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

  const handleDeleteCourse = (courseId) => {
    deleteCourse(courseId)
      .then((response) => {
        console.log("Course deleted successfully:", response);
        showInstructorCourses();
      })
      .catch((error) => {
        console.error("Error deleting course:", error);
      });
  };

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
    fetchData();
    showInstructorCourses();
  }, [userId, fetchData, showInstructorCourses]);

  const goToEditCourse = (courseId) => {
    navigate(`/edit-course/${courseId}`);
  }

  return(
    <div>
      <Header />
      <h1 className="my-courses-title">Active Courses</h1>
      {userRole === 'instructor' && activeCourses.length > 0 && (
        <div>
          <p className='instructor-courses'>Active Courses</p>
          <ul className='instructor-active-courses'>
            {activeCourses.map(course => (
              <li key={course._id}>
                <div>
                  <img src={`http://localhost:3001/user-images/${course.filename}`} alt={course.title} />
                </div>
                <div>
                  <p>{course.title}</p>
                  <FontAwesomeIcon className='edit-course' icon={faPenToSquare} style={{ color: "#000000" }} onClick={() => goToEditCourse(course._id)}/>
                  <FontAwesomeIcon className='delete-course' icon={faX} style={{ color: "#000000", }} onClick={() => handleDeleteCourse(course._id)} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MyCourses;