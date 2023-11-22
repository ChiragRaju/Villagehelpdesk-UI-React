
import './App.css';

import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import Home from './components/Home';

import Services from './components/Services';
import AdminLogin from './components/Pages/AdminComponents/AdminAuth/AdminLogin';
import AdminDashboard from './components/Pages/AdminComponents/AdminDashboard';
import UserSignUp from './components/Pages/UserComponents/UserAuth/UserSignUp';
import SuperWiserList from './components/Pages/AdminComponents/SuperWiserList';
import Login from './components/Pages/UserComponents/UserAuth/Login';
import UserDashboard from './components/Pages/UserComponents/UserDashboard';
import {UserComplaints}  from './components/Pages/UserComponents/UserComplaints';
import ComplaintList from './components/Pages/AdminComponents/ComplaintList';

import FeedbackForm from './components/Pages/UserComponents/FeedbackForm';


import Howitworks from './components/Pages/FooterPages/Howitwork';
// import Info from './components/Pages/FooterPages/Info';
import FaqPage from './components/Pages/FooterPages/FaqPage';
import RuralDevelopment from './components/Pages/FooterPages/RuralDevelopment';
import Suggestion from './components/Pages/FooterPages/Suggestion';
import Terms from './components/Pages/FooterPages/Terms';
import IssueList from './components/Pages/AdminComponents/IssueList';
import UserReglist from './components/Pages/UserComponents/UserReglist';
import Complaints from './components/Pages/AdminComponents/Complaints';
import EmailForm from './components/Pages/AdminComponents/EmailForm';
import FeedbackList from './components/Pages/UserComponents/FeedbackList';
import CheckStatus from './components/Pages/UserComponents/CheckStatus';
import UpdateStatusButton from './components/Pages/AdminComponents/UpdateStatusButton';
import jwtDecode from 'jwt-decode';
import { useState } from 'react';
import NotificationSenderComponent from './components/Pages/AdminComponents/NotificationSenderComponent';
import ForgotPassword from './components/Pages/UserComponents/UserAuth/ForgotPassword';
import ResetPassword from './components/Pages/UserComponents/UserAuth/ResetPassword';
import SuperWiser from './components/Pages/AdminComponents/SuperWiser';
import { AuthProvider,useAuth } from './context/AuthContext';


function PrivateRoute({ element }) {
  const { user } = useAuth();
 
  // If the user is not authenticated, redirect to the login page
  return user ? element : <Navigate to="/Login" />;

}



function App() {
  
 

  
  
  return (
    <div className="App">
    <AuthProvider>
       <Router>
      
       
        <Routes>

          <Route  path='/' element={<Home/>} />
           <Route path='/Services' element={<Services/>}/>
           <Route path='/Adminlogin' element={<AdminLogin/>} /> 
          <Route path='/AdminDashboard' element={<AdminDashboard/>}/>
          <Route path='/superWiser' element={<SuperWiser/>}/>
          <Route path='/SuperwiserList' element ={<SuperWiserList/>}/>
          <Route path='/update-status' element={<UpdateStatusButton/>}/>
          <Route path='/ComplaintsList' element={<ComplaintList/>}/>
          <Route path='/complaints' element={<Complaints/>}/> 
          <Route path='/FeedbackList' element={<FeedbackList/>}/>
          <Route path='/email' element={<EmailForm/>}/>
          <Route path='/send-notifications' element={<NotificationSenderComponent/>}/>

          

          <Route path='/UserRegistration' element={<UserSignUp/>} /> 
          <Route path='/status' element={<PrivateRoute element={<CheckStatus />} />}/>
          <Route path='/Login' element ={<Login/>}/>
          <Route path="/userdashboard" element={<PrivateRoute element={<UserDashboard />} />} />
          <Route path='/IssueRaised' element ={<PrivateRoute element={<UserComplaints/>} />}/>
          <Route path='/forgot-Password' element ={<ForgotPassword/>}/>

          <Route path='/reset-Password' element ={<ResetPassword/>}/>
          
          <Route path='/Feedback' element={<PrivateRoute element={<FeedbackForm />} />}/>
         

          {/* <Route path='/Info' element={<Info/>}/>  */}
           <Route path='/howitworks' element={<Howitworks/>}/>
          <Route path='/FaqPage' element={<FaqPage/>}/>
          <Route path='/RuralDevelopment' element={<RuralDevelopment/>}/>
          <Route path='/Suggestion' element={<Suggestion/>}/>
          <Route path='/Terms' element={<Terms/>}/>
          <Route path='/issuelist' element={<IssueList/>}/>
          <Route path='/userlist' element={<UserReglist/>}/>

        </Routes>
      </Router>
   
      </AuthProvider>
      
    </div>
  );
}



export default App;
