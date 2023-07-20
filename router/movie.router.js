import express from "express";
import {
  getAllMovies,
  getMovieById,
  updateMovie,
  getmoviebyName,
  seperateString,
  addMovie,
} from "../service/movie.service.js";

const router = express.Router();

router.get("/movies", async (req, res) => {
  try {
    const movies = await getAllMovies();
    res.status(200).send(movies);
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//get movie by id
router.get("/movies/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await getMovieById(id);
    res.status(200).send(movie);
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//edit movie
router.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    await updateMovie(id, data);
    res.status(200).send({ message: "Movie Updated successfully" });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//add movie
router.post("/addmovie", async (req, res) => {
  try {
    let data = req.body;
    let { name, trailer } = data;

    const resourceExists = await getmoviebyName(name);

    if (resourceExists) {
      res.status(409).json({
        message: "The Movie you are trying to create already exists.",
      });
    } else {
      const string = await seperateString(trailer);
      const link = `https://youtube.com/embed/${string}`;
      let newMovie = {
        ...data,
        trailer: link,
      };
      console.log(newMovie);
      await addMovie(newMovie);
      res.status(200).json({ message: "Resource created successfully." });
    }
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
export default router;
