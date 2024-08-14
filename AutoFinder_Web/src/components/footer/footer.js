import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import './footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>About Autofinder</h4>
          <p>Elevate Your Drive With Unmatched Deals And Services. We provide a platform to buy and sell cars with the best deals and services.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/home">→ Home</a></li>
            <li><a href="/packages">→ Packages</a></li>
            <li><a href="/post-ad">→ Post An Ad</a></li>
            <li><a href="/contact">→ Contact Us</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: support@autofinder.com</p>
          <p>Phone: (123) 456-7890</p>
          <div className="social-icons">
            <a href="#"><FontAwesomeIcon icon={faFacebookF} /></a>
            <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
            <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
            <a href="#"><FontAwesomeIcon icon={faLinkedinIn} /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Autofinder. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
