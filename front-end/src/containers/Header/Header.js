import React from 'react';
import './Header.css';

import NavBar from '../NavBar/NavBar';
import logo from '../../assets/logo.png';

function Header() {
  return (
         <header>
            <a href="index.html">
              <img src={logo} className="logo" alt="logo" />
            </a>
            <NavBar/>
       </header>
 
  )
}

export default Header;