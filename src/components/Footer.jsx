import React from 'react';
import './Footer.css';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faYoutube, faTwitter, faLinkedin, faWhatsapp } from '@fortawesome/free-brands-svg-icons';



const Footer = () => {
  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
        <h1 className='footer-subscription-heading'>
          Community Hub.
        </h1>
        <p className='footer-subscription-text'>
          <h1 style = {{color: 'white'}} > One stop point for all your problems.</h1>  
        </p>
      </section>
      <div className='footer-links'>
        
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            
            <h2 className='hover-link'>About Us</h2>
            <Link to='/howitworks' className='hover-link'>How it works</Link>
            <Link to='/info' className='hover-link'>Information</Link>
            
           
          </div>
          <div className='footer-link-items'>
            <h2 className='hover-link'>FAQ</h2>
            <Link to='/FaqPage' className='hover-link'> FA Questions</Link>
            
            <Link to='/Suggestion' className='hover-link'>Suggestions</Link>
            
            
           
          </div>
          <div className='footer-link-items'>
            <h2 className='hover-link'>Benifits</h2>
            <Link to='/RuralDevelopment' className='hover-link'>Rural development</Link>
            <Link to='/Terms' className='hover-link' >Terms of Service</Link>
            
           
          </div>
        </div>
      </div>

      <section className='VILLAGE HELPDESK'>
        
        
        <div>
          <footer>
          <div>
            <span>Follow Us : </span>          
          <a href="https://www.instagram.com/mygovindia/?hl=en" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://www.facebook.com/MyGovIndia/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="https://www.youtube.com/mygovindia" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faYoutube} />
          </a>
          <a href="https://twitter.com/mygovindia" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTwitter} />
          </a>
          {/* New LinkedIn and WhatsApp icons */}
          <a href="https://in.linkedin.com/company/government-of-india-official" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href="https://www.google.com/search?q=official+government+of+india+whatsapp+number&rlz=1C1JJTC_enIN1044IN1044&ei=VEJ-ZOfPJPfWseMPtsaHqAc&oq=official+goverment+of+india+Whatsa&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQARgCMgcIIRCgARAKMgcIIRCgARAKMgcIIRCgARAKMgcIIRCgARAKMgcIIRCgARAKOg8ILhADEI8BEOoCELQCGAE6DwgAEAMQjwEQ6gIQtAIYAToICAAQigUQkQI6CwgAEIAEELEDEIMBOhEILhCABBCxAxCDARDHARDRAzoLCAAQigUQsQMQgwE6CwguEIoFELEDEIMBOgcIABCKBRBDOg0IABCKBRCxAxCDARBDOgcILhCKBRBDOg0ILhCKBRDHARDRAxBDOgsIABCKBRCxAxCRAjoKCAAQigUQsQMQQzoOCAAQigUQsQMQgwEQkQI6DQguEIoFELEDEIMBEEM6BQgAEIAEOhAILhCKBRDHARDRAxDUAhBDOggIABCABBCxAzoHCAAQgAQQCjoHCAAQDRCABDoGCAAQHhANOggIABAWEB4QDzoGCAAQFhAeOggIABAIEB4QDToICAAQigUQhgM6CgghEBYQHhAdEApKBAhBGABQnwdYy1Ng5GNoAXAAeACAAc4BiAHmK5IBBjAuMzIuMpgBAKABAbABCsABAdoBBAgBGAo&sclient=gws-wiz-serp" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faWhatsapp} />
          </a>
          </div>
          </footer>
         <small className='website-rights'><h6 style = {{color: 'white'}} >Village HelpDesk © 2023</h6></small>
        </div>
      </section>
      
    </div>
  );
};

export default Footer;