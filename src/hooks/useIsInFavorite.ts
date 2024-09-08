import { useMoviesStorage } from "../hooks/useMoviesStorage";

const useIsInFavorite = () => {
  const { getItems } = useMoviesStorage("favorites");
  const favoriteData = getItems();

  const isInFavorite = (movieId: string): boolean => {
    return favoriteData.some((favorite) => favorite.imdbID === movieId);
  };

  return { isInFavorite };
};

export default useIsInFavorite;
