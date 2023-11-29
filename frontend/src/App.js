import { Route, Routes, BrowserRouter } from "react-router-dom";
import './App.css';
import Courses from "./pages/courses/courses";
import Login from "./pages/login/login";
import SignUp from "./pages/signup/signup";
import Home from "./pages/home/home";
import Profile from "./pages/profile/profile";
import UserPreferences from "./pages/userPreferences/userPreferences";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/user-preferences-form" element={<UserPreferences />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
