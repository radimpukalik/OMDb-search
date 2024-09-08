import { useParams } from "react-router-dom";
import noPoster from "../assets/no_poster.jpg";
import DefinitionItem from "../components/DefinitionItem";
import FavoriteButton from "../components/FavoriteButton";
import GenreRectangle from "../components/GenreRectangle";
import useMovie from "../hooks/useMovie";
import "../styles/MovieDetails.css";
import useIsInFavorite from "../hooks/useIsInFavorite";
import { useState } from "react";
import BackButton from "../components/BackButton";

const MovieDetailPage = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useMovie(id!);
  const { isInFavorite } = useIsInFavorite();
  const [isFavorite, setIsFavorite] = useState(isInFavorite(data!.imdbID));

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || Object.entries(data)[0][1] === "False")
    return <p>Movie not found</p>;

  const onFavoriteStatusChange = (newStatus: boolean) => {
    setIsFavorite(newStatus);
  };

  return (
    <div className="movie-detail-main-container">
      <section
        key={data.imdbID}
        className={`movie-detail-container ${
          isInFavorite(data.imdbID) && "favorite-style"
        }`}
      >
        <div className="left-section">
          <img
            src={data.Poster !== "N/A" ? data.Poster : noPoster}
            alt="poster-detail-menu"
            className="poster-img"
          />
        </div>

        <div
          className={`right-section ${
            isInFavorite(data.imdbID) && "favorite-style"
          }`}
        >
          <h1>
            {" "}
            {data.Title} ({data.Year}){" "}
          </h1>
          <p>
            {data.Country}, {data.Runtime}
          </p>
          <p>Rating - {data.imdbRating * 10}%</p>
          <GenreRectangle genre={data.Genre} />

          <h2 className="movie-details-overview">Overview</h2>
          <p className="movie-details-plot">{data.Plot}</p>
          <FavoriteButton
            movieId={data.imdbID}
            isFavorite={isFavorite}
            onFavoriteStatusChange={onFavoriteStatusChange}
          />

          <DefinitionItem term="Release date:">{data.Released}</DefinitionItem>
          <DefinitionItem term="Director:">{data.Director}</DefinitionItem>
          <DefinitionItem term="Writer:">{data.Writer}</DefinitionItem>
          <DefinitionItem term="Actors:">{data.Actors}</DefinitionItem>
        </div>
      </section>

      <BackButton />
    </div>
  );
};

export default MovieDetailPage;
