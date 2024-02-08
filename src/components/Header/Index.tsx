import { FC, Dispatch, ChangeEvent } from "react";
import "./Header.css";

interface Props {
  searchValue: string;
  setSearchValue: Dispatch<React.SetStateAction<string>>;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
  setIsInFavorites: React.Dispatch<React.SetStateAction<boolean>>;
  isLookingMovieDetails: boolean;
  setIsLookingMovieDetails: React.Dispatch<React.SetStateAction<boolean>>;
  isInFavorites: boolean;
}

const Header: FC<Props> = ({
  searchValue,
  setSearchValue,
  setIsSearching,
  setIsInFavorites,
  isLookingMovieDetails,
  setIsLookingMovieDetails,
  isInFavorites,
}) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event?.target.value);
  };

  const handleFavoritesClicked = () => {
    if (isInFavorites) {
      setIsInFavorites(false);
      setIsSearching(true);
      setSearchValue("");
      setIsLookingMovieDetails(false);
      if (isLookingMovieDetails) {
        setIsSearching(false);
        setIsInFavorites(true);
      }
    } else {
      setIsInFavorites(true);
      setIsSearching(false);
      setIsLookingMovieDetails(false);
      setSearchValue("");
    }
  };

  return (
    <div className="header-container">
      <div className="header-top-part-name">OMDb API</div>
      <input
        type="text"
        className="header-top-part-input"
        placeholder={isInFavorites ? "Type to search favorite ..." : "Type to search ..."}
        value={searchValue}
        onChange={handleInputChange}
      />
      <div onClick={handleFavoritesClicked} className="header-top-part-favorite-container">
        <div className="header-top-part-favorite">{isInFavorites ? "Go Search" : "Favorites"}</div>
      </div>
    </div>
  );
};

export default Header;
