import React, { useEffect, useState, useRef } from "react";
import api from "./../../utils/api";
import ModalUtil from "./../../components/ModalUtil";
import { Box, Button, TextField } from "@mui/material";
import ViewUser from "./ViewUser";
import ViewPdf from "./../../components/ViewPdf";
import TemplatePDF from "./TemplatePDF";
import CreateIcon from "@mui/icons-material/Create";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Alerts from "./../../components/Alerts";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  esES,
} from "@mui/x-data-grid";
import EditUser from "./EditUser";
const ViewUsers = () => {
  const dataGridRef = useRef(null);
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalOpenPDF, setModalOpenPDF] = useState(false);
  const [id, setId] = useState(null);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [alertCustom, setAlertCustom] = useState({
    type: "success",
    message: "",
    state: false,
  });
  const handleOpenModal = (id) => {
    setModalOpen(true);
    setId(id);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleOpenModalPDF = (id) => {
    setModalOpenPDF(true);
  };

  const handleCloseModalPDF = () => {
    setModalOpenPDF(false);
  };

  const handleOpenModalEdit = (id) => {
    setModalEdit(true);
    setId(id);
  };

  const handleCloseModalEdit = () => {
    setModalEdit(false);
  };
  /*   const onPrint = async () => {
    console.log(rowSelectionModel.length);
    if (rowSelectionModel.length > 0 && rowSelectionModel.length < 5) {
      const response = await api.post("/someuser", {
        users: rowSelectionModel,
      });
      console.log("Guardado exitosamente", response.data);
      setRowSelectionModel([]);
    } else {
      console.log("selecicon min 1 max 4");
    }
  }; */
  useEffect(() => {
    const getUser = async () => {
      try {
        // Realizar la solicitud GET a la API utilizando async/await
        const response = await api.get("/user");
        console.log(response.data.data);
        // Manejar la respuesta exitosa y actualizar el estado con los datos recibidos
        setData(response.data.data);
      } catch (error) {
        // Manejar errores en la solicitud
        console.error("Error al recuperar datos:", error);
      }
    };

    getUser(); // Llamamos a la función asincrónica
  }, [modalOpenPDF,alertCustom]);
  const columns = [
    {
      field: "N",
      headerName: "#",
      flex: 0.5,
      renderCell: (index) =>
        index.api.getRowIndexRelativeToVisibleRows(index.row._id) + 1,
    },
    {
      field: "name",
      headerName: "NOMBRE",
      flex: 1,
    },
    {
      field: "surname",
      headerName: "APELLIDOS",
      flex: 1,
    },
    {
      field: "doi",
      headerName: "DNI",
      flex: 0.5,
    },
    {
      field: "print",
      headerName: "IMPRESO?",
      renderCell: (params) => (params.row.print?"SI":"NO" )
    },
    {
      field: "ope",
      headerName: "",
      align: "center",
      renderCell: (params) => (
        <Box display={"flex"} gap={"5px"}>
          <VisibilityIcon
            sx={{ cursor: "pointer" }}
            onClick={() => handleOpenModal(params.row._id)}
          ></VisibilityIcon>
          <CreateIcon
            color="warning"
            sx={{ cursor: "pointer" }}
            onClick={() => handleOpenModalEdit(params.row._id)}
          ></CreateIcon>
        </Box>
      ),
    },
  ];
  return (
    <>
      {alertCustom.state && (
        <Alerts alert={alertCustom} setAlertCustom={setAlertCustom}></Alerts>
      )}
      <ModalUtil
        isOpen={modalOpen}
        onClose={handleCloseModal}
        Component={ViewUser}
        id={id}
      ></ModalUtil>
      <ModalUtil
        isOpen={modalEdit}
        onClose={handleCloseModalEdit}
        Component={EditUser}
        sizewidth={700}
        id={id}
        params={
          new Object({
            setAlertCustom: setAlertCustom,
            alertCustom: alertCustom,
          })
        }
      ></ModalUtil>
      <ModalUtil
        isOpen={modalOpenPDF}
        onClose={handleCloseModalPDF}
        Component={ViewPdf}
        params={
          new Object({
            handleCloseModal: handleCloseModalPDF,
            Component: TemplatePDF,
            title: "fdf",
          })
        }
        id={rowSelectionModel}
      ></ModalUtil>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "10px 50px",
        }}
      >
        <DataGrid
          ref={dataGridRef}
          loading={!data}
          getRowId={(row) => row._id}
          rows={data || []}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          columns={columns}
          autoHeight
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
          rowSelectionModel={rowSelectionModel}
          components={{
            Toolbar: () => (
              <GridToolbarContainer>
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
              </GridToolbarContainer>
            ),
          }}
        />
        <Box display={"flex"} justifyContent={"end"} marginTop={"30px"}>
          <Button
            variant="contained"
            color="info"
            onClick={() => handleOpenModalPDF()}
            disabled={rowSelectionModel.length ? false : true}
          >
            IMPRIMIR
          </Button>
          {/*  */}
        </Box>
      </Box>
    </>
  );
};

export default ViewUsers;
