import React from 'react';
import './NavBar.css';

function NavBar() {
  return (
         <nav className="nav-container">
           <ul>
             <li><a href="">Tech</a></li>
             <li><a href="">Science</a></li>
             <li><a href="">Food</a></li>
             <li><a href="">Arts</a></li>
             <li><a href="">Sports</a></li>
             <li><a href="">Account</a></li>
           </ul>
         </nav>
  )
}

export default NavBar;