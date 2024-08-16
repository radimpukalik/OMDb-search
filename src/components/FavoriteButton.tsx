import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { FaHeartCircleMinus, FaHeartCirclePlus } from "react-icons/fa6";
import MovieDetails from "../entities/MovieDetails";
import { useMoviesStorage } from "../hooks/useMoviesStorage";
import APIClient from "../services/api-client";

interface Props {
  movieId: string;
}

const FavoriteButton = ({ movieId }: Props) => {
  const { removeItemById, setItem, getItems } = useMoviesStorage("favorites");
  const apiClient = new APIClient<MovieDetails>("");
  const queryClient = useQueryClient();

  const isInFavorite = useCallback(() => {
    const allFavorites = getItems();
    return allFavorites.some((favorite) => favorite.imdbID === movieId);
  }, [getItems, movieId]);

  const [favorite, setFavorite] = useState(isInFavorite);

  useEffect(() => {
    setFavorite(isInFavorite());
  }, [isInFavorite]);

  const handleAddToFavorite = useCallback(async () => {
    try {
      const movieData = await queryClient.fetchQuery({
        queryKey: ["movie", movieId],
        queryFn: () => apiClient.get(movieId),
        staleTime: 30 * 1000, // 30 seconds
      });
      if (movieData) {
        setItem(movieData);
        setFavorite(true);
      }
    } catch (error) {
      console.error("Error fetching movie data", error);
    }
  }, [movieId, queryClient, setItem]);

  const handleRemoveFromFavorite = useCallback(() => {
    removeItemById(movieId);
    setFavorite(false);
  }, [removeItemById, movieId]);

  return (
    <>
      {!favorite ? (
        <FaHeartCirclePlus
          style={{ color: "white", fontSize: "24px" }}
          onClick={handleAddToFavorite}
        />
      ) : (
        <FaHeartCircleMinus
          style={{ color: "red", fontSize: "24px" }}
          onClick={handleRemoveFromFavorite}
        />
      )}
    </>
  );
};

export default FavoriteButton;
