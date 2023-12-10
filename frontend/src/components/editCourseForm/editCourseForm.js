import React, { useCallback, useState } from "react";
import axios from 'axios';

const EditCourseForm = () => {

  const [courseTitle, setCourseTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [courseId, setCourseId] = useState('');
  

  const fetchCourseData = useCallback(() => {

  })

  return (
    <div className="edit-course-container">
      <h1>Figma</h1>
      <div className="edit-course-line"></div>
      <form className="edit-course-form">
        <p>Title</p>
        <input type="text" name="title" placeholder="New Title"></input>
      </form>
    </div>
  );
}

export default EditCourseForm;