import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'; 
import PublishIcon from '@material-ui/icons/Publish';


import {useDropzone} from 'react-dropzone';


const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});



function Dropzone(props) {
  const {acceptedFiles, fileRejections, getRootProps, getInputProps} = useDropzone({
    accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  });
  
  const files = acceptedFiles.map(file => (

    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  props.onSelected(acceptedFiles)

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map(e => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  let renderRejectedFiles;

  if (fileRejectionItems.length > 0){
  	renderRejectedFiles = (
	  	<div><h4>Rejected files</h4><ul>{fileRejectionItems}</ul></div>
	)
  }
  

  return (
    <section className="container">
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <Typography gutterBottom>
            Drag 'n' drop some xlsx files here, or click to select files
          </Typography>
        <AddCircleOutlineIcon style={{width: "95%", height: "95%",}} color="disabled" fontSize="large"/>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
        {renderRejectedFiles}
        
      </aside>
    </section>
  );
}



const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function Upload() {

  const [open, setOpen] = React.useState(false);
  const [filesToUpload, setFilesToUpload] = React.useState([])

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
  	filesToUpload.map(
  		file => uploadFile(file)
  		)
    setOpen(false);
  };

  const onSelected = (files) =>{
  	setFilesToUpload(files)
  }

  const uploadFile = (file) => {
  	const formData = new FormData();
  	formData.append( 
        "newSpreadsheet", 
        file, 
        file.name 
      );
  	axios.post("/api/uploadfile/", formData); 
  }

  return (
    <div>
      <Button startIcon={<PublishIcon />}variant="contained" color="primary" onClick={handleClickOpen}>Upload File</Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Upload a spreadsheet
        </DialogTitle>
        <DialogContent dividers>
          <Dropzone onSelected={onSelected}/>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
