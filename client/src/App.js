import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar';
import About from "./pages/About"
import Home from "./pages/Home"
import Login from "./pages/Login"
import StudentProfile from './pages/StudentProfile';

function App() {
  
  return (
    <div>

    <Router>
        <Navbar />
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/about' element={<About/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/studentprofile' element={<StudentProfile/>} />
        </Routes>
        </Router>

      
    </div>
  );
}
export default App;