import { ObjectId } from "mongodb";
import { client } from "../index.js";

export async function addMovie(newMovie) {
  return await client.db("b42wd2").collection("imdb").insertOne(newMovie);
}
export async function updateMovie(id, data) {
  return await client
    .db("b42wd2")
    .collection("imdb")
    .updateOne({ _id: new ObjectId(id) }, { $set: data });
}
export async function getMovieById(id) {
  return await client
    .db("b42wd2")
    .collection("imdb")
    .findOne({ _id: new ObjectId(id) });
}
export async function getAllMovies() {
  return await client.db("b42wd2").collection("imdb").find({}).toArray();
}
export async function getmoviebyName(name) {
  return client.db("b42wd2").collection("imdb").findOne({ name: name });
}
export const seperateString = (trailer) => {
  const result = trailer.split("=")[1];

  return result;
};
