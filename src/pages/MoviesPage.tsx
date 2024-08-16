import { useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieGrid from "../components/MovieGrid";
import PageNavigator from "../components/PageNavigator";
import useMovies from "../hooks/useMovies";
import useGameQueryStore from "../store";

const MoviesPage = () => {
  const { search } = useParams();
  const setSearchText = useGameQueryStore((s) => s.setSearchText);

  useEffect(() => {
    if (search) setSearchText(search);
  }, []);

  const moviesObject = useMovies();
  const totalResults = moviesObject.data?.totalResults ?? 0;

  const page = useGameQueryStore((s) => s.gameQuery.page) ?? 1;
  const maxPage = totalResults / 10;

  return (
    <>
      <MovieGrid moviesObject={moviesObject} />
      <PageNavigator page={page} minPage={1} maxPage={maxPage} />
    </>
  );
};

export default MoviesPage;
