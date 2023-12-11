import { useEffect, useState } from 'react';
import Header from '../../components/header/header';
import './manageCourses.css';
import { deleteCourseById, getCourses } from '../../services/courseService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    filename: '',
    selectedContent: null,
    selectedUser: null
  })
  const [contents, setContents] = useState([]);
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState('');
  const [coursePicture, setCoursePicture] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPic, setCurrentPic] = useState(null);

  const onChange = (file) => {
    if (!file) {
      setCoursePicture(currentPic);
      return;
    }
    setCoursePicture(file);
  };

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
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  const deleteCourse = async (courseId) => {
    try {
      const courseExist = courses.find(course => course._id === courseId);
      if (!courseExist) {
        console.error('Usuario no encontrado:', courseId);
        return;
      }
      await deleteCourseById(courseId);
      await fetchCourses();
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error('Usuario no encontrado:', error.response.data.error);
      } else {
        console.error('Error al eliminar usuario:', error);
      }
    }
  }

  const togglePopup = (userId) => {
    setUserId(userId);
    setShowPopup(!showPopup);
  };

  return (
    <div>
      <Header />
      <h1 className='courses-list-title'>Courses</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <ul className='list-courses'>
          {courses.map(course => (
            <li key={course._id}>
              <div>
                <img src={`http://localhost:3001/user-images/${course.filename}`} alt={course.username} />
              </div>
              <div>
                <p>{course.title}</p>
                <FontAwesomeIcon
                  className='edit-icon'
                  icon={faPenToSquare}
                  style={{ color: "#000000" }}
                  onClick={() => togglePopup(course._id)}
                />
                <FontAwesomeIcon
                  className='trash-icon'
                  icon={faTrash}
                  style={{ color: "#000000" }}
                  onClick={() => deleteCourse(course._id)}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ManageCourses;