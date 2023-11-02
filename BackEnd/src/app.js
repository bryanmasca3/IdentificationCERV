import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";
import { db } from "./database.js";
import main from "./routes/main.js";
const PORT = process.env.PORT || 9000;


dotenv.config();
const app = express();
app.use(cors()); // Habilitar CORS
app.use(express.json());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use("/api/",main);

app.listen(PORT, () => console.log(`Server connected`, PORT));

export default app;