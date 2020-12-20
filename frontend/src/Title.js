import './App.css';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,

    },
  }));


function Title() {
    
  const classes = useStyles();

  return (
    <Typography align="left" variant="h3" className={classes.title}>Data View</Typography>
  );
}

export default Title;
