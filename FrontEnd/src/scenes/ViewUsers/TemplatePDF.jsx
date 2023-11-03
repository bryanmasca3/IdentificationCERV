import React, { useState, useEffect, useMemo } from "react";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import api from "./../../utils/api";
import FontRegular from "/RobotoCondensed-Regular.ttf";
import FontSemiBold from "/RobotoCondensed-SemiBold.ttf";

Font.register({
  family: "RobotoCondensed",
  fonts: [{ src: FontRegular }, { src: FontSemiBold }],
});
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    paddingHorizontal: "30px",
    paddingVertical: "20px",
    fontFamily: "RobotoCondensed",
    fontSize: "9px",
    color: "#fff",
  },
  image: {
    width: "100%",
    height: "30pt",
  },
  photo: {
    width: "100%",
    height: "63pt",
    objectFit: "cover",
  },
});

const TemplatePDF = ({ id }) => {
  const [visibility, setvisibility] = useState(false);
  const [someuser, setsomeuser] = useState(false);
  useEffect(() => {
    const getSomeUser = async (id) => {
      try {
        const response = await api.post("/someuser", {
          users: id,
        });
        console.log("Guardado exitosamente", response.data.data);
        setsomeuser(response.data.data);
        setvisibility(true);
      } catch (error) {
        console.log(error.message);
      }
    };
    getSomeUser(id);
  }, []);

  return (
    visibility && (
      <Document>
        <Page size="A4" style={styles.page}>
          {someuser.map((it) => (
            <View
              style={[
                { flexDirection: "row" },
                { gap: "5px" },
                { marginBottom: "5px" },
              ]}
            >
              <View
                style={[
                  { flex: 1 },
                  { flexDirection: "column" },
                  { backgroundColor: "#545454" },
                ]}
              >
                {" "}
                <View
                  style={[
                    { flexDirection: "row" },
                    { backgroundColor: "#545454" },
                    { padding: "5px" },
                  ]}
                >
                  <View style={[{ flex: 1 }]}>
                    <Image style={[styles.image]} src="logo1.png" />
                  </View>
                  <View style={[{ flex: 7 }, { flexDirection: "column" }]}>
                    <Text
                      style={[{ textAlign: "center" }, { fontSize: "10px" }]}
                    >
                      {"Gerencia del Programa de Seguridad"}
                    </Text>
                    <Text
                      style={[
                        { textAlign: "center" },
                        { fontSize: "11px" },
                        { fontWeight: 600 },
                      ]}
                    >
                      {"LICENCIA DE CONDUCIR"}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    { flexDirection: "column" },
                    { backgroundColor: "#fff" },
                    { borderRadius: "10px" },
                    { marginLeft: "10px" },
                    { marginRight: "10px" },
                    { marginBottom: "10px" },

                    { padding: "10px" },
                  ]}
                >
                  {" "}
                  <View style={[{ flexDirection: "row" }]}>
                    <View style={[{ flex: 1 }]}>
                      <Image style={[styles.photo]} src={it.photo} />
                    </View>
                    <View
                      style={[
                        { flex: 3 },
                        { flexDirection: "column" },
                        { paddingLeft: "10px" },
                        { position: "relative" },
                      ]}
                    >
                      <View
                        style={[
                          { flex: 1 },
                          {
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                          },
                        ]}
                      >
                        <Image
                          style={[
                            { width: "100%", height: "100%" },
                            { opacity: 0.3 },
                          ]}
                          src={"background-opacity.png"}
                        />
                      </View>
                      <Text
                        style={[
                          { color: "#000" },
                          { fontWeight: 400 },
                          { fontSize: "7px" },
                        ]}
                      >
                        {"Nombres y Apellidos"}{" "}
                      </Text>
                      <Text
                        style={[
                          { color: "#000" },
                          { fontWeight: 600 },
                          { fontSize: "9px" },
                        ]}
                      >
                        {it.name + " " + it.surname}
                      </Text>
                      <View
                        style={[
                          { flexDirection: "row" },
                          {
                            borderTop: "1px solid #000",
                            borderBottom: "1px solid #000",
                            margin: "3px 0px",
                            padding: "3px 0px",
                          },
                        ]}
                      >
                        <View
                          style={[{ flexDirection: "column" }, { flex: 1 }]}
                        >
                          <Text
                            style={[
                              { color: "#000" },
                              { fontWeight: 400 },
                              { fontSize: "7px" },
                            ]}
                          >
                            {"Clase:"}
                          </Text>
                          <Text
                            style={[
                              { color: "#000" },
                              { fontWeight: 400 },
                              { fontSize: "7px" },
                            ]}
                          >
                            {"A"}
                          </Text>
                        </View>
                        <View
                          style={[{ flexDirection: "column" }, { flex: 1 }]}
                        >
                          {" "}
                          <Text
                            style={[
                              { color: "#000" },
                              { fontWeight: 400 },
                              { fontSize: "7px" },
                            ]}
                          >
                            {"Categoria:"}
                          </Text>
                          <Text
                            style={[
                              { color: "#000" },
                              { fontWeight: 400 },
                              { fontSize: "7px" },
                            ]}
                          >
                            {"Uno"}
                          </Text>
                        </View>
                      </View>
                      <View style={[{ flexDirection: "row" }]}>
                        <View
                          style={[{ flexDirection: "column" }, { flex: 1 }]}
                        >
                          <Text
                            style={[
                              { color: "#000" },
                              { fontWeight: 400 },
                              { fontSize: "6px" },
                            ]}
                          >
                            {"Fecha de Expedición:"}
                          </Text>
                          <Text
                            style={[
                              { color: "#000" },
                              { fontWeight: 400 },
                              { fontSize: "6px" },
                            ]}
                          >
                            {"06/11/2023"}
                          </Text>
                        </View>
                        <View
                          style={[{ flexDirection: "column" }, { flex: 1 }]}
                        >
                          {" "}
                          <Text
                            style={[
                              { color: "#000" },
                              { fontWeight: 400 },
                              { fontSize: "6px" },
                            ]}
                          >
                            {"Fecha de Revalidación:"}
                          </Text>
                          <Text
                            style={[
                              { color: "#000" },
                              { fontWeight: 400 },
                              { fontSize: "6px" },
                            ]}
                          >
                            {"06/11/2024"}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View
                    style={[{ flexDirection: "row" }, { marginTop: "5px" }]}
                  >
                    <View
                      style={[
                        { flexDirection: "row" },
                        { flex: 1 },
                        { alignItems: "center" },
                      ]}
                    >
                      <Text
                        style={[
                          { color: "green" },
                          { fontWeight: 600 },
                          { fontSize: "12px" },
                        ]}
                      >
                        {"Nº"}
                      </Text>
                      <Text
                        style={[
                          { color: "#000" },
                          { fontWeight: 600 },
                          { fontSize: "12px" },
                        ]}
                      >
                        {it.doi}
                      </Text>
                    </View>
                    <View
                      style={[
                        { color: "#000" },
                        { flexDirection: "row" },
                        { flex: 1 },
                      ]}
                    >
                      <Image style={[styles.image]} src={"code.png"} />
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={[
                  { flex: 1 },
                  { flexDirection: "column" },
                  { backgroundColor: "#545454" },
                ]}
              >
                {" "}
                <View
                  style={[
                    { flexDirection: "row" },
                    { backgroundColor: "#545454" },
                    { padding: "5px" },
                  ]}
                >
                  <View style={[{ flex: 1 }]}>
                    <Image style={[styles.image]} src="logo1.png" />
                  </View>
                  <View style={[{ flex: 7 }, { flexDirection: "column" }]}>
                    <Text
                      style={[{ textAlign: "center" }, { fontSize: "10px" }]}
                    >
                      {"Gerencia del Programa de Seuridad"}
                    </Text>
                    <Text
                      style={[
                        { textAlign: "center" },
                        { fontSize: "11px" },
                        { fontWeight: 600 },
                      ]}
                    >
                      {"LICENCIA DE CONDUCIR"}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    { flexDirection: "column" },
                    { backgroundColor: "#fff" },
                    { borderRadius: "10px" },
                    { marginLeft: "10px" },
                    { marginRight: "10px" },
                    { marginBottom: "10px" },
                    { padding: "10px" },
                  ]}
                >
                  <View style={[{ flexDirection: "row" }]}>
                    <View
                      style={[
                        { flex: 2 },
                        { flexDirection: "column" },
                        { paddingLeft: "10px" },
                      ]}
                    >
                      <View style={[{ flex: 1 }]}>
                        <Text
                          style={[
                            { color: "#000" },
                            { fontWeight: 400 },
                            { fontSize: "6px" },
                          ]}
                        >
                          {"Fecha de Nacimiento:"}{" "}
                        </Text>
                        <Text
                          style={[
                            { color: "#000" },
                            { fontWeight: 600 },
                            { fontSize: "7px" },
                          ]}
                        >
                          {it.dob
                            ? new Date(it?.dob).toLocaleDateString("es-ES")
                            : ""}
                        </Text>
                      </View>
                      <View style={[{ flex: 1 }]}>
                        <Text
                          style={[
                            { color: "#000" },
                            { fontWeight: 400 },
                            { fontSize: "6px" },
                          ]}
                        >
                          {"Domicilio:"}{" "}
                        </Text>
                        <Text
                          style={[
                            { color: "#000" },
                            { fontWeight: 600 },
                            { fontSize: "6px" },
                          ]}
                        >
                          {/*  {it.address} */}
                          {"TOQUEPALA"}
                        </Text>
                      </View>
                      <View style={[{ flex: 1 }]}>
                        <Text
                          style={[
                            { color: "#000" },
                            { fontWeight: 400 },
                            { fontSize: "6px" },
                          ]}
                        >
                          {"Restricciones:"}{" "}
                        </Text>
                        <Text
                          style={[
                            { color: "red" },
                            { fontWeight: 600 },
                            { fontSize: "6px" },
                          ]}
                        >
                          {"SIN RESTRICCIONES"}
                        </Text>
                      </View>
                    </View>
                    <View style={[{ flex: 5 }]}>
                      <Image
                        style={[
                          { width: "100%", height: "63pt", opacity: "0.4" },
                        ]}
                        src={"background.png"}
                      />
                    </View>
                  </View>
                  <View
                    style={[{ flexDirection: "row" }, { marginTop: "5px" }]}
                  >
                    <View
                      style={[
                        { color: "#000" },
                        { flexDirection: "row" },
                        { flex: 1 },
                      ]}
                    >
                      <Image style={[styles.image]} src={"codefinal.png"} />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </Page>
      </Document>
    )
  );
};

export default TemplatePDF;
