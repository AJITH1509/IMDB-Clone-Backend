import express from "express";
import * as dotenv from "dotenv";
import { MongoClient } from "mongodb";
import cors from "cors";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

//Database-----------------------------------
const MONGO_URL = process.env.MONGO_URL;
export const client = new MongoClient(MONGO_URL);
await client.connect();
console.log("Mongo is connected !!!  ");
//--------------------------------------------

app.use(cors());
app.use(express.json());

//get all movies
app.get("/", async (req, res) => {
  res.send("hi");
});

app.post("/addmovie", async (req, res) => {
  const data = req.body;
  await client.db("b42wd2").collection("imdb").insertOne(data);
  res.status(200).send({ message: "Movie added successfully" });
});

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
