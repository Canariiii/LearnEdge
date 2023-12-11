// CoursesList.js
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'antd';
import CourseCard from '../courseCard/courseCard';
import './coursesList.css';

const CoursesList = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [userRole, setUserRole] = useState('');
  const [courses, setCourses] = useState([]);

  const showData = useCallback(() => {
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

  const fetchCourses = useCallback(() => {
    axios.get('http://localhost:3001/courses')
      .then(response => {
        setCourses(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
      });
  }, []);

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
    fetchCourses();
  }, [userId, showData, fetchCourses]);

  return (
    <div>
      <Link to="/create-course">
        {userRole === 'instructor' && (
          <Button className='create-course'>Create Course</Button>
        )}
      </Link>

      <div className="course-cards">
        {courses.map(course => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CoursesList;
