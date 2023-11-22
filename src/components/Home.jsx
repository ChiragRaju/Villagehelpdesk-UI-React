import React from 'react';
import  Carousel  from './Carousel';
import Footer from './Footer';


import Navigation from './Navigation';
import Cards from './Cards';

 

function Home() {
  
  return (
    <div>
    <Navigation/>
   
   <Carousel/>
   <Cards/>
   <Footer/>
    
    </div>
  )
}

export default Home