import React from "react";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";

import api from "./../../utils/api";

const ViewUser = ({ id, onClose }) => {
  const [user, setuser] = useState({});
  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await api.get(`/user/${id}`);
        console.log(response.data.data);
        setuser(response.data.data);
      } catch (error) {
        setAlertCustom({
          ...alertCustom,
          type: "error",
          message: error.message,
          state: true,
        });
      }
    };
    getUserById();
  }, []);
  const style = {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
  };
  return (
    <>
      {user ? (
        <>
          <Box
            mt="20px"
            display="grid"
            gridTemplateColumns="repeat(2, 1fr)"
            gap="20px"
          >
            <Box sx={style}>
              <label for="my-input">NOMBRES</label>
              <TextField disabled value={user?.name} />
            </Box>
            <Box sx={style}>
              <label for="my-input">APELLIDOS</label>
              <TextField disabled value={user?.surname} />
            </Box>
            <Box sx={style}>
              <label for="my-input">DNI</label>
              <TextField disabled value={user?.doi} />
            </Box>
            <Box sx={style}>
              <label for="my-input">FECHA DE NACIMIENTO</label>
              <TextField
                disabled
                value={new Date(user?.dob).toLocaleDateString("es-ES")}
              />
            </Box>
            <Box sx={style}>
              <label for="my-input">DIRECCION</label>
              <TextField disabled value={user?.address} />
            </Box>
          </Box>
          <Box
            sx={{
              background: "#fff",
              height: "100%",
              borderRadius: "10px",
              marginTop: "10px",
              border: "2px solid rgba(0, 0, 0, 0.23);",
            }}
          >
            <img
              src={user.photo}
              id="photo"
              width={"100%"}
              name="photo"
              alt="Captured"
            />
          </Box>
          <Box display={"flex"} justifyContent={"end"} marginTop={"30px"}>
            <Button variant="contained" onClick={onClose}>
              CERRAR
            </Button>
            {/*  */}
          </Box>
        </>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {"CARGANDO"}
        </Box>
      )}
    </>
  );
};

export default ViewUser;
