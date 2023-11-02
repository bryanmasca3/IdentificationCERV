import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
const ModalUtil = ({ isOpen, onClose, Component, id, params,sizewidth }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: sizewidth?sizewidth:600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (<>
   { isOpen ? (
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Component id={id} onClose={onClose} params={params} />
        </Box>
      </Modal>
    ):null}
  </>);
};
export default ModalUtil;
