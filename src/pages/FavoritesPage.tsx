import MovieGrid from "../components/MovieGrid";
import { useMoviesStorage } from "../hooks/useMoviesStorage";

const FavoritesPage = () => {
  const { getItems } = useMoviesStorage("favorites");

  return (
    <>
      <MovieGrid dataTest={getItems()} />
    </>
  );
};

export default FavoritesPage;
