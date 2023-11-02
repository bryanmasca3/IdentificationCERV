import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
const Alerts = ({ alert,setAlertCustom }) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertCustom({
        ...alert,
        state:false
    })
  };
  return (
    <Snackbar open={alert.state} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={alert.type} sx={{ width: "100%" }}>
        {alert.message}
      </Alert>
    </Snackbar>
  );
};

export default Alerts;