import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Footer from './components/footer';
import Navbar from './components/navbar';
import About from "./pages/About"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Header from './components/header';

function App() {
  
  return (
    <div>
    <Header/>

    <Router>
        <Navbar />
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/about' element={<About/>} />
            <Route path='/login' element={<Login/>} />
        </Routes>
    </Router>

    <Footer/>

      
    </div>
  );
}
export default App;