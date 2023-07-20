import express from "express";
import * as dotenv from "dotenv";
import { MongoClient } from "mongodb";
import moviesRouter from "./router/movie.router.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

//Database-----------------------------------
const MONGO_URL = process.env.MONGO_URL;
export const client = new MongoClient(MONGO_URL);
await client.connect();
//--------------------------------------------

app.use(cors());
app.use(express.json());
app.use("/", moviesRouter);

//get all movies

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
