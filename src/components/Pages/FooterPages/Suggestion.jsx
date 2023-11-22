import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import "./Suggestion.css";
import Footer from '../../Footer';
import  { useEffect, useState } from "react";

function Suggestion() {


    const [suggestion, setSuggestion] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  function handleInputChange(e) {
    setSuggestion(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (suggestion.trim() !== '') {
      setSuggestions([...suggestions, suggestion]);
      setSuggestion('');
    }
  }

  return (
    <div>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Suggestions
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Enter your suggestion"
          variant="outlined"
          value={suggestion}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" type="submit" color="primary">
          Submit
        </Button>
      </form>
      <List>
        {suggestions.map((item, index) => (
          <ListItem key={index}>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
      <Footer/>
    </div>
   
 )
}



export default Suggestion