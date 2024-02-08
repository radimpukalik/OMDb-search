import { FC, useEffect, useState } from "react";
import MovieList from "./components/MovieList/Index.tsx";
import MovieDetails from "./components/MovieDetails/Index.tsx";
import Header from "./components/Header/Index.tsx";
import { Post } from "./interfaces";
import "./App.css";
import { useLocalStorage } from "./hooks/useLocalStorage.ts";
import { useMovieFetch } from "./hooks/useMovieFetch.ts";

const App: FC = () => {
  const { setItem: setFavoritesMovies, getItem: getFavoritesMovies } =
    useLocalStorage("favorite-movies");
  const [favorites, setFavorites] = useState<Post[]>(getFavoritesMovies() || []);
  const [clickedMovieId, setClickedMovieId] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(true);
  const [isInFavorites, setIsInFavorites] = useState<boolean>(false);
  const [isLookingMovieDetails, setIsLookingMovieDetails] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [movieListPage, setMovieListPage] = useState<number>(1);
  const [totalMovieResult, setTotalMovieResult] = useState<number>(1);

  const searchUrl = `http://www.omdbapi.com/?s=${searchValue}&page=${movieListPage}&apikey=d318cf92`;
  const { data: movies } = useMovieFetch(
    searchUrl,
    [searchValue, movieListPage],
    isSearching,
    setTotalMovieResult
  );

  useEffect(() => {
    setFavoritesMovies(favorites);
  }, [favorites]);

  useEffect(() => {
    if (isSearching) {
      setMovieListPage(1);
    }
  }, [searchValue]);

  const filteredMovies =
    searchValue.length > 0
      ? favorites.filter((favorite) =>
          favorite.Title.toLowerCase().includes(searchValue.toLowerCase())
        )
      : favorites;

  return (
    <div className="app-container">
      <Header
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        setIsSearching={setIsSearching}
        setIsInFavorites={setIsInFavorites}
        isLookingMovieDetails={isLookingMovieDetails}
        setIsLookingMovieDetails={setIsLookingMovieDetails}
        isInFavorites={isInFavorites}
      />
      {isLookingMovieDetails ? (
        <div className="movie-detail-container-list">
          <MovieDetails
            clickedMovieId={clickedMovieId}
            movies={movies}
            favorites={favorites}
            setFavorites={setFavorites}
            setIsLookingMovieDetails={setIsLookingMovieDetails}
          />
        </div>
      ) : (
        <div className="movie-grid-list">
          <MovieList
            movies={isInFavorites ? filteredMovies : movies}
            favorites={favorites}
            setFavorites={setFavorites}
            setClickedMovieId={setClickedMovieId}
            setIsLookingMovieDetails={setIsLookingMovieDetails}
            totalMovieResult={totalMovieResult}
            movieListPage={movieListPage}
            isSearching={isSearching}
            isInFavorites={isInFavorites}
            searchValue={searchValue}
            setMovieListPage={setMovieListPage}
          />
        </div>
      )}
    </div>
  );
};

export default App;
