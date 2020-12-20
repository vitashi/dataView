import './App.css';
import React from 'react';

// import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


const useStyles = makeStyles((theme) => ({
    actionArea: {
      width: "50%",
      float: "right",
      margin: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '& > *': {
        margin: theme.spacing(1),
      },

    },
    formControl:{
      margin: theme.spacing(1),
      width: 150,
      marginRight: 30,
      float: "right",
    },
  }));


function ActionArea() {
    
  const classes = useStyles();
  return (
    <div className={classes.actionArea}>
      <FormLabel component="label">Actions</FormLabel>
      <FormControl variant="outlined" className={classes.formControl} >

      <Button variant="contained" onClick={null} color="primary" aria-label="contained primary button group">
          Download CSV
        </Button>

      </FormControl>
      <FormControl variant="outlined" className={classes.formControl} >

      <Button variant="contained" onClick={null} color="primary" aria-label="contained primary button group">
          Download CSV
        </Button>

      </FormControl>

    </div>
  );
}

export default ActionArea;
