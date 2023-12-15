import React, { useState, useEffect } from "react";
import Header from '../../components/header/header';
import { useParams } from "react-router-dom";
import axios from 'axios';
import './course.css';

function Course() {
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    content: "",
    instructor: {
      _id: "",
      username: "",
      filename: "",
    },
    filename: "",
  });

  useEffect(() => {
    axios.get(`http://localhost:3001/courses/${courseId}`)
      .then(response => {
        const { title, description, content, instructor,filename } = response.data.data;
        setCourseData({
          title,
          description,
          content: content || { _id: "", contentData: "" },
          instructor: instructor || { _id: "", username: "", filename: "" },
          filename: filename
        });
        if (instructor) {
          axios.get(`http://localhost:3001/instructors/${instructor}`)
            .then(instructorResponse => {
              const { username, filename } = instructorResponse.data.data;
              setCourseData(prevData => ({
                ...prevData,
                instructor: {
                  ...prevData.instructor,
                  username,
                  filename,
                },
              }));
            })
            .catch(instructorError => {
              console.error('Error fetching instructor details:', instructorError);
            });
        }
      })
      .catch(error => {
        console.error('Error fetching course details:', error);
      });
  }, [courseId]);

  return (
    <div>
      <Header />
      <div className="course-data-container">
        <h1>{courseData.title}</h1>
        <p>{courseData.description}</p>
        <p>Instructor: {courseData.instructor.username}</p>
        <img src={`http://localhost:3001/user-images/${courseData.filename}`} alt="Instructor" />
        
        <img src={`http://localhost:3001/user-images/${courseData.instructor.filename}`} alt="Instructor" />
      </div>
    </div>
  );
}

export default Course;
