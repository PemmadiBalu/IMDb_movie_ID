
import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Movie route
app.get("/api/movie/:id", async (req, res) => {
  try {
    const imdbID = req.params.id;

    const response = await axios.get(
      `http://www.omdbapi.com/?i=${imdbID}&apikey=${process.env.OMDB_API_KEY}`
    );

    if (response.data.Response === "False") {
      return res.status(400).json({ error: response.data.Error });
    }

    res.json(response.data);
  } catch (error) {
    console.error("Movie Fetch Error:", error.message);
    res.status(500).json({ error: "Failed to fetch movie" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});