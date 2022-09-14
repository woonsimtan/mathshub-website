import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Footer from './components/footer';
import Navbar from './components/navbar';
import About from "./pages/About"
import Home from "./pages/Home"
import Accounts from "./pages/Accounts"
import StudentProfile from './pages/StudentProfile';
import Header from './components/header';
import Login from './components/Login/Login';
import useToken from './components/useToken';

function App() {

  const { token, setToken } = useToken();

  // check for token expiry if token exists
  // currently only works when i refresh the page
  if (token !== null) {
    let current = new Date();
    let expiry = new Date(JSON.parse(sessionStorage.getItem('token')).expiry);
    if (expiry < current) {
      sessionStorage.clear();
    }
  }

  return (
    <div>
    <Header/>

    <Router>
        <Navbar />
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/about' element={<About/>} />
            <Route path='/login' exact element={<Login 
                    setToken={setToken}
                    />}
                    />
            <Route path='/studentprofile' element={token ? <StudentProfile/> : <Login setToken={setToken} />} />
            <Route path='/accounts' element={token ? <Accounts/> : <Login setToken={setToken} />} />
        </Routes>
    </Router>

    <Footer/>

      
    </div>
  );
}
export default App;