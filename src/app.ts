import "express-async-errors";
import cors from "cors";
import express, { Application, json } from "express";
import helmet from "helmet";
import { carRouter } from "./routes";
import { handleErrors } from "./middlewares";


export const app:Application = express();

app.use(cors());
app.use(helmet());

app.use(json());

app.use("/cars", carRouter)

app.use(handleErrors);