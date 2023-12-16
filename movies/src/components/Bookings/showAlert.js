import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const AlertButton = ({showAlert,setShowAlert}) => {
  
  return (
    <div>
     
      { showAlert && (
        <Alert severity="success" onClose={()=>{setShowAlert(false)}}>
          <AlertTitle>Message</AlertTitle>
          Booking Successful
        </Alert>
      )}
    </div>
  );
};

export default AlertButton;
