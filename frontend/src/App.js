import { Route, Routes, BrowserRouter } from "react-router-dom";
import './App.css';
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import SignUp from "./pages/signup/signup";
import Signuplogin from "./pages/signuplogin/signuplogin";
import Profile from "./pages/profile/profile";
import UserPreferences from "./pages/userPreferences/userPreferences";
import Course from "./pages/courses/courses";

function App() {
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
