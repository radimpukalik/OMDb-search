import { useNavigate, useParams } from "react-router-dom";
import noPoster from "../assets/no_poster.jpg";
import DefinitionItem from "../components/DefinitionItem";
import FavoriteButton from "../components/FavoriteButton";
import GenreRectangle from "../components/GenreRectangle";
import useMovie from "../hooks/useMovie";
import useGameQueryStore from "../store";
import "../styles/MovieDetails.css";

const MovieDetailPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const currentSearchText = useGameQueryStore((s) => s.gameQuery.searchText);

  if (!id) return <p>no movie ID provided</p>;
  const { data, error, isLoading } = useMovie(id);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>Movie not found</p>;

  return (
    <div className="movie-detail-main-container">
      <section key={data.imdbID} className="movie-detail-container">
        <div className="left-section">
          <img
            src={data.Poster !== "N/A" ? data.Poster : noPoster}
            alt="poster-detail-menu"
            className="poster-img"
          />
        </div>

        <div className="right-section">
          <h1>
            {data.Title} ({data.Year})
          </h1>
          <p>
            {data.Country}, {data.Runtime}
          </p>
          <p>Rating - {data.imdbRating * 10}%</p>
          <GenreRectangle genre={data.Genre} />

          <h2 className="movie-details-overview">Overview</h2>
          <p className="movie-details-plot">{data.Plot}</p>
          <FavoriteButton movieId={data.imdbID} />

          <DefinitionItem term="Release date:">{data.Released}</DefinitionItem>
          <DefinitionItem term="Director:">{data.Director}</DefinitionItem>
          <DefinitionItem term="Writer:">{data.Writer}</DefinitionItem>
          <DefinitionItem term="Actors:">{data.Actors}</DefinitionItem>
        </div>
      </section>

      <div
        className="movie-detail-go-back"
        onClick={() => navigate(`/OMDb-search/search/${currentSearchText}`)}
      >
        Go Back
      </div>
    </div>
  );
};

export default MovieDetailPage;
