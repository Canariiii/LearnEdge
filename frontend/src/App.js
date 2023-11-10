import { Route, Routes, BrowserRouter } from "react-router-dom";

import './App.css';
import Courses from "./pages/courses/courses";
import Login from "./pages/login/login";
import SignUp from "./pages/signup/signup";
import Home from "./pages/home/home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
