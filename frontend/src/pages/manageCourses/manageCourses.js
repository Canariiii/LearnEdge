import { useEffect, useState } from 'react';
import Header from '../../components/header/header';
import './manageCourses.css';
import { getCourses } from '../../services/courseService';

function ManageCourses() {
  const [courses, setCourses] = useState([]);
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

  const deleteCourse = async () => {
    
  }

  return (
    <>
      <Header />
      <h1 className='courses-list-title'>Courses</h1>
    </>
  );
}

export default ManageCourses;