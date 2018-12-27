import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import logo from './logo.jpg';
const Logo = () =>{
  return(
  <div className ='icon ma4 mt0'>
      <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 100, width: 100 }} >
        <div className="Tilt-inner"> <img alt='logo' src={logo}/> </div>
      </Tilt>
  </div>
  );
}

export default Logo;
