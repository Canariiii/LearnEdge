import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import './editCourseForm.css';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const EditCourseForm = () => {
  const { courseId } = useParams();
  const [showPopup, setShowPopup] = useState(false);

  const [courseData, setCourseData] = useState({
    title: "",
    content: null,
    description: ""
  });

  useEffect(() => {
    axios.get(`http://localhost:3001/courses/${courseId}`)
      .then(response => {
        const { title, description } = response.data.data;
        setCourseData({
          title,
          description,
          content: null,
        });
      })
      .catch(error => {
        console.error('Error fetching course details:', error);
      });
  }, [courseId]);

  const handleFileChange = (e) => {
    setCourseData({
      ...courseData,
      content: e.target.files[0] || null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', courseData.title);
      formData.append('description', courseData.description);
      if (courseData.content) {
        formData.append('courseId', courseId);
        formData.append('contentType', 'file');
        formData.append('contentData', courseData.content.name);
        formData.append('file', courseData.content);
      }
      const contentResponse = await axios.post('http://localhost:3001/content', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const contentData = contentResponse.data.data.content;
      if (contentResponse.data.success && contentData && contentData.length > 0) {
        const contentId = contentData[0]._id;
        const updatedCourse = {
          title: courseData.title,
          description: courseData.description,
          content: contentId,
        };
        const courseResponse = await axios.put(`http://localhost:3001/courses/update/${courseId}`, updatedCourse);
        console.log("PUT Response:", courseResponse);
        console.log("Course updated successfully:", courseResponse);
        setCourseData({
          title: courseResponse.data.data.title,
          description: courseResponse.data.data.description,
          content: contentId,
        });
      } else {
        console.error('Error creating content:', contentResponse.data.error );
      }
    } catch (error) {
      console.error('Error updating course:', error);
      console.error('Error creating content:', error);
    }
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="edit-course-container">
      <h1>{courseData.title}</h1>
      <div className="edit-course-line"></div>
      <form className="edit-course-form" onSubmit={handleSubmit}>
        <p>Title</p>
        <input type="text" name="title" placeholder="New Title" value={courseData.title} onChange={(e) => setCourseData({ ...courseData, title: e.target.value })} />
        <p>Content</p>
        <input type="file" id='fileInput' name="content" onChange={handleFileChange} />
        <label htmlFor='fileInput' className='fileLabel-content'>Search...</label>
        <p>Description</p>
        <input type="text" name="description" placeholder="New Description" value={courseData.description} onChange={(e) => setCourseData({ ...courseData, description: e.target.value })} />
        <p>Change Course Pic</p>
        <FontAwesomeIcon icon={faPlus} className='plus-icon-course' onClick={togglePopup} />
        <button type="submit">Update Course</button>
      </form>
      {showPopup && (
        <div className='course-popup'>
          <input type='file' id='fileInput' onChange={handleFileChange} />
          <label htmlFor='fileInput' className='fileLabel-course-img'>Search...</label>
        </div>
      )}
    </div>
  );
}

export default EditCourseForm;
