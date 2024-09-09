import { FaHeartCircleMinus, FaHeartCirclePlus } from "react-icons/fa6";
import { useMoviesStorage } from "../hooks/useMoviesStorage";
import useMovie from "../hooks/useMovie";
import "../styles/components/FavoriteButton.css";
import { useState } from "react";

interface Props {
  movieId: string;
  isFavorite: boolean;
  onFavoriteStatusChange: (isFavorite: boolean) => void;
}

const FavoriteButton = ({
  movieId,
  isFavorite,
  onFavoriteStatusChange,
}: Props) => {
  const { removeItemById, setItem } = useMoviesStorage("favorites");
  const { data: movieData, isError, isLoading } = useMovie(movieId);
  const [isHovered, setIsHovered] = useState(false);

  const handleFavoriteToggle = async () => {
    isFavorite ? removeItemById(movieId) : movieData && setItem(movieData);
    onFavoriteStatusChange(!isFavorite);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading movie details</div>;

  return (
    <>
      {!isFavorite ? (
        <FaHeartCirclePlus
          style={{ color: "white" }}
          className={`favorite-icon ${isHovered ? "hovered" : ""}`}
          onClick={handleFavoriteToggle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
      ) : (
        <FaHeartCircleMinus
          style={{ color: "red" }}
          className={`favorite-icon ${isHovered ? "hovered" : ""}`}
          onClick={handleFavoriteToggle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
      )}
    </>
  );
};

export default FavoriteButton;
