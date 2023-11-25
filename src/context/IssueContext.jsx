// IssueContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const IssueContext = createContext();

export const IssueProvider = ({ children }) => {
  const [userIssues, setUserIssues] = useState([]);
  const [error, setError] = useState(null);

  const fetchUserIssues = (fullname) => {
    // Implement your fetch logic here...
    // Return a promise that resolves to the fetched userIssues data
    return fetch(
      `https://villagehelpdeskapi.onrender.com/api/issues/check-issue-status/${fullname}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          setError(data.error);
          setUserIssues([]);
        } else {
          setUserIssues(data.userIssues);
          setError(null);
        }
      })
      .catch((error) => {
        console.error("Error fetching issue details:", error);
        setError("User not found. Error fetching issue details.");
        setUserIssues([]);
      });
  };

  return (
    <IssueContext.Provider value={{ userIssues, error, fetchUserIssues }}>
      {children}
    </IssueContext.Provider>
  );
};

export const useIssue = () => {
  return useContext(IssueContext);
};
