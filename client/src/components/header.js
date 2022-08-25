import React from "react";
import '../index.css';
import mathshub_logo from '../images/mathshub_logo.png';
const Header = () => (
  <div className="header">
    <img className="logo" src= {mathshub_logo} alt="MathsHub logo"></img> 
  </div>
);

export default Header;