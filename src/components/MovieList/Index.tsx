import { FC } from "react";
import { Post } from "../../interfaces";
import "./MovieList.css";
import AddFavorites from "./AddFavorites";
import RemoveFavorites from "./RemoveFavorites";
import noPoster from "../../assets/no_poster.jpg";
import { FaFilm } from "react-icons/fa";
import { IoBookmarkOutline } from "react-icons/io5";
import Pages from "./Pages";

interface Props {
  movies: Post[];
  favorites: Post[];
  setFavorites: React.Dispatch<React.SetStateAction<Post[]>>;
  setClickedMovieId: React.Dispatch<React.SetStateAction<string>>;
  setIsLookingMovieDetails: React.Dispatch<React.SetStateAction<boolean>>;
  setMovieListPage: React.Dispatch<React.SetStateAction<number>>;
  totalMovieResult: number;
  movieListPage: number;
  isSearching: boolean;
  isInFavorites: boolean;
  searchValue: string;
}

const MovieList: FC<Props> = ({
  movies,
  favorites,
  setFavorites,
  setClickedMovieId,
  setIsLookingMovieDetails,
  setMovieListPage,
  totalMovieResult,
  movieListPage,
  isSearching,
  isInFavorites,
  searchValue,
}) => {
  const isFavorite = (movie: Post) => {
    return favorites.map((favorite) => favorite.imdbID).includes(movie.imdbID);
  };

  const handleMovieClick = (movie: Post) => {
    setClickedMovieId(movie.imdbID);
    setIsLookingMovieDetails(true);
  };

  return searchValue.length > 2 || (movies.length > 0 && isInFavorites) ? (
    <>
      <div className={`movie-list-grid ${isInFavorites && "movie-list-grid-favorites"}`}>
        {movies.map((movie) => (
          <div
            className={`movie-container ${
              (isInFavorites || isFavorite(movie)) && "favorite-style"
            }`}
            key={movie.imdbID}
            onClick={() => handleMovieClick(movie)}
          >
            <div className="movie-img-container">
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : noPoster}
                alt="movie-poster"
                className="movie-img"
              />
            </div>
            <div className="movie-title-container">
              <div>{movie.Title}</div>
            </div>
            <div className="movie-year-container">
              <div>{movie.Year}</div>
              {!isFavorite(movie) ? (
                <AddFavorites movie={movie} favorites={favorites} setFavorites={setFavorites} />
              ) : (
                <RemoveFavorites movie={movie} favorites={favorites} setFavorites={setFavorites} />
              )}
            </div>
          </div>
        ))}
      </div>
      {isSearching && (
        <Pages
          totalMovieResult={totalMovieResult}
          movieListPage={movieListPage}
          setMovieListPage={setMovieListPage}
        />
      )}
    </>
  ) : (
    <div className="empty-movie-list-container">
      <div className="empty-mobie-list-icon">
        {isInFavorites ? (
          <IoBookmarkOutline size={200} color="grey" />
        ) : (
          <FaFilm size={200} color="grey" />
        )}
      </div>
      <p className="empty-movie-list-text">
        {isInFavorites ? "Your Favorite List Is Empty" : "Start Exploring!"}
      </p>
    </div>
  );
};

export default MovieList;
