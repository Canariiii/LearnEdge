import React from 'react';
import { Link } from 'react-router-dom';
import './courseCard.css';

const CourseCard = ({ course }) => {
  const { _id, title, filename } = course;

  return (
    <div className="card-container">
      {filename && <img className="card-image" src={`http://localhost:3001/user-images/${filename}`} alt={title} />}
      <div className="card-content">
        <div className="card-title">{title}</div>
        <Link to={`/course/${_id}`}>
          <button className="card-button">Join</button>
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
