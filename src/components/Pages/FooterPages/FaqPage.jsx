import React from 'react'
import "./FaqPage.css";
import Card from 'react-bootstrap/Card';
import Footer from '../../Footer';
import { Row } from 'react-bootstrap';


function FaqPage() {
  return (
    <div className='cards'>
    <h1>Village HelpDesk FAQ</h1>
    <div className='marquee'>
    <marquee className='marquee'>EveryTHING THAT  you ASk For........</marquee>
    </div>
    <div className='cards__container'>
      <div className='cards__wrapper'>
        <ul className='cards__items'>
            <Row >
        <Card style={{ width: '18rem',margin:'15px' }}>
      
      <Card.Body>
        <Card.Title>How do I create an account?</Card.Title>
        <Card.Text>
        Answer: To create an account, click on the "Sign Up" button on the homepage
         and fill out the required information.
        </Card.Text>
        
      </Card.Body>
    </Card>
     <Card style={{ width: '18rem',margin:'15px' }}>
      
      <Card.Body>
        <Card.Title>For signup do I need to pay ?</Card.Title>
        <Card.Text>
        Answer: No you dont need to pay.
        </Card.Text>
       
      </Card.Body>
    </Card>

    <Card style={{ width: '18rem',margin:'15px' }}>
      
      <Card.Body>
        <Card.Title>How can I contact customer support?</Card.Title>
        <Card.Text>
        Answer: You can reach our customer support team by email at support@villagehd.com 
        or by calling our toll-free number: 1-800-123-4567.
        </Card.Text>
       
      </Card.Body>
    </Card>

    <Card style={{ width: '18rem',margin:'15px' }}>
      
      <Card.Body>
        <Card.Title>How long does whole process will take?</Card.Title>
        <Card.Text>
        Answer: Process times vary depending on your issue and the community involved.
         Typically, issue will be resolved within 3-5 business days.
        </Card.Text>
       
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem',margin:'15px' }}>
      
      <Card.Body>
        <Card.Title>Will I get any update regarding my issue?</Card.Title>
        <Card.Text>
        Answer: Yes you can view the status of your raised issue.
        </Card.Text>
       
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem',margin:'15px' }}>
      
      <Card.Body>
        <Card.Title>Can i give my feedback onm the Issue?</Card.Title>
        <Card.Text>
        Answer: Yes in the services feedback option is there.
        </Card.Text>
       
      </Card.Body>
    </Card>
    
    
   
    </Row>

        </ul>
        <Footer/>
  
      </div>
    </div>
    
  </div>
  )
}

export default FaqPage