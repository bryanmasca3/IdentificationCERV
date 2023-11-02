import * as Yup from "yup";
export const SCHEMA_YUP = Yup.object().shape({
  name: Yup.string()
    .min(3, "La longitud del campo es muy corto")
    .required("Requerido"),
  surname: Yup.string()
    .min(3, "La longitud del campo es muy corto")
    .required("Requerido"),
  doi: Yup.string()
    .min(8, "La longitud del campo es muy corto")
    .max(8, "La longitud del campo es muy corto")
    .required("Requerido"),
  photo: Yup.string().required("Requerido"),
  dob: Yup.date().required("Requerido"),
  address: Yup.string().required("Requerido"),
});
