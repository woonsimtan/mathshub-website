import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Footer from './components/footer';
import Navbar from './components/navbar';
import About from "./pages/About"
import Home from "./pages/Home"
import StudentProfile from './pages/StudentProfile';
import Header from './components/header';
import Login from './components/Login/Login';
import useToken from './components/useToken';



function App() {

  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }
  return (
    <div>
    <Header/>

    <Router>
        <Navbar />
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/about' element={<About/>} />
            {/* <Route path='/login' element={<Login/>} /> */}
            <Route path='/login' exact element={<Login 
                    setToken={setToken}
                    />}
                    />
            <Route path='/studentprofile' element={<StudentProfile/>} />
        </Routes>
    </Router>

    <Footer/>

      
    </div>
  );
}
export default App;