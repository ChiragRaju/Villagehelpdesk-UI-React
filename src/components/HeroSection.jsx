import React from 'react'
import village from '../../src/assets/village.mp4';
import './herosection.css';

function HeroSection() {
  return (
    <div> <div className='hero-container'>
    <video src={village} autoPlay loop muted/> 
   
    <h1>Community Hub </h1>
    <p>solution at one place!!!!</p>
    <div className='hero-btns'>
     
      

    </div>
  </div>
  </div>
  )
}

export default HeroSection