// FeedbackContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [userData, setUserData] = useState([]);
  const url = "https://villagehelpdeskapi.onrender.com/feedback/get-feedback";

  const fetchInfo = async () => {
    try {
      const response = await axios.get(url);
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching feedback data:", error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <FeedbackContext.Provider value={{ userData, fetchInfo }}>
      {children}
    </FeedbackContext.Provider>
  );
};

export const useFeedback = () => {
  return useContext(FeedbackContext);
};
