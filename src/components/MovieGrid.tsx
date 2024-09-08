import { UseQueryResult } from "@tanstack/react-query";
import SkeletonLoading from "./SkeletonLoading";
import Movie from "../entities/Movie";
import MovieDetails from "../entities/MovieDetails";
import { FetchResponse } from "../services/api-client";
import "../styles/MovieList.css";
import MovieCard from "./MovieCard";

interface Props {
  moviesObject?: UseQueryResult<FetchResponse<Movie>, Error>;
  dataTest?: MovieDetails[];
}

const MovieGrid = ({ moviesObject, dataTest }: Props) => {
  const skeletons = [...Array(5).keys()].map((i) => i + 1); // Create array of 10 elements
  const data = moviesObject?.data?.Search || dataTest;
  const error = moviesObject?.error;
  const isLoading = moviesObject?.isLoading;

  if (error) return <h1>{error.message}</h1>;

  return (
    <section className="movie-list-grid">
      {isLoading &&
        skeletons.map((skeleton) => <SkeletonLoading key={skeleton} />)}

      {data?.map((movie) => (
        <MovieCard movie={movie} key={movie.imdbID} />
      ))}
    </section>
  );
};

export default MovieGrid;
