import { useNavigate } from "react-router-dom";
import noPoster from "../assets/no_poster.jpg";
import Movie from "../entities/Movie";
import MovieDetails from "../entities/MovieDetails";
import "../styles/MovieList.css";
import FavoriteButton from "./FavoriteButton";

interface Props {
  movie: Movie | MovieDetails;
}

const MovieCard = ({ movie }: Props) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="movie-img-container"
        onClick={() => navigate(`/OMDb-search/movie/${movie.imdbID}`)}
      >
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : noPoster}
          alt="movie-poster"
          className="movie-img"
        />
      </div>
      <div className="movie-title-container">{movie.Title}</div>
      <div className="flex">
        <div className="movie-year-container">{movie.Year}</div>
        <FavoriteButton movieId={movie.imdbID} />
      </div>
    </>
  );
};

export default MovieCard;
