import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import Upload from './Upload'
import GetAppIcon from '@material-ui/icons/GetApp';

const useStyles = makeStyles((theme) => ({
  root: {
  	float: "right",
    display: 'flex',
    flexDirection: 'column',
    padding: 5,
    marginRight: 30,
    marginTop: 20,
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function Actions(props) {
  const classes = useStyles();

  

  return (
    <div className={classes.root}>
      <ButtonGroup ariant="contained" color="primary" aria-label="contained primary button group">
        <Upload/>
        <Button onClick={props.onDownload} startIcon={<GetAppIcon/>} style={{marginLeft: 20}} variant="contained" color="primary">Download this data</Button>
      </ButtonGroup>
    </div>
  );
}
