
import { useState } from "react";
import axios from "axios";
import "./App.css";

const BASE_URL = "https://imdb-movie-id.onrender.com"; 
// replace with your real Render backend URL

function App() {
  const [movieId, setMovieId] = useState("");
  const [movie, setMovie] = useState(null);
  const [sentiment, setSentiment] = useState("");

  const handleAnalyze = async () => {
    try {
      // ✅ Fetch movie details from your backend (NOT directly from OMDb)
      const movieRes = await axios.get(
        `${BASE_URL}/api/movie/${movieId}`
      );

      setMovie(movieRes.data);

      const reviews = `
        Amazing movie. Loved the action and story.
        Great performances and visuals.
        A bit slow in middle but overall fantastic.
      `;

      // ✅ Call sentiment API route properly
      const sentimentRes = await axios.post(
        `${BASE_URL}/api/sentiment`,
        { reviews }
      );

      setSentiment(sentimentRes.data.result);

    } catch (error) {
      console.error(error);
      alert("Something went wrong. Check console.");
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>IMDb Sentiment App 🎬</h1>

      <input
        type="text"
        placeholder="Enter IMDb ID (tt0133093)"
        value={movieId}
        onChange={(e) => setMovieId(e.target.value)}
      />

      <button onClick={handleAnalyze}>Analyze</button>

      {movie && (
        <div style={{ marginTop: "30px" }}>
          <h2>{movie.Title}</h2>
          <img src={movie.Poster} alt={movie.Title} width="200" />
          <p>Year: {movie.Year}</p>
          <p>IMDB Rating: {movie.imdbRating}</p>
          <p>Plot: {movie.Plot}</p>
        </div>
      )}

      {sentiment && (
        <div style={{ marginTop: "20px" }}>
          <h3>Audience Sentiment</h3>
          <p>{sentiment}</p>
        </div>
      )}
    </div>
  );
}

export default App;
