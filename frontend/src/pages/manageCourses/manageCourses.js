import React, { useEffect, useState } from 'react';
import Header from '../../components/header/header';
import './manageCourses.css';
import { deleteCourseById, getCourses } from '../../services/courseService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import adminUserService from '../../services/adminService';
import axios from 'axios';

function ManageCourses({ onClose }) {
  const [courses, setCourses] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    filename: '',
    selectedContent: null,
    selectedInstructor: null,
  });
  const [contents, setContents] = useState([]);
  const [instructors, setInstructors] = useState('');
  const [courseId, setCourseId] = useState('');
  const [coursePicture, setCoursePicture] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPic, setCurrentPic] = useState(null);

  const onChange = (file) => {
    if (!file) {
      setCoursePicture(currentPic);
      return;
    }
    setCoursePicture(file);
    setCourseData((prevData) => ({
      ...prevData,
      filename: file.name,
    }));
  };

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

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleContentChange = (e) => {
    const selectedContentId = e.target.value;
    setCourseData((prevData) => ({
      ...prevData,
      selectedContent: selectedContentId,
    }));
  };

  const handleInstructorChange = async (e) => {
    const selectedInstructorId = e.target.value;
    try {
      const response = await axios.get(`http://localhost:3001/instructors/${selectedInstructorId}`);
      const selectedInstructor = response.data.data
      console.log(selectedInstructor);
      setCourseData((prevData) => ({
        ...prevData,
        selectedInstructor: selectedInstructorId,
        instructorName: selectedInstructor ? selectedInstructor.username : "",
      }));
    } catch (error) {
      console.error('Error al obtener datos del instructor:', error);
    }
  };

  const deleteCourse = async (courseId) => {
    try {
      const courseExist = courses.find((course) => course._id === courseId);
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedCourse = {
        title: courseData.title,
        description: courseData.description,
        filename: courseData.filename,
        contentId: courseData.selectedContent,
        instructorId: courseData.selectedInstructor,
      };
      const courseResponse = await axios.put(`http://localhost:3001/courses/update/${courseId}`, {
        ...updatedCourse
      });
      console.log("Course updated successfully:", courseResponse);
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };
  useEffect(() => {
    if (courseId && typeof courseId === 'string' && courseId.trim() !== '') {
      adminUserService.getCourseById(courseId)
        .then((response) => {
          const courseData = response.data;
          if (courseData) {
            setCourseData({
              title: courseData.title || '',
              description: courseData.description || '',
            });
            setCurrentPic(courseData.filename || null);
          }
        })
        .catch((error) => {
          console.error('Error al obtener datos del usuario:', error);
        });
    }
  }, [courseId]);

  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const togglePopup = async (courseId) => {
    setCourseId(courseId);
    setShowPopup(!showPopup);
    try {
      const response = await adminUserService.getCourseById(courseId);
      const courseData = response.data;
      if (courseData) {
        setCourseData({
          title: courseData.title || '',
          description: courseData.description || '',
          content: courseData.content,
          instructor: courseData.instructor,
        });
        setCurrentPic(courseData.filename || null);
      }
    } catch (error) {
      console.error('Error al obtener datos del curso:', error);
    }
  };

  useEffect(() => {
    axios.get(`http://localhost:3001/content`)
      .then(response => {
        setContents(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching content list:', error);
      });
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:3001/instructors`)
      .then(response => {
        setInstructors(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching instructor list:', error);
      });
  }, []);



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
      {showPopup && (
        <form className='edit-course-form-popup' onSubmit={handleSubmit}>
          <p>Title</p>
          <input
            type='text'
            name='title'
            placeholder='New Title'
            value={courseData.title}
            onChange={handleChange}
          />
          <p>Description</p>
          <input
            type='text'
            name='description'
            placeholder='New Description'
            value={courseData.description}
            onChange={handleChange}
          />
          <p>Content</p>
          <option value="" disabled></option>
          <select id="contentDropdown" name="content" value={courseData.selectedContent || ""} onChange={handleContentChange}>
            <option value="" disabled>Select Content</option>
            {contents.map(content => (
              <option key={content._id} value={content._id}>
                {content.contentData}
              </option>
            ))}
          </select>
          <p>Instructor</p>
          <select id="instructorDropdown" name="instructor" value={courseData.selectedInstructor || ""} onChange={handleInstructorChange}>
            <option value="" disabled>Select Instructor</option>
            {instructors.map(instructor => (
              <option key={instructor._id} value={instructor._id}>
                {instructor.username}
              </option>
            ))}
          </select>
          <input type='file' id='fileInput' value={courseData.filename} onChange={(event) => onChange(event.target.files[0] || null)}></input>
          <label htmlFor='fileInput' className='file-label-courses-form'>Search...</label>
          <button type='submit'>Save Course</button>
        </form>
      )}
    </div>
  );
}

export default ManageCourses;
