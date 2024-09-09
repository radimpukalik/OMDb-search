import { useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieGrid from "../components/MovieGrid";
import PageNavigator from "../components/PageNavigator";
import useMovies from "../hooks/useMovies";
import useGameQueryStore from "../store";
import MovieHeading from "../components/MovieHeading";

const MoviesPage = () => {
  const { search } = useParams();
  const setSearchText = useGameQueryStore((s) => s.setSearchText);

  useEffect(() => {
    if (search) setSearchText(search);
  }, [search, setSearchText]);

  const moviesObject = useMovies();
  const totalResults = moviesObject.data?.totalResults ?? 0;

  const maxPage = Math.ceil(totalResults / 10);

  return (
    <>
      <MovieHeading />
      <MovieGrid moviesObject={moviesObject} />
      <PageNavigator maxPage={maxPage} />
    </>
  );
};

export default MoviesPage;
