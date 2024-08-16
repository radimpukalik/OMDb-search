import { useQuery } from "@tanstack/react-query";
import Movie from "../entities/Movie";
import APIClient, { FetchResponse } from "../services/api-client";
import useGameQueryStore from "../store";

const apiClient = new APIClient<Movie>("");

const useMovies = () => {
  const gameQuery = useGameQueryStore((s) => s.gameQuery);

  return useQuery<FetchResponse<Movie>, Error>({
    queryKey: ["movies", gameQuery],
    queryFn: () =>
      apiClient.getAll({
        params: {
          s: gameQuery.searchText,
          page: gameQuery.page,
        },
      }),
    staleTime: 30 * 1000, // 30s
  });
};

export default useMovies;
