// Cards.js

import React from 'react';
import Card from 'react-bootstrap/Card';
import './Cards.css';
import issue from '../assets/issue.jpg';
import fee1 from '../assets/fee1.jpg';
import tra1 from '../assets/tra1.jpg';
import { Row } from 'react-bootstrap';

function Cards() {
  const cardData = [
    {
      title: 'Issue Raising',
      description: 'Raise all the problems and get resolved.',
      image: issue,
    },
    {
      title: 'Issue Tracking',
      description: 'Track and check Status and get resolved.',
      image: tra1,
    },
    {
      title: 'Feedback',
      description: 'Please Provide feedback about the status of the problem.',
      image: fee1,
    },
  ];

  const cardStyle = {
    transition: 'transform 0.3s ease',
    margin: '15px',
    cursor: 'pointer',
  };

  const hoverStyle = {
    transform: 'scale(1.05)',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  };

  return (
    <div className='cards'>
      <h1>Village HelpDesk Services</h1>
      <div className='marquee'>
        <marquee className='marquee'>Our aim is to solve the issues related to village and rural areas .......</marquee>
      </div>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <Row>
              {cardData.map((card, index) => (
                <Card
                  key={index}
                  className='card'
                  style={{ width: '18rem', ...cardStyle }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <Card.Img variant='top' src={card.image} />
                  <Card.Body>
                    <Card.Title>{card.title}</Card.Title>
                    <Card.Text>{card.description}</Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </Row>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
