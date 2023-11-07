import React, { useState } from "react";
import { Box, Button, TextField, FormHelperText } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { SCHEMA_YUP } from "./YupValidation";
import Webcam from "react-webcam";
import dayjs from "dayjs";
import api from "./../../utils/api";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Alerts from "./../../components/Alerts";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
const CreateUser = () => {
  const [alertCustom, setAlertCustom] = useState({
    type: "success",
    message: "",
    state: false,
  });
  const webcamRef = React.useRef(null);
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    formik.setFieldValue("photo", imageSrc);
  }, [webcamRef]);
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };
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
      try {
        const response = await api.post("/user", {
          name: name.toUpperCase().trim(),
          surname: surname.toUpperCase().trim(),
          doi: doi.toUpperCase().trim(),
          address: address.toUpperCase().trim(),
          photo,
          dob: new Date(dob.$d),
        });
        setAlertCustom({
          type: "success",
          message: response.data.message,
          state: true,
        });
        resetForm();
      } catch (error) {
        console.log(error);
        setAlertCustom({
          ...alertCustom,
          type: "error",
          message: error.response.data.error,
          state: true,
        });
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "50px 100px",
      }}
    >
      {alertCustom.state && (
        <Alerts alert={alertCustom} setAlertCustom={setAlertCustom}></Alerts>
      )}
      <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
        <Box
          display="grid"
          gridTemplateColumns="repeat(2, 1fr)"
          width={"100%"}
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
            <Box>
              {" "}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateField"]}>
                  <DateField
                    label="FECHA DE NACIMIENTO"
                    id="dob"
                    name="dob"
                    format="DD/MM/YYYY"
                    onChange={(val) => {
                      formik.setFieldValue("dob", val);
                    }}
                    sx={{ width: "100%" }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>

            {/*       <LocalizationProvider dateAdapter={AdapterDateFns}>
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
            </LocalizationProvider> */}
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
            {formik.values.photo ? (
              <Box
                sx={{
                  background: "#fff",
                  height: "100%",
                  borderRadius: "10px",
                  border: "2px solid rgba(0, 0, 0, 0.23);",
                }}
              >
                <img
                  src={formik.values.photo}
                  id="photo"
                  name="photo"
                  alt="Captured"
                />
              </Box>
            ) : (
              <>
                <Box
                  sx={{
                    background: "#fff",
                    height: "100%",
                    borderRadius: "10px",
                    border: "2px solid rgba(0, 0, 0, 0.23);",
                    color: "rgba(0, 0, 0, 0.6);",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  FOTO
                </Box>

                <FormHelperText sx={{ color: "#bf3333" }}>
                  <p
                    style={{
                      padding: "10px",
                    }}
                  >
                    {formik.errors.photo}
                  </p>
                </FormHelperText>
              </>
            )}

            <Button
              variant="contained"
              color="success"
              type="submit"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "CARGAND0" : "GUARDAR"}
            </Button>
          </Box>
          <Box display={"flex"} flexDirection={"column"} gap={"20px"}>
            <Webcam
              audio={false}
              ref={webcamRef}
              width={"100%"}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
            />
            <Button variant="contained" color="info" onClick={capture}>
              TOMAR FOTO
            </Button>
          </Box>
        </Box>{" "}
      </form>
    </Box>
  );
};

export default CreateUser;
