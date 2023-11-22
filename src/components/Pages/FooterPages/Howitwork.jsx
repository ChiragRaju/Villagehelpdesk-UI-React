import React from 'react'
import Card from 'react-bootstrap/Card';
import "./howitwork.css";
import fee11 from '../../../assets/fee11.jpg';
import { Link } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import log1 from '../../../assets/log1.jpg';
import Footer from '../../Footer';
import signup1 from '../../../assets/signup1.jpg';
import rai1 from '../../../assets/rai1.jpg';
import re1 from '../../../assets/re1.jpg';
import tra1 from '../../../assets/tra1.jpg';

function Howitworks() {
  return (
    
    <div className='cards'>
    <h1>Village HelpDesk Services</h1>
    <div className='marquee'>
    <marquee className='marquee'>Every step you should know about it........</marquee>
    </div>
    <div className='cards__container'>
      <div className='cards__wrapper'>
        <ul className='cards__items'>
            <Row >
        <Card style={{ width: '18rem',margin:'15px' }}>
      <Card.Img variant="top" src={signup1}/>
      <Card.Body>
        <Card.Title>Signup</Card.Title>
        <Card.Text>
          Firstly you are supposed to signup on the application,
          register yourself and get started.
        </Card.Text>
        
      </Card.Body>
    </Card>
     <Card style={{ width: '18rem',margin:'15px' }}>
      <Card.Img variant="top" src={log1}/>
      <Card.Body>
        <Card.Title>Signin/Login</Card.Title>
        <Card.Text>
          After registering yourself login on to the system to raise your issues.
        </Card.Text>
       
      </Card.Body>
    </Card>

    <Card style={{ width: '18rem',margin:'15px' }}>
      <Card.Img variant="top" src={rai1}/>
      <Card.Body>
        <Card.Title>Issue Raising</Card.Title>
        <Card.Text>
         Share what is bothering you,you can raise your issues.
        </Card.Text>
       
      </Card.Body>
    </Card>

    <Card style={{ width: '18rem',margin:'15px' }}>
      <Card.Img variant="top" src={tra1}/>
      <Card.Body>
        <Card.Title>Issue Tracking</Card.Title>
        <Card.Text>
         You can easily track your issues.
        </Card.Text>
       
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem',margin:'15px' }}>
      <Card.Img variant="top" src={re1}/>
      <Card.Body>
        <Card.Title>Relax</Card.Title>
        <Card.Text>
         Hope we are able to solve your problem,if not relax we are doing it.
        </Card.Text>
       
      </Card.Body>
    </Card>
    
    <Card  style={{ width: '18rem',margin:'15px' }}>
      <Card.Img variant="top" src={fee11} />
      <Card.Body>
        <Card.Title>Feedback</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>


       
      </Card.Body>
    </Card></Row>

        </ul>
        <Footer/>
  
      </div>
    </div>
    
  </div>
  
  

  )
}

export default Howitworks