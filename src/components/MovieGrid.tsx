import { UseQueryResult } from "@tanstack/react-query";
import SkeletonLoading from "./SkeletonLoading";
import Movie from "../entities/Movie";
import MovieDetails from "../entities/MovieDetails";
import { FetchResponse } from "../services/api-client";
import MovieCard from "./MovieCard";
import "../styles/components/MovieGrid.css";
import NoFavoritesMessage from "./NoFavoritesMessage";

interface Props {
  moviesObject?: UseQueryResult<FetchResponse<Movie>, Error>;
  dataTest?: MovieDetails[];
}

const MovieGrid = ({ moviesObject, dataTest }: Props) => {
  const skeletons = [...Array(10).keys()].map((i) => i + 1);
  const data = moviesObject?.data?.Search || dataTest;
  const error = moviesObject?.error;
  const isLoading = moviesObject?.isLoading;

  if (error) return <h1>{error.message}</h1>;
  if (dataTest && dataTest.length === 0) return <NoFavoritesMessage />;

  return (
    <main className="movie-list-grid">
      {isLoading &&
        skeletons.map((skeleton) => <SkeletonLoading key={skeleton} />)}

      {data?.map((movie) => (
        <MovieCard movie={movie} key={movie.imdbID} />
      ))}
    </main>
  );
};

export default MovieGrid;
