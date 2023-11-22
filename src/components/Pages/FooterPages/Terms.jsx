import React from 'react'
import "./Terms.css";
import { Typography } from '@mui/material';
import Footer from '../../Footer';


function Terms() {
  return (
    
    <div className="container">
      <Typography variant="h4" component="h1" align="center" className="title">
        
        Terms of Service
      </Typography>
      <Typography variant="body1" align="left" paragraph className="paragraph">
      User Responsibilities: Outline the responsibilities of users when using the helpdesk platform, such as providing accurate information, respecting other users, and complying with applicable laws and regulations.
        
      
      <Typography variant="body1" align="left" paragraph className="paragraph">
      Service Description: Provide a detailed description of the services offered by the helpdesk, including the types of support available, response times, and any limitations or exclusions.


      
      </Typography>
      <Typography variant="body1" align="left" paragraph className="paragraph">
      Account Usage: Explain the requirements for creating an account, including age restrictions, accurate account information, and maintaining the confidentiality of login credentials.


      </Typography>
      <Typography variant="body1" align="left" paragraph className="paragraph">
      

      Termination of Service: Outline the circumstances under which the helpdesk provider may terminate or suspend a user's access to the platform, such as violation of the terms of service or illegal activities.


      </Typography>
      <Typography variant="body1" align="left" paragraph className="paragraph">
      


Dispute Resolution: Describe the process for resolving disputes between users and the helpdesk provider, including any arbitration or mediation procedures.

      </Typography>
      <Typography variant="body1" align="left" paragraph className="paragraph">
      


      
      Amendments to the Terms: State that the terms of service may be modified or updated periodically, and how users will be notified of any changes.
            </Typography>
      </Typography>'
    
    </div>
    
  )
}

export default Terms