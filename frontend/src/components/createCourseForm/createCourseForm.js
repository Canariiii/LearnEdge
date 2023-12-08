import React, { useState } from "react";
import './createCourseForm.css';
import instructorService from "../../services/instructorService";

const CreateCourseForm = () => {

  const [coursePic, setCoursePic] = useState(null);

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
        title: 'Curso de prueba',
        description: 'Descripción del curso',
        file: coursePic,
      };
      const response = await instructorService.createCourse(courseData);
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
        <input type="text" name="title"></input>
        <p>Description</p>
        <input type="text" name="description"></input>
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