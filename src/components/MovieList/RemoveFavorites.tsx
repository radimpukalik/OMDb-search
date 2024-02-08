import { FC } from "react";
import { FaHeartCircleMinus } from "react-icons/fa6";
import { Post } from "../../interfaces";

interface Props {
  movie: Post;
  favorites: Post[];
  setFavorites: React.Dispatch<React.SetStateAction<Post[]>>;
}

const RemoveFavorites: FC<Props> = ({ movie, favorites, setFavorites }) => {
  const iconStyle = {
    color: "red",
    fontSize: "24px",
  };

  const removeFavouriteMovie = (event: React.MouseEvent, movie: Post) => {
    event.stopPropagation();
    const newFavoriteList = favorites.filter((favorite) => favorite.imdbID !== movie.imdbID);

    setFavorites(newFavoriteList);
  };

  return (
    <FaHeartCircleMinus style={iconStyle} onClick={(event) => removeFavouriteMovie(event, movie)} />
  );
};

export default RemoveFavorites;
