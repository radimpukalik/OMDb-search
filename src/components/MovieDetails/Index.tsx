import { FC, useEffect, useState } from "react";
import "./MovieDetails.css";
import noPoster from "../../assets/no_poster.jpg";
import GenreRectangle from "./GenreRectangle";
import { Post } from "../../interfaces";
import AddFavorites from "../MovieList/AddFavorites";
import RemoveFavorites from "../MovieList/RemoveFavorites";

interface Props {
  clickedMovieId: string;
  movies: Post[];
  favorites: Post[];
  setFavorites: React.Dispatch<React.SetStateAction<Post[]>>;
  setIsLookingMovieDetails: React.Dispatch<React.SetStateAction<boolean>>;
}

const MovieDetails: FC<Props> = ({
  clickedMovieId,
  movies,
  favorites,
  setFavorites,
  setIsLookingMovieDetails,
}) => {
  const [movieDetails, setMovieDetails] = useState<Record<string, any>>({});
  const [isDetailLoading, setIsDetailLoading] = useState<boolean>(false);

  const getMovieRequest = async (clickedMovieId: string) => {
    setIsDetailLoading(true);
    const detailUrl = `http://www.omdbapi.com/?i=${clickedMovieId}&apikey=d318cf92`;

    const response = await fetch(detailUrl);
    const responseJson = await response.json();

    if (responseJson.Response) {
      setMovieDetails(responseJson);
    }

    setIsDetailLoading(false);
  };

  useEffect(() => {
    getMovieRequest(clickedMovieId);
  }, []);

  const isFavorite = (movie: Post) => {
    return favorites.map((favorite) => favorite.imdbID).includes(movie.imdbID);
  };

  const handleGoBack = () => {
    setIsLookingMovieDetails(false);
  };

  let movie = movies.find((favorite) => favorite.imdbID === clickedMovieId);
  if (!movie) {
    movie = favorites.find((favorite) => favorite.imdbID === clickedMovieId);
  }

  return (
    <>
      <div className="movie-detail-main-container">
        {!isDetailLoading ? (
          <div key={movieDetails.imdbID} className="movie-detail-container">
            <div className="left-section">
              <img
                src={movieDetails.Poster !== "N/A" ? movieDetails.Poster : noPoster}
                alt="poster-detail-menu"
                className="poster-img"
              />
            </div>

            <div className="right-section">
              <div className="movie-details-title">
                <strong>
                  {movieDetails.Title} ({movieDetails.Year})
                </strong>
              </div>

              <div className="movie-details-details">
                {movieDetails.Country}, {movieDetails.Runtime}
                <div>
                  <div className="movie-details-rating-container">
                    Rating - <strong>{movieDetails.imdbRating * 10}%</strong>
                  </div>
                </div>
              </div>
              <GenreRectangle genre={movieDetails.Genre} />
              <div className="movie-details-overview">
                <strong>Overview</strong>
              </div>
              <div className="movie-details-plot">{movieDetails.Plot}</div>
              <div className="movie-details-border favorite-button-container">
                <div>
                  <strong>Release date:</strong> {movieDetails.Released}
                </div>
                <div className="favorite-button">
                  {movie ? (
                    !isFavorite(movie) ? (
                      <AddFavorites
                        movie={movie}
                        favorites={favorites}
                        setFavorites={setFavorites}
                      />
                    ) : (
                      <RemoveFavorites
                        movie={movie}
                        favorites={favorites}
                        setFavorites={setFavorites}
                      />
                    )
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
              <div className="movie-details-border">
                <strong>Director:</strong> {movieDetails.Director}
              </div>
              <div className="movie-details-border">
                <strong>Writer:</strong> {movieDetails.Writer}
              </div>
              <div className="movie-details-border">
                <strong>Actors:</strong> {movieDetails.Actors}
              </div>
            </div>
          </div>
        ) : (
          <div className="loading">Loading Movie Details ...</div>
        )}
        <div className="movie-detail-go-back" onClick={handleGoBack}>
          Go Back
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
