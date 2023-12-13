import React, { useEffect, useState } from 'react';
import { getCourses } from '../../services/courseService';
import './courseCard.css';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import axios from 'axios';

const CoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getCourses();
        setCourses(Array.isArray(response.data) ? response.data : []);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error al obtener cursos:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleJoinCourse = async (courseId) => {
    try {
      const studentId = localStorage.getItem('userId');  // Asegúrate de que este valor es correcto
      const response = await axios.put(`http://localhost:3001/students/${studentId}`, {
        joinCourses: [courseId],
      });

      if (response.data.success) {
        message.success('Successfully joined the course!');
        navigate(`/course/${courseId}`);
      } else {
        console.error('Failed to join the course.');
        message.error('Failed to join the course.');
      }
    } catch (error) {
      console.error('Error joining the course:', error);
      message.error('Failed to join the course.');
    }
  };

  return (
    <div>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <ul className='courses-list'>
          {courses.map((course) => (
            <li key={course._id}>
              <div>
                <img src={`http://localhost:3001/user-images/${course.filename}`} alt={course.title}></img>
              </div>
              <div>
                <p>{course.title}</p>
                <button onClick={() => handleJoinCourse(course._id)}>Join</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CoursesList;
