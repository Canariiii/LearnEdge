import React, { useEffect, useState } from 'react';
import { getCourses } from '../../services/courseService';
import './courseCard.css';

const CoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getCourses();
        console.log('Respuesta del servidor:', response);
        setCourses(Array.isArray(response.data) ? response.data : []);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error al obtener cursos:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <ul className='courses-list'>
          {courses.map(course => (
            <li key={course._id}>
              <div>
                <img src={`http://localhost:3001/user-images/${course.filename}`} alt={course.title}></img>
              </div>
              <div>
                <p>{course.title}</p>
                <button>Join</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CoursesList;
