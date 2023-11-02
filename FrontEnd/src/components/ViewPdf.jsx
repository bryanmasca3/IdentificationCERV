import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import { Box, Button } from "@mui/material";

const ViewPdf = ({ id, params }) => {
  const { Component, title } = params;

  return (
    <>
      <PDFViewer
        showToolbar={true}
        style={{
          width: "100%",
          height: "80vh",
        }}
      >
        <Component id={id} />
      </PDFViewer>
     {/*  <PDFDownloadLink
        document={<Component id={id} />}
        fileName={title + ".pdf"}
      >
        {({ loading }) =>
          loading ? (
            "Loading document..."
          ) : (
            <Box
              display={"flex"}
              justifyContent={"end"}
              mt={"10px"}
              gap={"10px"}
            >
              <Button variant="contained" color="success">
                DESCARGAR
              </Button>{" "}
            </Box>
          )
        }
      </PDFDownloadLink> */}
    </>
  );
};

export default ViewPdf;
