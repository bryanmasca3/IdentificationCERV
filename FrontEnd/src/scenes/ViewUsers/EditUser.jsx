import React from "react";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { SCHEMA_YUP } from "./../CreateUser/YupValidation";
import Webcam from "react-webcam";
import api from "./../../utils/api";
import { useFormik } from "formik";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const EditUser = ({ id, onClose, params }) => {
  const { setAlertCustom, alertCustom } = params;
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };
  const webcamRef = React.useRef(null);
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    formik.setFieldValue("photo", imageSrc);
  }, [webcamRef]);
  const [user, setuser] = useState({});
  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await api.get(`/user/${id}`);
        console.log(response.data.data);
        setuser(response.data.data);
        formik.setValues({
          name: response.data.data?.name,
          surname: response.data.data?.surname,
          doi: response.data.data?.doi,
          photo: response.data.data?.photo,
          dob: new Date(response.data.data?.dob),
          address: response.data.data?.address,
        });
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

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      doi: "",
      photo: "",
      dob: new Date(),
      address: "",
    },
    validationSchema: SCHEMA_YUP,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      const { name, surname, doi, photo, dob, address } = values;
      console.log(values);
      try {
        const response = await api.put(`/user/${id}`, {
          name: name.toUpperCase().trim(),
          surname: surname.toUpperCase().trim(),
          doi: doi.toUpperCase().trim(),
          address: address.toUpperCase().trim(),
          photo,
          dob: new Date(dob),
        });
        console.log(response);
        setAlertCustom({
          type: "success",
          message: response.data.message,
          state: true,
        });
        resetForm();
        onClose();
      } catch (error) {
        console.log(error);
        setAlertCustom({
          ...alertCustom,
          type: "error",
          message: response.response.data.error,
          state: true,
        });
      } finally {
        setSubmitting(false);
      }
    },
  });
  const style = {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
  };

  return (
    <>
      {user ? (
        <form onSubmit={formik.handleSubmit}>
          <Box
            mt="20px"
            display="grid"
            gridTemplateColumns="repeat(2, 1fr)"
            gap="20px"
          >
            <Box display={"flex"} flexDirection={"column"} gap={"20px"}>
              <TextField
                id="name"
                name="name"
                label="NOMBRES"
                variant="outlined"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextField
                id="surname"
                name="surname"
                label="APELLIDOS"
                variant="outlined"
                value={formik.values.surname}
                onChange={formik.handleChange}
                error={formik.touched.surname && Boolean(formik.errors.surname)}
                helperText={formik.touched.surname && formik.errors.surname}
              />
              <TextField
                id="doi"
                name="doi"
                label="DNI"
                variant="outlined"
                /* type="number" */
                value={formik.values.doi}
                onChange={formik.handleChange}
                error={formik.touched.doi && Boolean(formik.errors.doi)}
                helperText={formik.touched.doi && formik.errors.doi}
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={formik.values.dob}
                  id="dob"
                  name="dob"
                  label="FECHA DE NACIMIENTO"
                  format={"MM/dd/yyyy"}
                  onChange={(val) => {
                    formik.setFieldValue("dob", val);
                  }}
                  renderInput={(params) => (
                    <>
                      <TextField {...params} />
                    </>
                  )}
                />
              </LocalizationProvider>
              <TextField
                id="address"
                name="address"
                label="DIRECCION"
                variant="outlined"
                /* type="number" */
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
              <Box
                sx={{
                  background: "#fff",
                  height: "100%",
                  borderRadius: "10px",
                }}
              >
                <img
                  src={formik.values.photo}
                  id="photo"
                  width={"100%"}
                  name="photo"
                  alt="Captured"
                />
              </Box>
            </Box>
            <Box display={"flex"} flexDirection={"column"} gap={"20px"}>
              <Webcam
                audio={false}
                ref={webcamRef}
                width={"100%"}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
              />
              {formik.errors.photo ? (
                <Box
                  sx={{
                    color: "#bf3333",
                    fontSize: "0.9rem",
                  }}
                >
                  {formik.errors.photo}
                </Box>
              ) : null}

              <Button variant="contained" color="info" onClick={capture}>
                TOMAR FOTO
              </Button>
            </Box>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"end"}
            marginTop={"30px"}
            gap={"10px"}
            disabled={formik.isSubmitting}
          >
            <Button
              variant="contained"
              color="success"
              type="submit"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "CARGAND0" : "GUARDAR"}
            </Button>
            <Button variant="contained" onClick={onClose}>
              CERRAR
            </Button>
            {/*  */}
          </Box>
        </form>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {"CARGANDO"}
        </Box>
      )}
    </>
  );
};

export default EditUser;
