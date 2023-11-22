import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

import GirlEdu from '../assets/GirlEdu.jpg';
import img0001 from '../assets/img0001.jpg';
import img0002 from '../assets/img0002.jpg';
import img0003 from '../assets/img0003.jpg';
import img0004 from '../assets/img0004.jpg';



function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel fade>
      <Carousel.Item interval={1000}>
        <img
          className="d-block w-100"
          src={GirlEdu}
          alt="First slide"
          height= '400px'

         
        />
        <Carousel.Caption >
          <h1>Girl Education</h1>
          <p>Development in the Education Filed</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100"
          src={img0001}
          alt="Second slide"
          height= '400px'
        />

        <Carousel.Caption>
        <h1>Water issues</h1>
          <p>Availabilty of Dinking water</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100"
          src={img0002}
          alt="Third slide"
          height= '400px'
        />

        <Carousel.Caption>
        <h1>Electricity Issues</h1>
          <p>Electric Scarcity</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100"
          src={img0003}
          alt="Third slide"
          height= '400px'
        />

        <Carousel.Caption>
        <h1>Network Connection</h1>
          <p>Connecting with networks</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100"
          src={img0004}
          alt="Third slide"
          height= '400px'
        />
        <Carousel.Caption>
        <h1>Road Development</h1>
          <p>Development in the construction of roads</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    
  );
}

export default ControlledCarousel;