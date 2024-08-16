import MovieGrid from "../components/MovieGrid";
import { useMoviesStorage } from "../hooks/useMoviesStorage";

const FavoritesPage = () => {
  const { getItems } = useMoviesStorage("favorites");

  const data = getItems();

  return (
    <>
      <MovieGrid dataTest={data} />
    </>
  );
};

export default FavoritesPage;
