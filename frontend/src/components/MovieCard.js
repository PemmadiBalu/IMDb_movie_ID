
function MovieCard({ movie }) {
  return (
    <div>
      <img src={movie.poster} alt={movie.title} width="200" />
      <h2>{movie.title}</h2>
      <p>Year: {movie.year}</p>
      <p>Rating: {movie.rating}</p>
      <p>Cast: {movie.cast}</p>
      <p>{movie.plot}</p>
    </div>
  );
}

export default MovieCard;