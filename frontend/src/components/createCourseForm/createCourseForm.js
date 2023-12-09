import React, { useState } from "react";
import './createCourseForm.css';
import courseService from "../../services/courseService";

const CreateCourseForm = () => {

  const [coursePic, setCoursePic] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const onChange = (file) => {
    if (!file) {
      setCoursePic(coursePic);
      return;
    }
    setCoursePic(file);
  };
  
  const createCourse = async () => {
    try {
      const courseData = {
        title,
        description,
        file: coursePic,
      };
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token de autenticación no encontrado');
        return;
      }
      const response = await courseService.createCourse({ ...courseData, token });
      console.log(response);
    } catch (error) {
      console.error('Error al crear el curso:', error);
    }
  };

  return (
    <div className="create-course-form">
      <p>Create Course</p>
      <div className="create-course-line"></div>
      <form className="create-course-form-container">
        <p>Title</p>
       <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <p>Description</p>
        <input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <p>Course Picture</p>
        <input type='file' id='fileInput' onChange={(event) => onChange(event.target.files[0] || null)} />
        <label htmlFor='fileInput' className='filelabel'>Search...</label>
        {coursePic && <img src={URL.createObjectURL(coursePic)} alt='Course preview' />}
        <button className='crate-course-button' type='submit' onClick={createCourse}>Create</button>
      </form>
    </div>
  );
}

export default CreateCourseForm;