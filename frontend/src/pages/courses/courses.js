import Header from "../../components/header/header";
import './courses.css';

document.body.classList.add('courses-page');

function Courses() {
  return (
    <>
      <Header />
      <input className="search-courses" type="search" placeholder="What would you like to learn?"></input>
    </>
  );
}

export default Courses;
