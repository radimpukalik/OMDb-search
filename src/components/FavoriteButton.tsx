import { FaHeartCircleMinus, FaHeartCirclePlus } from "react-icons/fa6";
import { useMoviesStorage } from "../hooks/useMoviesStorage";
import useMovie from "../hooks/useMovie";

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
          style={{ color: "white", fontSize: "24px" }}
          onClick={handleFavoriteToggle}
        />
      ) : (
        <FaHeartCircleMinus
          style={{ color: "red", fontSize: "24px" }}
          onClick={handleFavoriteToggle}
        />
      )}
    </>
  );
};

export default FavoriteButton;
