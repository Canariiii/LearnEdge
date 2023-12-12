import React, { useEffect, useState } from 'react';
import { getCourses, joinCourse } from '../../services/courseService';
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

  const handleJoinCourse = async (courseId) => {
    try {
      // Obtén el studentId de tu lógica de autenticación o cualquier otra fuente
      const studentId = '6578df24916b260bca8bec08';  // Reemplaza esto con la lógica real para obtener el studentId

      const response = await joinCourse(courseId, studentId);

      if (response.success) {
        console.log('Successfully joined the course!');
        // Puedes realizar alguna acción adicional aquí, como actualizar el estado de los cursos o redirigir al usuario
      } else {
        console.error('Failed to join the course.');
      }
    } catch (error) {
      console.error('Error joining the course:', error);
    }
  };

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
