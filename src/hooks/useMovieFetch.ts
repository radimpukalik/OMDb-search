import { useState, useRef, Dispatch, useEffect } from "react";
import { Post } from "../interfaces";

export const useMovieFetch = (
  searchUrl: string,
  dependeciesArray: unknown[],
  isSearching: boolean,
  setTotalMovieResult: Dispatch<React.SetStateAction<number>>
) => {
  const [data, setData] = useState<Post[]>([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchMoviePosts = async (searchUrl: string) => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();
    setIsLoading(true);

    try {
      const response = await fetch(searchUrl, {
        signal: abortControllerRef.current?.signal,
      });
      const responseJson = await response.json();
      if (responseJson.Search) {
        setData(responseJson.Search);
        setTotalMovieResult(responseJson.totalResults);
      }
    } catch (error: any) {
      if (error.name === "AbortError") {
        return;
      }
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isSearching) {
      fetchMoviePosts(searchUrl);
    }
  }, dependeciesArray);

  return { data, error, isLoading };
};
