import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import './App.css';
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import SignUp from "./pages/signup/signup";
import Signuplogin from "./pages/signuplogin/signuplogin";
import Profile from "./pages/profile/profile";
import UserPreferences from "./pages/userPreferences/userPreferences";
import Course from "./pages/courses/courses";
import CreateCourse from "./pages/createCourse/createCourse";
import Manage from "./pages/manage/manage";
import ManageUsers from "./pages/manageUsers/manageUsers";
import EdtiCourse from "./pages/editCourse/editCourse";

function App() {
  const userRole = localStorage.getItem('role');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signuplogin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/courses" element={<Course />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/user-preferences-form" element={<UserPreferences />} />
        <Route path="/create-course" element={userRole === 'instructor' ? (<CreateCourse />) : (<Navigate to="/home" />)} />
        <Route path="/edit-course" element={userRole === 'instructor' ? (<EdtiCourse />) : (<Navigate to="/home" />)} />
        <Route path="/manage" element={userRole === 'admin' ? <Manage /> : (<Navigate to="/home" />)} />
        <Route path="/manage-users" element={userRole === 'admin' ? (<ManageUsers />) : (<Navigate to="/home" />)} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
