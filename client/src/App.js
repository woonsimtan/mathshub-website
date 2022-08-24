import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar';
import About from "./pages/About"
import Attendance from './pages/Attendance';
import Home from "./pages/Home"

function App() {
  
  return (
    <div>

    <Router>
        <Navbar />
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/about' element={<About/>} />
            <Route path='/attendance' element={<Attendance/>} />
        </Routes>
        </Router>

      
    </div>
  );
}
export default App;