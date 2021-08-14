import React from 'react';
import './Footer.css';

import logo_light from '../../assets/logo_light.png';

function Footer() {
  return (
      <footer className="footer-container">
        <div>
          <img src={logo_light} alt="NewsGrid" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
            dolorem magnam sunt possimus perspiciatis quis suscipit quidem
            tempora, error numquam.
          </p>
        </div>
        <div>
          <h3>Sign-up for our Newsletter</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit, totam!
          </p>
          <form name="contact" method="POST" data-netlify="true">
            <input type="email" name="email" placeholder="Enter your email" />
            <input type="submit" value="Subscribe" className="btn btn-primary" />
          </form>
        </div>
        <div>
          <h3>Connect with Us</h3>
          <ul>
            <li><a href="">Contact</a></li>
            <li><a href="">Careers</a></li>
            <li><a href="">Subscriptions</a></li>
            <li><a href="">Help</a></li>
          </ul>
        </div>
      </footer>
  )
}

export default Footer;