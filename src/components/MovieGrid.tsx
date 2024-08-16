import { UseQueryResult } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
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
  const skeletons = [...Array(10).keys()].map((i) => i + 1);

  const data = moviesObject?.data?.Search || dataTest;
  const error = moviesObject?.error;
  const isLoading = moviesObject?.isLoading;

  if (error) return <h1>{error.message}</h1>;

  return (
    <>
      <section className={`movie-list-grid`}>
        {isLoading &&
          skeletons.map((skeleton) => (
            <div className="movie-container" key={skeleton}>
              <Skeleton count={3} />
            </div>
          ))}

        {data?.map((movie) => (
          <div className="movie-container" key={movie.imdbID}>
            <MovieCard movie={movie} />
          </div>
        ))}
      </section>
    </>
  );
};

export default MovieGrid;
