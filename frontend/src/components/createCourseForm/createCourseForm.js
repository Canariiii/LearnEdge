import React, { useState } from "react";
import './createCourseForm.css';

const CreateCourseForm = () => {

  const [coursePic, setCoursePic] = useState(null);
  
  const onChange = (file) => {
    if (!file) {
      setCoursePic(coursePic);
      return;
    }
    setCoursePic(file);
  };

  return (
    <div className="create-course-form">
      <p>Create Course</p>
      <div className="create-course-line"></div>
      <form className="create-course-form-container">
        <p>Title</p>
        <input type="text" name="title"></input>
        <p>Instructor</p>
        <input type="text" name="instructor"></input>
        <p>Description</p>
        <input type="text" name="description"></input>
        <p>Course Picture</p>
        <input type='file' id='fileInput' onChange={(event) => onChange(event.target.files[0] || null)} />
        <label htmlFor='fileInput' className='fileLabel'>Search...</label>
        {coursePic && <img src={URL.createObjectURL(coursePic)} alt='Course preview' />}
        <button className='crate-course-button' type='submit'>Create</button>
      </form>
    </div>
  );
}

export default CreateCourseForm;