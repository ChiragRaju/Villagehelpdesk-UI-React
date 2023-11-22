import React, { useState, useEffect } from 'react';
import { Chart } from "react-google-charts";
import axios from 'axios';

const MyChart = () => {
  const [issues,setIssues]=useState(0);
  const [numPending, setNumPending] = useState(0);
  const [numResolved, setNumResolved] = useState(0);

  useEffect(() => {
    // Make a GET request to your API endpoint
    axios.get('http://localhost:8000/api/issues/allissues')
      .then(response => {

        const numIssues=response.data.length;
        // Extract the number of pending and resolved issues from the response
        const pendingIssues = response.data.filter(issue => issue.status === 'pending');
        const resolvedIssues = response.data.filter(issue => issue.status === 'resolved');
        setIssues(numIssues)
        
        setNumPending(pendingIssues.length);
        setNumResolved(resolvedIssues.length);
      })
      .catch(error => {
        // Handle any errors from the API request
        console.error(error);
      });
  }, []);

  const data = [
    ["Issue", "WorkDone"],
    ["Resolved", numResolved],
    ["Pending", numPending],
  ];

  const options = {
    title: `Total Issue ${issues}`,
    is3D: true,
  };

  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  );
}

export default MyChart;
