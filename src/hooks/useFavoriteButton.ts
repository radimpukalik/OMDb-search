import { useState, useCallback } from "react";
import MovieDetails from "../entities/MovieDetails";

export const useFavoritesManager = () => {
  const [favorites, setFavorites] = useState<MovieDetails[]>([]);

  const isFavorite = useCallback(
    (movieId: string) => {
      return favorites.some((fav) => fav.imdbID === movieId);
    },
    [favorites]
  );

  const handleFavoriteChange = useCallback(
    (movie: MovieDetails, isFavorite: boolean) => {
      setFavorites((prevFavorites) => {
        if (isFavorite) {
          return [...prevFavorites, movie];
        } else {
          return prevFavorites.filter((fav) => fav.imdbID !== movie.imdbID);
        }
      });
    },
    []
  );

  return {
    favorites,
    isFavorite,
    handleFavoriteChange,
  };
};
