import { FC } from "react";
import { FaHeartCirclePlus } from "react-icons/fa6";
import { Post } from "../../interfaces";

interface Props {
  movie: Post;
  favorites: Post[];
  setFavorites: React.Dispatch<React.SetStateAction<Post[]>>;
}

const AddFavorites: FC<Props> = ({ movie, favorites, setFavorites }) => {
  const iconStyle = {
    color: "white",
    fontSize: "24px",
  };

  const addFavouriteMovie = (event: React.MouseEvent, movie: Post) => {
    event.stopPropagation();
    const newFavoriteList = [...favorites, movie];
    setFavorites(newFavoriteList);
  };

  return (
    <FaHeartCirclePlus style={iconStyle} onClick={(event) => addFavouriteMovie(event, movie)} />
  );
};

export default AddFavorites;
