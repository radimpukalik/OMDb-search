import { useCallback } from "react";
import MovieDetails from "../entities/MovieDetails";

export const useMoviesStorage = (key: string) => {
  const getItems = useCallback((): MovieDetails[] => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : [];
    } catch (error) {
      console.error("Error parsing local storage item", error);
      return [];
    }
  }, [key]);

  const setItem = useCallback(
    (item: MovieDetails) => {
      try {
        const currentItems = getItems();
        const exists = currentItems.some(
          (existingItem) => existingItem.imdbID === item.imdbID
        );
        if (exists) {
          return;
        }
        const updatedItems = [item, ...currentItems];
        window.localStorage.setItem(key, JSON.stringify(updatedItems));
        window.dispatchEvent(new Event("favoritesUpdated")); // Dispatch event on update
      } catch (error) {
        console.error("Error setting local storage item", error);
      }
    },
    [getItems, key]
  );

  const removeItemById = useCallback(
    (itemId: string) => {
      try {
        const currentItems = getItems();
        const updatedItems = currentItems.filter(
          (item) => item.imdbID !== itemId
        );
        window.localStorage.setItem(key, JSON.stringify(updatedItems));
        window.dispatchEvent(new Event("favoritesUpdated")); // Dispatch event on removal
      } catch (error) {
        console.error("Error removing local storage item", error);
      }
    },
    [getItems, key]
  );

  const removeAllItems = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      window.dispatchEvent(new Event("favoritesUpdated")); // Dispatch event on clear
    } catch (error) {
      console.error("Error removing all items from local storage", error);
    }
  }, [key]);

  return { getItems, setItem, removeItemById, removeAllItems };
};
