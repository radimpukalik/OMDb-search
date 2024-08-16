import { useQuery } from "@tanstack/react-query";
import MovieDetails from "../entities/MovieDetails";
import APIClient from "../services/api-client";

const apiClient = new APIClient<MovieDetails>("");

const useMovie = (id: string) => {
  return useQuery({
    queryKey: ["movie", id],
    queryFn: () => apiClient.get(id),
    staleTime: 30 * 1000, // 30s
  });
};

export default useMovie;
