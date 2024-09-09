import { useEffect, useState } from "react";
import MovieGrid from "../components/MovieGrid";
import { useMoviesStorage } from "../hooks/useMoviesStorage";
import MovieDetails from "../entities/MovieDetails";

const FavoritesPage = () => {
  const { getItems } = useMoviesStorage("favorites");
  const [favorites, setFavorites] = useState<MovieDetails[]>(getItems());

  useEffect(() => {
    const handleFavoritesUpdate = () => {
      setFavorites(getItems());
    };

    window.addEventListener("favoritesUpdated", handleFavoritesUpdate);

    return () => {
      window.removeEventListener("favoritesUpdated", handleFavoritesUpdate);
    };
  }, [getItems]);

  return <MovieGrid dataTest={favorites} />;
};

export default FavoritesPage;
