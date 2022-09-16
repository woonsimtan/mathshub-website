import React from 'react';
import {  Link } from "react-router-dom";
import '../index.css';

const Navbar= () =>{
  return (
  <div className = "navbar">
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/about">About</Link>
    </li>
    <li>
      <Link to="/studentprofile">Profile</Link>
    </li>
    <li>
      <Link to="/accounts">Accounts</Link>
    </li>
    {/* <li>
      <Link to="/login">Login</Link>
    </li> */}
  </div>
  );
}
export default Navbar;