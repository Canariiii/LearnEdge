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
    description: "",
    selectedContent: null,
  });
  const [contents, setContents] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/courses/${courseId}`)
      .then(response => {
        const { title, description, content } = response.data.data;
        setCourseData({
          title,
          description,
          selectedContent: content?._id || "", 
        });
      })
      .catch(error => {
        console.error('Error fetching course details:', error);
      });
  }, [courseId]);
  
  useEffect(() => {
    axios.get(`http://localhost:3001/content`)
      .then(response => {
        setContents(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching content list:', error);
      });
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setCourseData({
      ...courseData,
      selectedContent: selectedFile,
    });
  };

  const handleContentChange = (e) => {
    const selectedContentId = e.target.value;
    console.log('contentId: ', selectedContentId);
    setCourseData((prevData) => ({
      ...prevData,
      selectedContent: selectedContentId,
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const updatedCourse = {
        title: courseData.title,
        description: courseData.description,
        contentId: courseData.selectedContent, 
      };
      console.log(courseData.selectedContent);
      const courseResponse = await axios.put(`http://localhost:3001/courses/update/${courseId}`, updatedCourse);
      console.log("Course updated successfully:", courseResponse);
      setCourseData({
        title: courseResponse.data.data.title,
        description: courseResponse.data.data.description,
        selectedContent: courseResponse.data.data.content?._id || "", 
      });
    } catch (error) {
      console.error('Error updating course:', error);
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
        <select
          id="contentDropdown"
          name="content"
          value={courseData.selectedContent || ""}
          onChange={handleContentChange}
        >
          <option value="" disabled>Select Content</option>
          {contents.map(content => (
            <option key={content._id} value={content._id}>
              {content.contentData}
            </option>
          ))}
        </select>
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
