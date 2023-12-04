import React from "react";
import Header from "../../components/header/header";
import './courses.css';

function Course() {
  return (
    <div>
      <Header />
      <p className="course-text">What would you like to learn?</p>
    </div>
  );
}

export default Course;